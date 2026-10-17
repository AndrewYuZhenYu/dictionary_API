# 多彩词汇解析 v9

一个浏览器本地运行的 AI 词汇解析单页应用，基于 DeepSeek API，开箱即用。所有词库、查询历史全部存储在浏览器 LocalStorage，不会将用户数据上传到任何第三方服务器。

## 项目简介

多彩词汇解析 v9 是面向英语学习者、翻译爱好者的本地前端词汇解析工具。为纯单页面 HTML，无需后端服务，用户仅需配置自己的 DeepSeek API‑Key，即可完成英语单词/短语解析、中文词语/句子多版本翻译。

解析结果内的英文单词可以直接点击跳转查询，支持右键选中文本查询，内置生词本、查询历史记录、目录导航、明暗双主题、前进后退导航栈。数据全部保存在浏览器本地，隐私友好。

## 快速开始

### 获取源码
直接保存项目主文件为 `index.html`，不需要安装任何依赖包，不需要 npm。

> 注意：直接双击打开本地 html 文件会触发浏览器跨域安全限制，API 请求会失败。
> 正确运行方式：
> - VS Code 安装 Live Server 插件，右键 HTML → Open with Live Server
> - 或者部署到任意静态网页托管服务（Github Pages、Vercel、Netlify 等）

### 配置 API‑Key
1. 页面展开【接口密钥设置】
2. 在输入框填入你的 DeepSeek API Key（`sk‑`开头）
3. 点击保存，密钥会存储在浏览器本地存储。

> 安全说明：API Key 仅保存在浏览器 `localStorage`，不会上传到任何其他服务器，仅在浏览器内部直接请求 DeepSeek 接口。

### 开始查询
- 在查询内容输入框，输入英文单词、短语，或者中文词语、句子
- 点击「生成解析」按钮，或者按下回车键，AI 将流式输出解析结果。

## 核心功能清单

### 英文查询模式（单词 / 短语 / 短句）
1. **单个英文单词解析**
    - 英式、美式音标（严格方括号 `[]`）
    - 分词性中文释义、辅助记忆技巧（词根词缀、联想记忆）
    - 高频典型短语搭配
    - 派生词、形近词辨析、同义词、反义词、易混词专项辨析
    - 多场景例句：日常口语例句、书面写作例句
    - 自动打上考试标签：四级 / 六级 / 考研 / 雅思 / 托福 / 核心高频词

2. **英文短语、短句解析**
    - 整体中文释义、使用场景说明、语法点睛
    - 核心词汇拆解
    - 不少于5组同义替换表达，并附带差异说明
    - 多场景完整例句带中文翻译

### 中文输入翻译模式
程序会自动识别输入是否中文，根据输入长度自动切换三套模板。

1. **中文单个词语（≤3汉字）——同义词罗盘**
   穷尽该中文词对应的全部英文表达，按语域分组：日常口语 / 书面正式 / 文学雅致 / 专业术语
    - 每个英文对应词附带音标、词性、释义、场景说明
    - 近义词辨析，区分细微语义差异
    - 多场景完整双语例句

2. **中文短语（4‑12汉字）——译法多解**
    - 直译版本、地道意译版本、母语者习惯表达、创意变体
    - 每个翻译标注语域（口语 / 商务 / 学术 / 文学），说明适用场景
    - 成语俗语会补充文化背景说明

3. **中文完整长句（>12汉字）——译境探索**
    - 多维度翻译矩阵：日常口语、通用书面、商务正式、学术专业、文学雅致版本
    - 原句语义理解、关键词汇选词分析
    - 翻译难点策略点评，帮助理解翻译取舍

### 交互特色功能
1. **结果区单词点击查询**
   AI 返回解析结果里面所有英文单词会自动变为可点击，点击单词会直接发起新查询，延续导航历史栈，实现链式查词。音标内容自动设置为不可点击。

2. **右键选中文本查询**
   在解析结果框选任意英文，右键唤起菜单，一键查询选中单词/短语，快捷键 Enter 直接确认查询。

