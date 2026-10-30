# SparkHub — 数字艺术与灵感策展志

> **“发现灵感，创造不凡”** — 在算法与秩序的褶皱里，收藏有温度的数字造物。

SparkHub 是一座专注于数字界面美学、先锋创客实验与生成式视觉艺术的在线文献馆与灵感策展空间。采用现代社论印刷版式（Editorial & Monograph Typography）与瑞士网格体系，融合纸张暖度与交互实验，为设计师、全栈工程师与创意写作者提供源源不断的审美张力与工程思考。

---

## 🏛️ 五大馆藏展厅 (Exhibition Wings)

- **WING I · 每日灵感漫游志 (Daily Curatorial Broadsheet)**
  - 每日从 Product Hunt、Awwwards、Luma、ETHGlobal、21st.dev 与 Cosmos 等全球信源采撷新锐器物、独立网站、微交互手记与跨界聚落。
  - 配备学术引言、出处考证（Provenance）与策展人笔记（Curator's Note）。
- **WING II · 常设数字设计馆藏 (Permanent Collection)**
  - 精选涵盖 Web、Mobile、Brand Identity、3D Spatial、Kinetic Motion、Illustration、Interaction 及 **Design Engineering（设计工程）** 的经典数字造物。
  - 搭载七大生成式几何图腾（Bauhaus、Kinetic、Topography、Prism、Orbital、Editorial、Matrix）与双向键盘导航文献灯箱。
- **WING III · 全球黑客松与高票造物 (Hackathon Editions & Specimens)**
  - 按 **移动端 App (iOS / Android)**、**Web 网站与应用**、**AI 智能体与系统**、**跨端硬件与空间计算** 四大平台深度分类。
  - 完整收录 Google Devpost、ETHGlobal、Solana Colosseum、Stanford TreeHacks、Cerebral Valley、DoraHacks、VisionDevCamp 与 Anthropic 等各大平台的赛事排期（标注几月几号办、哪一期、所属平台与总奖池）。
  - 卡片式集中展陈各期赛事中**社区投票最高、获特等奖的先锋产品**，每个产品均配有详实档案并提供**独立详情页 (`/products/[id]`)** 与直达产品主站的外部链接。
- **WING IV · 算法与合成美学 (Generative Symposium / 暗房特展)**
  - 探索高维隐空间、多模态意图与生成式参数化艺术（Midjourney 概念建筑、Flux.1 美学实验、Magnific 8K 超分重构、GPT-4o 沉浸式桌面等）。
- **WING V · 灵感信源图谱 (Inspiration Source Atlas)**
  - 覆盖 App、Web、SaaS、设计系统、品牌、字体、配色、动效、设计素材与中文社区等 10 大专业板块的全球信源总览。
  - 严格贯彻「真实产品 70% · 视觉案例 20% · 跨界实验 10%」巡航配比，内置核心 12 站快速筛选、巡航频次（Daily / Weekly / Monthly）与专业观察要点提示。

---

## ✨ 核心策展交互功能 (Curatorial Features)

1. **全馆实时多维检索与遥测指示条 (Curatorial Telemetry Bar)**
   - 输入关键词即时检索每日漫游、常设馆藏、黑客松、AI 特展与信源图谱五类内容；忽略大小写和首尾空格，两个搜索框同步。
   - 命中数与当前分类筛选后的实际列表一致；「重置检索」清空关键词，保留各展区分类选择。
2. **标签联动过滤 (Tag-based Cross-wing Filtering)**
   - 全馆所有展品与文献中的 `#标签` 均可点击，即时聚焦特定学术领域（如 `#设计工程`、`#WebGL`、`#AI应用`、`#Awwwards`、`#Rust`）。
3. **个人策展画夹与页内收藏筛选 (Personal Curatorial Folio & Favorites Filter)**
   - 五类内容卡片均配有直观的「♡ 收藏 / ♥ 已收藏」按钮，支持在顶部「♥ 我的收藏」画夹弹窗中按类别查看和移除，亦可在主页面快捷栏一键开启「♥ 只看已收藏」页内筛选。收藏保存到当前浏览器的本地存储，刷新后恢复；存储被禁用时仅在当前页面内保留。
   - **一键导出 Markdown 策展笔记**：桌面与手机端均可下载 `.md` 文件，包含全部收藏（不受画夹当前分类影响）的类别、标题、作者/出处、摘要、标签和原站链接；文件名使用浏览器本地日期。
