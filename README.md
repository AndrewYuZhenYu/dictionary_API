# AI 智能词汇解析 v9

一个纯前端的英语词汇智能解析工具。用户输入英文单词、短语、句子或中文词语，通过 DeepSeek API 流式生成结构化的解析内容，并在浏览器本地缓存结果，支持生词本、导航历史、目录跳转、明暗主题等能力。

整个项目只有一个 HTML 文件，无构建步骤、无后端服务，打开即可运行。

---

## 项目简介

这是一个面向英语学习者的词汇查询工具。与普通词典不同，它的解析内容由大语言模型生成，因此可以针对一个单词输出词汇等级、音标、中文释义、辅助记忆、典型短语、派生词、形近词辨析、同义词、反义词、易混词专项辨析、例句等多个维度；针对中文输入，则输出英文对应词、翻译版本矩阵等内容。

所有生成结果保存在浏览器 `localStorage` 中，第二次查询同一内容时直接命中本地缓存秒开，不重复消耗 API 额度。

**主要面向：**

- 需要快速查询英文单词详细解析的英语学习者；
- 需要准备四六级、考研、雅思、托福等考试的用户；
- 希望用中文词语反查英文对应表达的用户；
- 想了解一个纯前端 + LLM 流式应用如何组织代码的开发者。

---

## 主要功能

| 功能 | 说明 |
| --- | --- |
| 单词解析 | 输入英文单词，生成词汇等级、音标、释义、记忆法、短语搭配、派生词、形近词、同义词、反义词、易混词、例句等完整解析 |
| 短语/句子解析 | 输入英文短语或句子，输出整体释义、使用场景、语法点睛、核心词汇分解、同义表达与例句 |
| 中文反查英文 | 输入中文词语或句子，按字符长度自动切换「同义词罗盘」「译法多解」「译境探索」三种模板，输出多语域英文翻译 |
| 流式输出 | 基于 SSE 逐 token 渲染，实时显示生成进度 |
| 本地缓存 | 生成结果写入 `localStorage`，命中缓存时秒开并显示「⚡」标记 |
| 最近查询历史 | 保留最近 50 条查询记录，点击即可重新查询 |
| 生词本 | 以卡片网格展示所有已缓存内容，支持搜索、导出为 txt、单条删除、全部清空 |
| 单词点击查询 | 解析结果中的英文单词可点击，直接发起新一轮查询，并保留导航链路 |
| 划词/右键查询 | 在结果区选中英文文本后右键，可直接查询选中内容 |
| 前进/后退导航 | 维护查询导航栈，支持按钮、`Alt+←` / `Alt+→`、鼠标侧键、浏览器后退键 |
| 目录导航 | 自动提取解析结果中的板块标题生成目录，支持桌面侧边栏（可拖动、可切换左右侧）和移动端底部浮层 |
| 明暗主题 | 亮色 / 暗色两套主题，选择结果持久化到本地 |
| 复制结果 | 一键复制纯文本结果 |
| 缓存清理 | 侧边悬浮按钮一键清理全部查询缓存、搜索历史与导航栈 |

---

## 快速开始

### 方式一：直接打开

由于是纯静态单文件，理论上双击 HTML 文件即可打开。但浏览器的跨域限制会阻止直接以 `file://` 协议发起对 DeepSeek API 的请求，因此**推荐使用本地服务器方式运行**。

### 方式二：本地服务器（推荐）

任选一种：

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# VS Code
# 安装 Live Server 插件，右键 HTML 文件 → Open with Live Server
```

然后在浏览器访问 `http://localhost:8080`。

### 配置 API Key

1. 点击页面顶部「接口密钥设置」展开输入区；
2. 填入 DeepSeek API Key（形如 `sk-...`）；
3. 点击「保存」，密钥写入浏览器本地存储。

> 密钥仅保存在当前浏览器的 `localStorage` 中，不会上传到任何第三方服务器。

### 开始查询

在输入框中输入内容，按回车或点击「生成解析」：

- `ephemeral` — 英文单词解析
- `give up` — 英文短语解析
- `每天进步一点点` — 中文句子翻译
- `坚持` — 中文词语反查英文

---

## 安装与环境

### 运行环境