3. **导航栈（前进、后退）**
    - 页面顶部工具栏：后退 / 前进按钮
    - 快捷键：`Alt + ←` 后退，`Alt + →` 前进
    - 支持鼠标侧键（浏览器前进后退侧键）操作
    - 区分「手动搜索」与「引申点击查询」：手动搜索清空历史链条；点击单词查询延续浏览链条。

4. **最近查询历史**
   查询记录自动保存，点击历史条目可以秒开缓存结果，带闪电标记代表本地已有缓存。支持一键清空历史记录。

### 本地生词本（词库）
所有缓存的查询结果会存入本地词库，完全在浏览器，不联网。
- 查看全部已查询缓存单词列表网格
- 词库内部搜索过滤单词
- 单个删除词条 / 一键清空全部词库
- 导出全部单词为 `.txt` 文本文件，方便导入到其他背单词软件
- 点击词库卡片，快速重新查询该单词

### 智能目录 TOC 导航
- **桌面端**：右侧悬浮可拖拽侧边目录栏，可以拖拽改变位置，一键切换到屏幕左侧；滚动页面自动高亮当前阅读板块。窗口宽度大于1100px自动显示。
- **移动端**：右下角悬浮目录按钮，弹出底部面板目录，点击快速跳转到各个解析板块。
- 目录自动扫描AI输出解析的标题板块生成锚点，点击平滑滚动到对应位置，板块会短暂高亮。

### UI 主题与视觉体验
1. **亮色 / 暗色主题一键切换**，主题设置保存在本地存储。
2. 玻璃拟态UI设计，毛玻璃背景、平滑弹簧动画。
3. 流式输出：AI 结果逐字实时渲染，带闪烁光标动画。
4. 不同类型板块标题自动分配彩色高亮，考试词汇彩色标签。
5. 完整响应式布局，适配电脑、平板、手机。

### 缓存与存储管理
全部数据存储于浏览器 LocalStorage：
- API‑Key
- 明暗主题偏好
- 查询历史记录（最多50条）
- 查询结果缓存（最多200条缓存，自动淘汰旧缓存）
- 导航浏览栈
- 目录侧边栏位置偏好

页面右下角悬浮扫帚按钮：一键清理全部查询缓存，清空历史记录与导航栈。

## LocalStorage 存储键说明

| Key 前缀 | 用途 |
|---|---|
| `deepseek_api_key_v5` | 用户保存的 API Key |
| `color_theme_v5` | 亮色/暗色主题 |
| `word_history_v5` | 查询历史列表 |
| `word_cache_v5_*` | 单词解析结果缓存 |
| `nav_stack_v8` / `nav_index_v8` | 前进后退导航栈 |
| `toc_side_v9` | 目录侧边栏左右位置配置 |

> 清除浏览器本地存储会删除所有历史、词库缓存和密钥。

## 快捷键汇总

| 快捷键 | 功能 |
|---|---|
| Enter（输入框） | 发起查询 |
| `Alt + ←` | 导航后退 |
| `Alt + →` | 导航前进 |
| Enter（右键菜单弹出状态） | 查询选中的文本 |
| Escape | 关闭生词本弹窗、关闭右键菜单 |

## 隐私说明
1. 除向 DeepSeek API 发送你的查询文本之外，本工具不会上传任何历史记录、词库、密钥到任何第三方服务器。
2. API Key 只保存在浏览器本地，不会随页面提交到其他域名。
3. 所有解析缓存、生词本全部在浏览器本地。
4. 唯一网络请求：直接 POST 请求 `https://api.deepseek.com/chat/completions` 获取AI生成内容。

> 注意：你的查询内容会发送给 DeepSeek API，遵循 DeepSeek 的服务隐私政策。