4. **快捷浏览控制栏与渐进式展陈 (Quick View Bar & Progressive Disclosure)**
   - **展区聚焦切换**：支持在「全部展区」与单一展区（每日漫游、常设画廊、极客造物、算法美学、信源图谱）之间一键切换，避免长页面信息过载。
   - **舒适视图 / 紧凑列表切换**：支持在图文详实的社论卡片视图与高密度多列紧凑列表之间即时切换。
   - **默认精简展示与按需展开**：「全部展区」默认优先呈现各馆精选条目（漫游志 6 期、常设馆藏 6 件、黑客松 2 期、信源图谱 12 站），可通过底部按钮一键展开全部馆藏。
5. **深色暗房 / 浅色纸本双主题模式 (Dark & Light Theme Mode)**
   - 支持一键切换浅色「暖羊皮纸」与深色「黑曜石暗房」主题，自动同步系统 `prefers-color-scheme: dark` 偏好并持久化至 `localStorage`（`sparkhub:theme`），首屏内联脚本保障零闪烁渲染。
6. **独立产品详情页与赛事专区 (Dedicated Product & Hackathon Pages)**
   - 彻底超越浅层弹窗，为每个黑客松高票产品构建**全功能独立详情页 (`/products/[id]`)**，详实呈现产品机制、解决痛点、交互亮点、赛事背景与技术栈，并提供显著的**直达产品主站体验 (Official Site ↗)** 按钮与 GitHub 仓库入口。
   - 提供**赛事期数专属页面 (`/hackathons/[id]`)**，按期数完整陈列当期所有参赛高票作品。
7. **统一文献详情灯箱 (Curatorial Dossier Modal)**
   - 为每日文献、黑客松原型与 AI 特展提供深度评述、学术引文一键复制、原站直达链接与画夹收藏。复制成功以剪贴板写入完成为准；权限拒绝或接口不可用时提示失败，并提供可选择的引文文本。
   - 详情与画夹使用原生模态对话框：打开后焦点进入弹窗，背景不可交互，关闭后返回触发元素；支持 Esc、关闭按钮和遮罩关闭。
   - 常设馆藏灯箱支持左右方向键切换，小屏下正文可滚动，顶部导航和关闭按钮始终可见。
8. **灵感漫步 (Serendipity Roulette)**
   - 顶部导航栏从每日漫游、黑客松与 AI 特展三类内容中随机抽选，打开对应详情；不包含常设馆藏与信源图谱。

---

## 🛠️ 技术栈与视觉系统 (Tech Stack & Visual System)

- **框架**: Next.js 16.3 (Turbopack, App Router, Static Export `output: 'export'`)
- **运行时**: React 19 (RSC 服务端预渲染首屏展签 + Client Island 交互层)
- **样式系统**: Tailwind CSS v4 (`@theme inline` 原生设计规范与博物馆矿物色彩令牌)
  - `#F6F2E9` 暖羊皮纸基底 (Alabaster Parchment)
  - `#C8432B` 策展朱砂 (Curatorial Vermilion)
  - `#4A3BC2` 皇家群青 (Royal Ultramarine)
  - `#245E47` 孔雀石绿 (Malachite Green)
  - `#B87B18` 典藏赭金 (Archive Ochre)
  - `#141312` 黑曜石暗房 (Obsidian Darkroom)
- **字体与版式**: 现代社论 Serif (`Instrument Serif` / `Playfair Display` / `Songti SC`) + 无衬线 (`Plus Jakarta Sans` / `PingFang SC`) + 馆藏等宽编号 (`JetBrains Mono`)
- **语言**: TypeScript (全链路类型安全)
- **自动化部署**: GitHub Actions (`.github/workflows/deploy.yml`) 推送 `main` 分支后自动构建并发布至 GitHub Pages ([https://naijoug.github.io/sparkhub/](https://naijoug.github.io/sparkhub/))

---

## 🚀 快速开始 (Getting Started)

### 开发环境启动

```bash
npm run dev
# 或 yarn dev / pnpm dev / bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可漫游画廊。

### 质量检查与构建

```bash
# 代码规范检查
npm run lint

# 生产环境静态打包构建
npm run build
```

### 浏览器回归检查

```bash
npm ci
npx playwright install chromium
npm run test:e2e
```

已有 Google Chrome 时也可用 `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`，无需另行下载 Chromium。

测试使用独立浏览器上下文，不修改日常浏览器的收藏。覆盖搜索与分类计数、收藏刷新、弹窗焦点和小屏滚动，以及实际 Markdown 下载、剪贴板内容和失败反馈。默认复用 `http://127.0.0.1:3000` 的本地服务，没有服务时自动启动；可设置 `PLAYWRIGHT_BASE_URL` 测试已启动的构建预览。失败记录与下载样例位于被 Git 忽略的 `test-results/`。

---

## 📄 许可与声明

© 2024–2026 SparkHub Curatorial Archive. All rights reserved. Form follows poetics.