- 任意现代浏览器（Chrome / Edge / Firefox / Safari）；
- 需要支持 `fetch`、`ReadableStream`、`IntersectionObserver`、`backdrop-filter`、CSS 自定义属性。

### 外部依赖

项目通过 CDN 引入以下资源，无需本地安装：

| 资源 | 用途 |
| --- | --- |
| `marked@12.0.2` | Markdown 渲染 |
| Google Fonts `Noto Serif SC` | 中文衬线字体 |

### 后端依赖

无。所有逻辑在浏览器端完成，唯一的外部请求是 DeepSeek 的 Chat Completions 接口。

---

## 使用方法

### 查询流程

```text
输入内容
  ↓
格式校验（区分中英文，过滤非法字符，限制 200 字符）
  ↓
查本地缓存
  ├─ 命中 → 直接渲染，标记 ⚡
  └─ 未命中
        ↓
     构建 System Prompt（根据中/英、词/短语/句子选择模板）
        ↓
     调用 DeepSeek API（stream: true）
        ↓
     逐 token 解析 SSE，防抖渲染 Markdown
        ↓
     清洗开场白、折叠重复行、注入考试标签与标题配色
        ↓
     渲染完成 → 移除光标 → 写入缓存与历史 → 生成目录
```

### 输入类型与对应模板

| 输入类型 | 判断依据 | 输出模板 |
| --- | --- | --- |
| 英文单词 | 不含空格、不含中文 | 词汇等级 / 音标 / 释义 / 记忆法 / 短语 / 派生词 / 形近词 / 同义词 / 反义词 / 易混词 / 例句 |
| 英文短语或句子 | 含空格、不含中文 | 整体解析 / 使用场景 / 语法点睛 / 核心词汇分解 / 同义表达 / 例句 |
| 中文词（≤3 字） | 含中文、中文字符数 ≤ 3 | 同义词罗盘（按语域分组的英文对应词） |
| 中文短语（4–12 字） | 含中文、中文字符数 4–12 | 译法多解（直译 / 意译 / 地道对应 / 创意变体） |
| 中文句子（>12 字） | 含中文、中文字符数 > 12 | 译境探索（按语体分层的翻译矩阵 + 词汇点睛 + 策略点评） |

### 快捷键

| 快捷键 | 功能 |
| --- | --- |
| `Enter`（输入框内） | 发起查询 |
| `Enter`（右键菜单打开时） | 查询选中内容 |
| `Alt + ←` | 后退 |
| `Alt + →` | 前进 |
| `Esc` | 关闭右键菜单 / 关闭生词本弹窗 |
| 鼠标侧键 X1 / X2 | 后退 / 前进 |

---

## 输入与输出

### 输入

- 单行文本，长度上限 200 字符；
- 英文输入：保留字母、连字符、撇号、空格，自动转小写；
- 中文输入：保留汉字、中文标点、英文字母、数字、空格。

### 输出

- 渲染为 HTML 的 Markdown 内容，展示在结果区；
- 同时以 HTML 字符串形式写入 `localStorage`；
- 可通过「复制结果」导出为纯文本。

### 本地存储键

| 键名 | 内容 |
| --- | --- |
| `deepseek_api_key_v5` | API Key |
| `color_theme_v5` | 主题（`light` / `dark`） |
| `word_history_v5` | 查询历史数组 |
| `api_section_expanded_v5` | API 设置区展开状态 |
| `word_cache_v5_<word>` | 单个词条的解析 HTML |
| `nav_stack_v8` | 导航栈词条数组 |
| `nav_index_v8` | 导航栈当前位置 |
| `toc_side_v9` | 目录侧边栏停靠侧 |

---

## 配置说明

项目没有独立的配置文件，可调参数集中在脚本顶部的常量区：

| 常量 | 默认值 | 说明 |
| --- | --- | --- |
| `API_ENDPOINT` | `https://api.deepseek.com/chat/completions` | 接口地址 |
| `MODEL_NAME` | `deepseek-chat` | 使用的模型 |
| `MAX_INPUT_LENGTH` | `200` | 输入长度上限 |
| `MAX_HISTORY_SIZE` | `50` | 最近查询历史保留条数 |
| `MAX_CACHE_SIZE` | `200` | 缓存词条上限，超出触发淘汰 |
| `temperature` | `0.2` | 请求温度，偏确定性输出 |
| `max_tokens` | `8192` | 单次生成上限 |
| `RENDER_INTERVAL_MS` | `80` | 流式渲染防抖间隔（毫秒） |
| 安全超时 | `60000` | 60 秒无新数据则强制收尾 |