## 使用限制与注意事项
1. 需要自己注册 DeepSeek 账号并生成 API Key，本项目不提供API额度。
2. 不要直接本地双击打开 HTML，会跨域报错，必须用静态服务器（Live Server、静态部署）。
3. 浏览器存储空间有限，缓存上限200条，超出后自动淘汰很久没有访问过的单词缓存。
4. 清除浏览器缓存、无痕模式会丢失所有本地词库、历史记录和密钥。
5. 输入上限：单次查询最多200字符。

## 使用小技巧
1. 查询一个单词后，直接点击解析内容里陌生单词，链式连续查词，不用复制粘贴。
2. 遇到长段英文，鼠标选中部分短语右键直接查询短语释义。
3. 查询过的单词会存入生词本，定期导出文本，导入Anki等记忆软件。
4. 桌面端拖拽目录侧边栏放到你顺手的屏幕一侧，长解析文档快速跳转。
5. 中文句子查询适合写作文、邮件前对比多种风格英文版本。

## 常见故障排查
1. 网络请求失败 / fetch error
> 大概率是直接双击打开本地html，出现跨域，改用Live Server或者部署网页。

2. API Key无效报错
> 检查密钥复制是否带多余空格，确认DeepSeek账户余额充足，密钥权限正常。

3. 存储空间不足
> 浏览器localStorage已满，点击清理缓存按钮，清理旧词库。

4. 解析内容重复大量文字
> 内置自动折叠AI重复输出逻辑，如果依旧出现重复，重新发起查询。

---

# 开发者说明

## 技术总览

### 技术栈
- 基础技术：原生 HTML5 + CSS3 + Vanilla JavaScript，无 Vue、React 等前端框架
- Markdown渲染：marked@12.0.2，CDN引入，用于将AI返回Markdown转换为页面HTML
- 字体资源：Google Fonts Noto Serif SC，降级使用系统宋体
- AI后端接口：DeepSeek Chat Completions SSE 流式接口
- 本地存储：浏览器 localStorage，全部业务数据持久化
- 浏览器能力：AbortController、IntersectionObserver、PointerEvent、Selection、SSE ReadableStream 流式解析

### 整体架构思想
项目为单文件单页应用，全部业务写在一个 HTML 文件中，分为三层。
1. UI表现层：HTML 结构 + CSS变量主题系统，明暗两套主题，玻璃拟态、完整响应式、弹窗、悬浮侧边栏。
2. 业务逻辑层 JS：包含主题管理、LocalStorage持久化、导航栈、历史记录、生词本、SSE流式请求、markdown后处理、点击查词、右键菜单、TOC目录、复制导出等模块。
3. 外部接口层：直接 fetch 请求 DeepSeek SSE 流式接口，无自建后端代理。

架构特点：零构建、零编译、直接运行。不需要 webpack/vite，修改代码直接刷新浏览器即可调试；代价是所有模块通过函数隔离，没有 import/export 模块化语法。

### 文件结构
```
index.html
├─ HTML部分
│  ├─ 页面主体布局、导航、输入区、结果区
│  ├─ Modal弹窗（生词本）
│  ├─ 右键上下文菜单 ctxMenu
│  ├─ TOC桌面侧边栏 + 移动端目录浮层
│  └─ 各种DOM容器、按钮
├─ <style> CSS全部样式
│  ├─ CSS变量系统（亮色主题 root）
│  ├─ [data-theme="dark"] 暗色主题覆写变量
│  ├─ 动画、滚动条、弹窗、响应式media查询
│  └─ TOC拖拽样式、弹簧缓动变量
└─ <script> JS业务逻辑
    ├─ 常量定义 STORAGE_KEYS / API_ENDPOINT
    ├─ 页面初始化 DOMContentLoaded
    ├─ 主题模块
    ├─ API Key管理模块
    ├─ 工具小函数
    ├─ 导航栈历史（前进后退逻辑）
    ├─ 查询历史记录模块
    ├─ 单词点击查询逻辑
    ├─ 右键选中文本查询模块
    ├─ 生词本Modal、增删查导出
    ├─ 核心：analyzeWord 流式SSE请求
    ├─ Prompt模板构建 buildSystemPrompt()
    ├─ Markdown清洗与后处理函数
    ├─ 复制文本功能
    └─ TOC目录侧边栏、拖拽逻辑、窗口resize处理
```

