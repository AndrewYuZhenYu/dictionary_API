// Local-only static server and streaming DeepSeek proxy. No dependency or API key storage.
const http = require('node:http');
const { Readable } = require('node:stream');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT === undefined ? 8787 : Number(process.env.PORT);
const HOST = '127.0.0.1';
const UPSTREAM = process.env.DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com/chat/completions';
const HTML_PATH = path.join(__dirname, 'dictionary_v10.html');

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/dictionary_v10.html')) {
        try {
            const html = await fs.promises.readFile(HTML_PATH, 'utf8');
            const marked = html.replace('</head>', '<meta name="dictionary-local-proxy" content="1">\n</head>');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
            res.end(marked);
        } catch {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Cannot read dictionary_v10.html');
        }
        return;
    }
    if (req.method !== 'POST' || req.url !== '/api/chat/completions') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
    }
    const authorization = req.headers.authorization || '';
    if (!authorization.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: { message: '缺少 API Key' } }));
        return;
    }
    const chunks = [];
    let size = 0;
    try {
        for await (const chunk of req) {
            size += chunk.length;
            if (size > 256 * 1024) {
                res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: { message: '请求内容过大' } }));
                return;
            }
            chunks.push(chunk);
        }
    } catch {
        if (!res.destroyed) res.end();
        return;
    }
    const controller = new AbortController();
    res.on('close', () => { if (!res.writableEnded) controller.abort(); });
    try {
        const upstream = await fetch(UPSTREAM, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization,
                'Accept': 'text/event-stream'
            },
            body: Buffer.concat(chunks),
            signal: controller.signal
        });
        res.writeHead(upstream.status, {
            'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
        });
        if (upstream.body) {
            const source = Readable.fromWeb(upstream.body);
            source.on('error', () => { if (!res.destroyed) res.end(); });
            source.pipe(res);
        }
        else res.end();
    } catch (error) {
        if (res.destroyed) return;
        if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: { message: '本地代理无法连接 DeepSeek，请检查网络连接' } }));
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Open http://${HOST}:${server.address().port}/dictionary_v10.html`);
});