---

## 项目结构

项目为单文件结构：

```text
.
└── index.html      # 全部内容：样式、结构、脚本
```

文件内部分为三个部分：

```text
index.html
├── <style>         # 全部 CSS：主题变量、组件样式、响应式、目录侧边栏、弹窗
├── <body>          # DOM 结构：顶部导航、查询区、结果区、生词本弹窗、右键菜单、目录
└── <script>        # 全部逻辑：主题、API Key、缓存、导航栈、流式请求、Markdown 后处理、目录
```

---

## 系统架构

```text
┌──────────────────────────────────────────────────┐
│                     浏览器                        │
│                                                  │
│  UI 层                                            │
│  ├─ 顶部导航（主题切换 / 生词本入口）              │
│  ├─ 查询输入区                                    │
│  ├─ 最近查询历史                                  │
│  ├─ 结果渲染区 ── 目录侧边栏 / 移动端浮层          │
│  ├─ 生词本弹窗                                    │
│  ├─ 右键查询菜单                                  │
│  └─ 悬浮清理按钮                                  │
│                                                  │
│  逻辑层                                            │
│  ├─ 输入校验与类型判定                            │
│  ├─ Prompt 构建（5 套模板）                       │
│  ├─ 流式请求与 SSE 解析                           │
│  ├─ Markdown 后处理（清洗 / 折叠 / 着色 / 标签）   │
│  ├─ 导航栈管理                                    │
│  ├─ 缓存与历史管理                                │
│  └─ 目录生成与滚动监听                            │
│                                                  │
│  存储层                                            │
│  └─ localStorage（密钥 / 主题 / 历史 / 缓存 / 导航栈）│
└──────────────────────────────────────────────────┘
                        │
                        │ HTTPS (SSE)
                        ↓
              DeepSeek Chat Completions API
```

---

## 核心模块

### 1. 输入校验与类型判定

`validateInput(input)` 是整个流程的入口分流器。它通过 `hasChinese()` 判断输入是否含中文，再按中文字符数决定使用哪套 Prompt 模板。英文输入统一转小写，中文输入保留原样。

### 2. Prompt 构建

`buildSystemPrompt(userInput, isChinese)` 返回完整的 System Prompt。这是项目的核心资产之一，共五套模板：

- 中文词 → 同义词罗盘
- 中文短语 → 译法多解
- 中文句子 → 译境探索
- 英文短语/句子 → 短语解析
- 英文单词 → 词汇解析

每套模板都对输出结构、音标包裹格式、条目间空行、禁止重复等提出了明确约束。

### 3. 流式请求与 SSE 解析

`analyzeWord()` 是主流程函数，负责校验、缓存检查、请求发起、流式读取、错误处理与收尾。

流式读取部分做了几件关键的事：

- **行缓冲**：用 `lineBuffer` 处理跨 chunk 边界的不完整行；
- **防抖渲染**：`scheduleRender()` 限制渲染频率为至少间隔 80ms，避免每个 token 都触发完整 Markdown 解析；
- **开场白剥离**：累计内容超过 15 字符后调用一次 `stripOpeningFluff()`，用正则清除「好的，请查收…」这类废话；
- **重复行折叠**：`collapseRepeatedLines()` 在渲染前折叠连续重复行，防止模型陷入复读；
- **双重完成信号**：同时监听 `[DONE]` 与 `finish_reason`，任一触发即认为流结束并主动 `abort()`，避免连接挂起；
- **安全超时**：60 秒无新数据强制收尾。

### 4. Markdown 后处理

生成结果在渲染前后经历多道处理：

| 函数 | 作用 |
| --- | --- |
| `stripOpeningFluff` | 清除模型开场白 |
| `collapseRepeatedLines` | 折叠连续重复行 |
| `fixMarkdownHeadings` | 修复行内 `#` 标题，确保能正确渲染 |
| `applyExamTags` | 将「四级/六级/雅思/托福/考研/核心词/高频词」替换为彩色胶囊标签 |
| `applyTitleColors` | 给各板块标题分配 `title-N` 类，实现多彩标题 |