## 核心模块原理详解

### 存储层设计 localStorage
所有数据全部存储浏览器本地，没有后端数据库。
- 使用统一 `STORAGE_KEYS` 常量管理全部存储键，方便后续版本迁移修改前缀，避免键名硬编码散落在代码。
- 缓存单词解析：`word_cache_v5_${word}`，key为前缀+小写单词。
- 缓存淘汰策略：
    - 最大缓存上限 `MAX_CACHE_SIZE=200`
    - 淘汰优先：不在查询历史中的缓存先删除；如果全部都在历史，则淘汰最旧的几条。
- localStorage 为同步读写，大量存储会阻塞主线程。

> 版本迭代建议：修改存储key的版本后缀可以实现新旧数据隔离，避免升级后旧数据结构错乱。

### 导航栈系统（前进 / 后退）
变量说明：
- `navStack`：数组，每一项 `{word, html}`，保存查询词+渲染后的HTML；
- `navIndex`：当前指针；
- `isManualSearch`：布尔标记，区分两种查询来源：
    1. 手动搜索（输入框回车 / 点击按钮 / 历史记录点击）：清空整个导航栈，开启全新浏览链；
    2. 引申查询（点击页面单词、右键选中查询）：不会清空栈，截断当前指针后面历史，push新记录，实现链式查词后退。

额外能力：
- 监听鼠标侧键(XButton1/XButton2)、浏览器popstate、Alt+←/Alt+→快捷键；
- URL searchParams `?q=xxx` 支持页面刷新自动恢复查询。

> 注意：navStack 只在localStorage存word文本，HTML页面内容不存入导航栈存储；打开页面时会去 `word_cache_v5_*` 读取HTML缓存。如果缓存被清理，导航栈会降级重新调用AI接口。

### 流式SSE请求核心 analyzeWord()
对接DeepSeek stream模式，采用 fetch + ReadableStream 手动解析SSE数据流，没有引入 EventSource。

> 为什么不用EventSource：EventSource不支持自定义请求头Authorization，不支持POST请求体，因此只能手动解析二进制流。

执行流程：
1. 输入校验 `validateInput()`；
2. 检查本地缓存，如果命中直接渲染DOM，不走网络请求；
3. 未命中缓存：创建 `AbortController`，可以随时终止网络流；
4. fetch POST接口开启 stream:true；
5. reader.read() 循环读取二进制块，TextDecoder解码utf‑8；
6. 按换行切分SSE行，解析`data:`字段；
7. 增量拼接markdown字符串 `markdownAcc`；
8. 节流渲染：不是每个token都渲染DOM，`RENDER_INTERVAL_MS=80ms`，降低页面重绘压力；
9. 流结束后，移除闪烁光标，保存HTML进入localStorage缓存，调用`makeWordsClickable()`把结果内英文单词变成可点击；
10. 调用`buildTOC()`自动生成目录导航。

文本清洗工具函数：
- `stripOpeningFluff()`：去除AI开头的客套废话；
- `collapseRepeatedLines()`：自动折叠AI无限重复输出的行；
- `fixMarkdownHeadings()`：修复流输出中#标题缺少换行，导致markdown渲染失败。

### Prompt模板系统 buildSystemPrompt()
根据输入自动区分4种模式：
1. 英文单个单词
2. 英文短语带空格
3. 中文输入：根据中文字符长度分三档
    - ≤3字：同义词罗盘
    - 4~12字：译法多解
    - >12字：译境探索

模板全部硬编码JS字符串，输出严格Markdown格式。返回结果后，再做后处理：
- `applyExamTags()`：解析【词汇等级】，插入彩色考试标签DOM；
- `applyTitleColors()`：给标题strong/h2/h3附加不同颜色class。

> 如果需要新增语言、修改输出格式，只需要修改本函数内system prompt文本。

