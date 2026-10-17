const http = require('node:http');
const { spawn } = require('node:child_process');
const path = require('node:path');
const assert = require('node:assert');

const upstream = http.createServer(async (req, res) => {
    assert.strictEqual(req.headers.authorization, 'Bearer test-key');
    let body = '';
    for await (const chunk of req) body += chunk;
    assert.strictEqual(JSON.parse(body).stream, true);
    res.writeHead(200, { 'content-type': 'text/event-stream' });
    res.write('data: {"choices":[{"delta":{"content":"hello"}}]}\n\n');
    setTimeout(() => res.end('data: [DONE]\n\n'), 80);
});

(async () => {
    await new Promise(resolve => upstream.listen(0, '127.0.0.1', resolve));
    const upstreamPort = upstream.address().port;
    const child = spawn(process.execPath, ['server.js'], {
        cwd: path.join(__dirname, '..'),
        env: { ...process.env, PORT: '0', DEEPSEEK_API_ENDPOINT: `http://127.0.0.1:${upstreamPort}/upstream` },
        stdio: ['ignore', 'pipe', 'pipe']
    });
    try {
        const port = await new Promise((resolve, reject) => {
            child.stdout.once('data', chunk => {
                const match = chunk.toString().match(/:(\d+)\/dictionary_v10\.html/);
                if (match) resolve(Number(match[1]));
                else reject(new Error('Local server did not report its port'));
            });
            child.once('exit', code => reject(new Error(`Local server exited: ${code}`)));
        });
        const page = await fetch(`http://127.0.0.1:${port}/dictionary_v10.html`);
        assert.strictEqual(page.status, 200);
        const pageHtml = await page.text();
        assert(pageHtml.includes('createStreamingRenderer'));
        assert(pageHtml.includes('dictionary-local-proxy'));
        const response = await fetch(`http://127.0.0.1:${port}/api/chat/completions`, {
            method: 'POST',
            headers: { authorization: 'Bearer test-key', 'content-type': 'application/json' },
            body: JSON.stringify({ stream: true })
        });
        assert.strictEqual(response.status, 200);
        const reader = response.body.getReader();
        const first = await reader.read();
        assert(Buffer.from(first.value).toString().includes('hello'));
        const rest = await reader.read();
        assert(Buffer.from(rest.value).toString().includes('[DONE]'));
        console.log('local page serving and SSE proxy: OK');
    } finally {
        child.kill();
        upstream.close();
    }
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
    upstream.close();
});