### 5. 单词可点击化

`makeWordsClickable(container)` 使用 `TreeWalker` 遍历结果区的所有文本节点，跳过已处理节点、音标区、考试标签等，用正则匹配英文单词并包裹为 `<span class="clickable-word">`。音标内容通过 `wrapBracketContent()` 预先包裹为 `.no-click`，避免音标内的字母被误标为可点击。

### 6. 导航栈

导航栈是一个 `{word, html}` 数组加一个 `navIndex` 指针。关键设计是区分两种查询来源：

- **手动查询**（输入框、历史记录、生词本）→ 清空导航栈，重新开始；
- **引申查询**（点击结果中的单词、右键查询）→ 截断当前位置之后的条目再追加。

导航状态持久化到 `localStorage`，并同步到 URL 的 `?q=` 参数。页面加载时 `initFromURL()` 会读取该参数恢复结果，同时将导航栈重置为单条目，避免历史栈污染。

### 7. 目录导航

`buildTOC()` 扫描结果区中带 `title-N` 类的 `<strong>`（英文模板）或 `<h2>` / `<h3>`（中文模板），生成锚点、桌面侧边栏条目、移动端浮层条目，并用 `IntersectionObserver` 监听滚动高亮当前板块。

桌面侧边栏支持：

- 拖动到任意位置，松手时按中心点相对视口中线自动吸附到左/右侧；
- 点击边缘箭头快速切换到另一侧，带「飞越屏幕」的位移动画；
- 停靠侧持久化到 `localStorage`。

---

## 核心执行流程

```text
页面加载
  ↓
initTheme / initApiKey / loadHistory / loadNavStack / initApiSection
  ↓
initModalEscape / initKeyboardShortcuts / initTocDrag
  ↓
initFromURL（若带 ?q= 参数则恢复结果）
  ↓
等待用户输入
  ↓
manualSearch 或引申查询
  ↓
analyzeWord
  ├─ 校验 API Key
  ├─ 校验输入并判定类型
  ├─ 检查本地缓存
  │    └─ 命中 → 渲染 + 写历史 + 建目录 + 入栈
  └─ 未命中 → 发起流式请求
        ↓
      逐行解析 SSE
        ↓
      防抖渲染 + 开场白剥离 + 重复折叠
        ↓
      流结束 → 移除光标 → 写缓存 → 建目录 → 入栈
```

---

## 数据流

```text
用户输入（字符串）
  ↓
validateInput → { cleaned, isChinese }
  ↓
buildSystemPrompt → System Prompt（字符串）
  ↓
fetch 请求体（JSON）
  ↓
SSE 响应流（Uint8Array）
  ↓
TextDecoder → 文本行 → JSON.parse → delta.content
  ↓
markdownAcc（累积的 Markdown 字符串）
  ↓
stripOpeningFluff → collapseRepeatedLines → fixMarkdownHeadings
  ↓
marked.parse → HTML 字符串
  ↓
applyExamTags → applyTitleColors → 最终 HTML
  ↓
resultContent.innerHTML
  ↓
makeWordsClickable → 包裹可点击单词
  ↓
localStorage[word_cache_v5_<word>] = 最终 HTML
```

---

## 技术实现

### 技术栈

- 原生 HTML / CSS / JavaScript，无框架、无构建工具；
- `marked` 负责 Markdown → HTML 转换；
- DeepSeek Chat Completions API，`stream: true` 开启 SSE；
- 浏览器 `localStorage` 作为唯一持久化层。

### 关键实现说明

**SSE 解析不依赖 EventSource。** 由于需要携带 `Authorization` 头，项目使用 `fetch` + `ReadableStream` 手动解析 SSE，而非 `EventSource`。

**渲染防抖而非节流。** `scheduleRender()` 在距上次渲染不足 80ms 时用 `setTimeout` 延迟合并，而不是简单丢弃，保证最后一次内容一定会被渲染。

**光标用 DOM 移除而非字符串替换。** 收尾时通过 `querySelector('.cursor-blink').remove()` 移除光标，比在 HTML 字符串上做 `replace` 更可靠。

**重复检测基于整行严格相等。** `collapseRepeatedLines()` 只折叠与上一行完全相同的行，阈值 3 次，超过后插入一条提示。这是一种保守策略，避免误伤正常内容。