### 结果区单词自动点击 makeWordsClickable()
核心逻辑：
1. 使用 createTreeWalker 遍历结果区内所有文本节点；
2. 正则匹配英文单词 `[a-zA-Z]+(?:[-\'][a-zA-Z]+)*`；
3. 排除黑名单：音标`[xxx]`、已经是`.clickable-word`、标签内部、script/style；
4. 将纯文本单词替换为 `<span class="clickable-word" data-word="xxx">word</span>`；
5. 事件委托在document监听click，点击后设置`isManualSearch=false`执行引申查询；
6. 特殊处理：`wrapBracketContent()`，把方括号音标包裹为`no‑click`，防止音标内字母被识别为可点击单词。

> 限制：只能识别结果渲染完成后的静态DOM；流式输出过程中不会实时添加点击，等完整渲染完毕才执行一次。

### 右键菜单查询 contextmenu
监听结果区右键事件：
1. 判断鼠标是否在`#resultContent`内部；
2. 获取浏览器`window.getSelection()`选中的文本；
3. 过滤长度，提取英文部分；
4. 阻止原生右键，显示自定义悬浮菜单，自动做视口边界检测，防止菜单超出屏幕；
5. Enter快捷键、点击菜单项触发查询。

### TOC目录侧边栏
- **自动生成目录 buildTOC()**
  扫描结果内带 `title‑*` class 的 `<strong>` / `<h2><h3>`，自动生成锚点ID `sec‑xx`；
  使用IntersectionObserver监听滚动，自动高亮当前阅读的目录项。
- **拖拽功能**：基于 PointerEvent，同时兼容鼠标与触屏
    - pointerdown 开始拖拽，pointermove移动，pointerup结束；
    - 拖拽结束根据面板中心与视口中线，自动吸附到屏幕左边/右边；
    - 点击箭头按钮会执行穿梭动画切换左右位置。
- **响应式分支**：窗口>1100px显示桌面悬浮侧边栏；小窗口切换为移动端底部弹出浮层。

### 生词本Modal弹窗
全部单词是扫描localStorage所有`word_cache_v5_*`key拿到词列表，不是单独维护一张词表。

> 重要：生词本没有独立数据表。生词等价于所有查询缓存的单词。删除缓存即从生词本移除；导出也是遍历全部缓存key。
> 优点：不需要双端维护列表；缺点：清除缓存会直接清空词库。
> 如果未来需要实现收藏单词（不随缓存删除），需要新增独立storage数组保存收藏单词列表。

## 配置常量
```js
const API_ENDPOINT = 'https://api.deepseek.com/chat/completions';
const MODEL_NAME = 'deepseek-chat';
const MAX_INPUT_LENGTH = 200;    // 单次输入字符上限
const MAX_HISTORY_SIZE = 50;     // 查询历史最大条数
const MAX_CACHE_SIZE = 200;      // 解析缓存最大条数
```
修改上面常量即可调整限制。

## 部署与构建说明

### 开发调试
直接使用 VSCode + Live Server，热刷新，不需要编译。

### 生产部署
把index.html部署到任意静态网页服务器：Nginx、Github Pages、Vercel、Netlify、Caddy。
> 浏览器直接file://打开会触发CORS跨域，fetch请求失败。

### 离线本地化CDN
当前CDN依赖两处：
```html
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```

想要完全离线：
1. 下载 marked.min.js 放到本地，修改script的src为本地路径；
2. 下载Noto Serif SC字体文件，替换Google Fonts为@font-face本地字体。

## 开发者维护注意事项

### 存储升级注意
- 所有localStorage key统一写在`STORAGE_KEYS`对象。
- 如果新版本修改数据存储结构，必须修改key的版本后缀，不要复用旧key，避免旧JSON结构解析报错。
- 读取localStorage全部要包裹 try‑catch，防止用户本地存储损坏，JSON.parse抛异常导致页面白屏。

### DOM安全 XSS风险点
本项目AI返回Markdown交给marked.parse()转HTML。
marked默认开启HTML解析，AI输出HTML标签会直接渲染到页面，存在潜在XSS风险。
风险来源：大模型返回 `<script>`, `<iframe>` 等恶意标签。

可选加固方案：
引入 DOMPurify，在marked.parse()之后做HTML消毒。
```js
let htmlHtml = DOMPurify.sanitize(marked.parse(cleaned));
```
当前版本未引入，属于可优化项。

### SSE流式代码维护坑
1. 流处理使用手动解析SSE，不是标准EventSource；修改流逻辑务必测试异常情况：网络断开、分片不完整、[DONE]分片跨buffer边界。
2. 存在两个结束信号：finish_reason 和 [DONE]，代码两处都要判断，防止流挂起不结束。
3. 渲染节流定时器renderTimer必须在流结束的时候clearTimeout，防止流结束后还残留定时器覆盖DOM。
4. AbortController请求取消之后会抛出AbortError异常，需要捕获区分业务错误，不要展示错误弹窗。

### TOC拖拽模块维护注意
- 使用PointerEvent，不要用mouse事件，保证触屏设备也能拖拽侧边栏。
- 拖拽结束动画不要直接修改transform永久值，动画完成后清除inline style，交还CSS类控制，避免内联样式污染。
- resize窗口需要重新判断是否显示侧边栏。

### 导航栈维护注意
- isManualSearch状态很关键，新增查询入口，必须正确设置这个布尔值，否则前进后退逻辑错乱。
- 从导航栈跳转，如果对应单词缓存被清理，会降级重新调用AI。

### 缓存淘汰逻辑
evictOldCache()缓存清理逻辑：优先清理不在history历史的缓存。
修改时注意：不要把正在导航栈使用的缓存误删除，会造成跳转页面空白。

### CSS维护规范
- 全部颜色、阴影、圆角、动画缓动都放在:root CSS变量，暗色主题[data-theme="dark"]只覆写变量，不要写重复业务CSS。
- 新增颜色请增加对应的变量，不要写死十六进制颜色。
- 动画大量使用自定义弹簧缓动 --ease‑spring，修改动画效果优先调整这个cubic‑bezier。

### 浏览器兼容性
最低兼容现代浏览器：Chrome >= 89、Edge、Firefox、Safari 14+
依赖API：
- ReadableStream 流式读取响应；
- IntersectionObserver目录滚动高亮；
- PointerEvents拖拽；
  旧版浏览器不做兼容降级。

### 新增功能开发建议
1. 如果要新增后端代理：
   当前浏览器直接请求DeepSeek，用户密钥保存在浏览器；如果搭建代理后端，密钥放到服务端，前端不再存储API‑Key，需要大规模改写analyzeWord请求部分。
2. 如果需要实现真正的“收藏单词”：
   新增独立storage数组存储收藏单词列表，和缓存分离，即使缓存清除收藏记录还保留。
3. 多语言翻译模板：在buildSystemPrompt()新增分支，增加system prompt。

### 已知代码债务 / 待优化点
1. Markdown渲染无DOMPurify消毒，存在XSS潜在风险；
2. 生词本列表完全复用查询缓存，没有独立收藏表；
3. 全部JS是全局函数，没有模块化，变量全部挂在window全局；
4. 流式输出阶段不能做点击查词，要等全部渲染完毕；
5. localStorage存储容量有限，大量查询后会触发存储空间已满提示。

## 调试小技巧
1. 打开浏览器F12 Console调试；
2. Application → LocalStorage，可以直接查看/修改所有存储键，快速模拟缓存满、清空缓存场景；
3. Network面板过滤 api.deepseek.com，查看SSE请求流；
4. 模拟断网，测试AbortController、异常错误提示分支。

## 开源许可
本项目为单页面演示工具，仅供个人学习研究。
- 依赖 marked: MIT License
- 使用DeepSeek API请遵守DeepSeek服务条款。
  禁止直接商用；二次分发请保留原作者注释。