**导航栈与浏览器历史解耦。** 项目没有把每次查询都 `pushState` 到浏览器历史，而是只 `replaceState` 当前状态，导航完全由内部栈控制。`popstate` 监听仅作为兜底。

**提示词中显式约束排版。** 由于中文翻译类模板的输出结构较复杂，Prompt 中反复强调「条目之间必须空一行」「每个版本独占一段」，并在渲染前用 `fixMarkdownHeadings` 兜底修复标题换行。

---

## 错误处理

| 场景 | 表现 |
| --- | --- |
| 未配置 API Key | 状态栏提示，自动展开设置区并抖动输入框 |
| 输入为空或非法 | 状态栏提示具体原因，抖动输入框 |
| 401 | 「API Key 无效或已过期」 |
| 402 | 「账户余额不足」 |
| 429 | 「请求过于频繁」 |
| 网络失败 | 提示跨域可能，建议使用本地服务器 |
| 请求超时 | 60 秒无数据后 abort，提示重试 |
| 存储空间不足 | 写入缓存失败时提示清理词库 |
| 渲染异常 | 捕获并跳过当前帧，不中断流 |

---

## 已知限制

- 项目为单文件结构，所有逻辑集中在一个 `<script>` 中，规模继续增长会降低可维护性；
- 没有自动化测试，也没有构建、打包、部署流程；
- API Key 明文存储于 `localStorage`，仅适合个人本地使用；
- 缓存淘汰策略较简单，仅在写入时按「不在历史中」优先淘汰少量条目；
- 移动端浏览器对 `backdrop-filter` 支持不一致，部分毛玻璃效果可能降级；
- 项目在桌面端 1100px 以下会隐藏目录侧边栏，改用移动端浮层；
- 英文单词可点击化的正则会匹配结果区中所有英文词，包括一些不需要查询的通用词，点击后可能产生噪音查询。

---

## 扩展与二次开发

### 修改 Prompt 模板

所有模板集中在 `buildSystemPrompt()`。若要新增一种输入类型，需要在 `validateInput()` 中增加判定分支，并在 `buildSystemPrompt()` 中增加对应模板。

### 新增后处理规则

在 `doRender()` 的渲染管线中插入新函数即可：

```js
const cleaned = fixMarkdownHeadings(collapseRepeatedLines(markdownAcc));
let htmlHtml = marked.parse(cleaned);
htmlHtml = applyExamTags(htmlHtml);
htmlHtml = applyTitleColors(htmlHtml);
// 在这里插入新的后处理
resultContent.innerHTML = htmlHtml + '<span class="cursor-blink"></span>';
```

### 更换模型或接口

修改脚本顶部的 `API_ENDPOINT` 与 `MODEL_NAME`。如果目标接口不兼容 OpenAI 格式的 SSE，需要同步调整 `processSSELine()` 中的解析逻辑。

### 新增板块标题配色

在 `applyTitleColors()` 的 `sectionTitles` 数组中追加标题文本，并在 CSS 中补充对应的 `--c-title-N` 变量与 `.title-N` 规则。

---

## 常见问题

### 直接双击 HTML 文件后查询报错

浏览器出于安全策略会阻止 `file://` 页面发起跨域请求。请使用本地服务器（`python -m http.server` 或 Live Server）打开页面。

### 查询结果没有音标方括号

音标格式由 Prompt 约束，模型偶尔会使用斜杠。可以在 `buildSystemPrompt()` 中进一步强化该约束，或在后处理阶段用正则统一替换。

### 生成到一半停了

可能是网络中断或触发了 60 秒安全超时。检查网络后重试；若频繁出现，可尝试缩短查询内容。

### 词库数据丢失

`localStorage` 会随浏览器数据清理而丢失。重要内容建议定期通过生词本的「导出文本」功能备份。

### 侧边目录不显示

目录侧边栏仅在视口宽度大于 1100px 时显示。窗口较窄时会改为右下角的目录按钮，点击后从底部弹出浮层。

---

## License

本项目代码仅供学习、研究与个人使用。未经作者许可，禁止将本项目用于商业用途、直接复制后重新发布，或以本项目及其衍生代码作为独立项目进行再发布。