export type AccentTone = "accent" | "purple" | "green" | "yellow";

export interface DesignCard {
  id: string;
  catalogNo: string;
  title: string;
  subtitle: string;
  author: string;
  categoryId: string;
  year: string;
  medium: string;
  image: string;
  artMotif: "bauhaus" | "kinetic" | "topography" | "prism" | "orbital" | "editorial" | "matrix";
  tags: { label: string; color: AccentTone }[];
  likes: string;
  views: string;
  featuredSpan?: "wide" | "normal";
  curatorCritique?: string;
  href?: string;
}

export interface HackathonCard {
  id: string;
  catalogNo: string;
  title: string;
  team: string;
  summary: string;
  image: string;
  badge: string;
  badgeColor: AccentTone;
  href?: string;
  curatorNote?: string;
  tags?: string[];
}

export interface AIContestCard {
  id: string;
  catalogNo: string;
  title: string;
  meta: string;
  curatorNote: string;
  image: string;
  badge: string;
  badgeColor: AccentTone;
  href?: string;
  tags?: string[];
}

export type CurationCategory = "all" | "product" | "event" | "website";

export interface DailyCurationItem {
  id: string;
  issueNo: string;
  category: Exclude<CurationCategory, "all">;
  categoryLabel: string;
  title: string;
  creatorOrHost: string;
  summary: string;
  curatorNote: string;
  dateAdded: string;
  tags: string[];
  accent: AccentTone;
  href: string;
  sourceName: string;
}

export interface Category {
  id: string;
  label: string;
  enLabel: string;
  count: number;
  active?: boolean;
}

export const categories: Category[] = [
  { id: "all", label: "全部展品", enLabel: "ALL WORKS", count: 16, active: true },
  { id: "web", label: "网页设计", enLabel: "WEB & EDITORIAL", count: 2 },
  { id: "interaction", label: "交互设计", enLabel: "INTERACTIVE", count: 2 },
  { id: "design-eng", label: "设计工程", enLabel: "DESIGN ENG", count: 2 },
  { id: "motion", label: "动效设计", enLabel: "KINETIC", count: 2 },
  { id: "3d", label: "3D 设计", enLabel: "SPATIAL 3D", count: 2 },
  { id: "brand", label: "品牌设计", enLabel: "IDENTITY", count: 2 },
  { id: "mobile", label: "移动应用", enLabel: "MOBILE", count: 2 },
  { id: "illustration", label: "插画设计", enLabel: "ILLUSTRATION", count: 2 },
];

export const hotTags = [
  { label: "设计工程", color: "accent" as const },
  { label: "AI 应用", color: "green" as const },
  { label: "WebGL", color: "purple" as const },
  { label: "仪表盘", color: "yellow" as const },
  { label: "移动端", color: "accent" as const },
  { label: "B端后台", color: "purple" as const },
  { label: "数据可视化", color: "green" as const },
  { label: "Awwwards", color: "yellow" as const },
  { label: "Rust", color: "purple" as const },
];

const gradients = [
  "from-[#C8432B] via-[#9E2E1D] to-[#1D1210]", // 0
  "from-[#332B66] via-[#4A3BC2] to-[#141222]", // 1
  "from-[#194434] via-[#245E47] to-[#0D1E17]", // 2
  "from-[#5E2E50] via-[#8F3D64] to-[#1E111B]", // 3
  "from-[#A66C14] via-[#C8432B] to-[#21170F]", // 4
  "from-[#1B455C] via-[#2A6888] to-[#0E1E28]", // 5
  "from-[#7D2630] via-[#B5402A] to-[#1A1012]", // 6
  "from-[#3D2E6B] via-[#604A9E] to-[#161222]", // 7
  "from-[#1E4C3B] via-[#32755B] to-[#0E1F19]", // 8
  "from-[#8A4E16] via-[#BA6B22] to-[#1F150C]", // 9
  "from-[#1E365E] via-[#35578F] to-[#101828]", // 10
  "from-[#662B50] via-[#944073] to-[#1F101A]", // 11
  "from-[#2F522F] via-[#497A49] to-[#111D11]", // 12
  "from-[#1B4A52] via-[#2A727D] to-[#0E1F23]", // 13
  "from-[#4F2D6B] via-[#7B3A9B] to-[#1A1024]", // 14
  "from-[#8C3A27] via-[#B35237] to-[#1E110E]", // 15
  "from-[#24453A] via-[#3B6B5C] to-[#0F1E19]", // 16
  "from-[#2B3A67] via-[#41589C] to-[#12182B]", // 17
  "from-[#614728] via-[#8F6A3D] to-[#1E170F]", // 18
  "from-[#354347] via-[#52686F] to-[#161B1D]", // 19
];

export const featuredCards: DesignCard[] = [
  {
    id: "1",
    catalogNo: "ARCHIVE № 01",
    title: "FinTech 秩序感资产叙事仪表盘",
    subtitle: "受瑞士网格主义启发的超高密度量化交易与多维资产图谱界面",
    author: "Atelier Nord · Zurich",
    categoryId: "web",
    year: "2026",
    medium: "Design System · Web UI",
    image: gradients[0],
    artMotif: "bauhaus",
    featuredSpan: "wide",
    tags: [
      { label: "仪表盘", color: "accent" },
      { label: "金融科技", color: "purple" },
      { label: "数据可视化", color: "yellow" },
    ],
    likes: "2.4k",
    views: "12.8k",
    curatorCritique: "将庞杂的金融流体数据以严谨的网格秩序编排，在极高信息密度下依然保有呼吸感与版面尊严。",
    href: "https://www.awwwards.com/",
  },
  {
    id: "2",
    catalogNo: "ARCHIVE № 02",
    title: "Symbiosis 思维链多模态对话画布",
    subtitle: "将非线性推理节点转化为星轨拓扑的生成式交互界面探索",
    author: "AILab Creative · Tokyo",
    categoryId: "interaction",
    year: "2026",
    medium: "Generative UI · Interaction",
    image: gradients[1],
    artMotif: "orbital",
    tags: [
      { label: "AI 应用", color: "green" },
      { label: "对话画布", color: "yellow" },
    ],
    likes: "3.1k",
    views: "18.5k",
    curatorCritique: "打破了自上而下的线性聊天气泡局限，赋予思维链推理过程以有机生长的拓扑星轨形态。",
    href: "https://www.producthunt.com/",
  },
  {
    id: "3",
    catalogNo: "ARCHIVE № 03",
    title: "Maison Éclat 买手制数字杂志店",
    subtitle: "将纸质艺术书刊的留白、衬线排印与微阻尼触控手势引入移动电商",
    author: "PixelCraft · Paris",
    categoryId: "mobile",
    year: "2026",
    medium: "Mobile Editorial · iOS",
    image: gradients[2],
    artMotif: "editorial",
    tags: [
      { label: "移动端", color: "accent" },
      { label: "社论排版", color: "yellow" },
    ],
    likes: "1.8k",
    views: "9.2k",
    curatorCritique: "把高定独立杂志的纸张触感转译为屏幕像素的微阻尼滑动手感，为移动电商注入罕见的优雅气息。",
    href: "https://www.cosmos.so/",
  },
  {
    id: "4",
    catalogNo: "ARCHIVE № 04",
    title: "Monolith 静音主义企业级工作台",
    subtitle: "以建筑立面模数与低饱和矿物色阶重构复杂 SaaS 多租户管理架构",
    author: "TechUI Lab · Berlin",
    categoryId: "brand",
    year: "2026",
    medium: "Enterprise Identity · System",
    image: gradients[3],
    artMotif: "prism",
    tags: [
      { label: "B端后台", color: "purple" },
      { label: "仪表盘", color: "accent" },
    ],
    likes: "1.6k",
    views: "7.3k",
    curatorCritique: "摒弃了常规企业软件的花哨质感，以建筑立面模数传递出恒久而安静的专业信赖度。",
    href: "https://linear.app/method",
  },
  {
    id: "5",
    catalogNo: "ARCHIVE № 05",
    title: "Circadian 生物节律与体征动态图谱",
    subtitle: "采集昼夜心率变异性与呼吸波形，生成如同流体雕塑般的健康视觉志",
    author: "FitDesign Studio · Stockholm",
    categoryId: "motion",
    year: "2026",
    medium: "Data Art · Kinetic UI",
    image: gradients[4],
    artMotif: "kinetic",
    featuredSpan: "wide",
    tags: [
      { label: "数据可视化", color: "accent" },
      { label: "移动端", color: "green" },
    ],
    likes: "2.9k",
    views: "15.1k",
    curatorCritique: "不仅是健康指标的可视化，更将生理体征数据化为会呼吸的艺术雕塑，充满生命温度。",
    href: "https://www.awwwards.com/",
  },
  {
    id: "6",
    catalogNo: "ARCHIVE № 06",
    title: "Forma 国际主义艺术史数字读本",
    subtitle: "致敬乌尔姆造型学院版式传统，融合边注索引与矢量版画插图的知识库",
    author: "EduUX Press · Basel",
    categoryId: "illustration",
    year: "2026",
    medium: "Editorial Web · Illustration",
    image: gradients[5],
    artMotif: "topography",
    tags: [
      { label: "知识读本", color: "purple" },
      { label: "矢量插画", color: "yellow" },
    ],
    likes: "1.2k",
    views: "5.6k",
    curatorCritique: "边注、网格与纯矢量线条的纯粹交融，让在线阅读拥有沉静深思的纸上漫步感。",
    href: "https://www.cosmos.so/",
  },
  {
    id: "7",
    catalogNo: "ARCHIVE № 07",
    title: "Aether 声学空间三维数字展厅",
    subtitle: "基于实时光线追踪与声场粒子折射的 WebGL 沉浸式建筑漫游装置",
    author: "Studio Kinetix · London",
    categoryId: "3d",
    year: "2026",
    medium: "Spatial WebGL · 3D Installation",
    image: gradients[7],
    artMotif: "prism",
    tags: [
      { label: "WebGL", color: "purple" },
      { label: "空间计算", color: "green" },
    ],
    likes: "3.6k",
    views: "21.4k",
    curatorCritique: "在浏览器中以 60fps 实时运行光追与声场粒子计算，是三维网页展陈技术水准的顶尖展示。",
    href: "https://www.awwwards.com/",
  },
  {
    id: "8",
    catalogNo: "ARCHIVE № 08",
    title: "Chrono 触觉声音合成器交互界面",
    subtitle: "模拟机械腕表擒纵机构与磁带循环阻尼感的浏览器端音乐创作实验",
    author: "Teenage Waves · Kyoto",
    categoryId: "interaction",
    year: "2026",
    medium: "Tactile Audio · Web Synth",
    image: gradients[8],
    artMotif: "orbital",
    tags: [
      { label: "声音交互", color: "yellow" },
      { label: "WebGL", color: "accent" },
    ],
    likes: "2.7k",
    views: "14.2k",
    curatorCritique: "将实体旋钮与机械发条的物理阻尼感巧妙投影在光标手势中，是触觉交互设计的教科书之作。",
    href: "https://www.teenageengineering.com/",
  },
  {
    id: "9",
    catalogNo: "ARCHIVE № 09",
    title: "A24 数字化胶片美学交互影院",
    subtitle: "将独立电影分镜、流体时间轴与编辑印刷版式无缝契合的沉浸式数字展馆",
    author: "Ravi Klaassens · Amsterdam",
    categoryId: "web",
    year: "2026",
    medium: "Cinematic Web · Awwwards SOTD",
    image: gradients[15],
    artMotif: "editorial",
    tags: [
      { label: "Awwwards", color: "yellow" },
      { label: "社论排版", color: "accent" },
      { label: "WebGL", color: "purple" },
    ],
    likes: "3.8k",
    views: "24.1k",
    curatorCritique: "以极高审美标准重新定义电影数字化展陈，流体转场与动态排印在明暗光影中娓娓道来。",
    href: "https://www.awwwards.com/sites/a24",
  },
  {
    id: "10",
    catalogNo: "ARCHIVE № 10",
    title: "Rive 交互矢量状态机与微动效矩阵",
    subtitle: "基于运行时代码直接调控的下一代实时矢量物理骨骼与动效状态机系统",
    author: "Rive Atelier · San Francisco",
    categoryId: "motion",
    year: "2026",
    medium: "State Machine · Interactive Vector",
    image: gradients[14],
    artMotif: "kinetic",
    tags: [
      { label: "动效设计", color: "accent" },
      { label: "交互设计", color: "green" },
    ],
    likes: "2.2k",
    views: "11.7k",
    curatorCritique: "告别了体积臃肿的视频与 Lottie 序列帧，让界面动效真正成为可接收光标实时力学反馈的活体构件。",
    href: "https://rive.app/",
  },
  {
    id: "11",
    catalogNo: "ARCHIVE № 11",
    title: "Spline 空间多维实时光影雕塑",
    subtitle: "浏览器端实时光线步进渲染与空间三维几何形变艺术实验",
    author: "Spline Creative · Worldwide",
    categoryId: "3d",
    year: "2026",
    medium: "3D Spatial · WebGL Canvas",
    image: gradients[13],
    artMotif: "prism",
    tags: [
      { label: "3D 设计", color: "purple" },
      { label: "WebGL", color: "green" },
    ],
    likes: "4.1k",
    views: "29.3k",
    curatorCritique: "赋予非专业 3D 创作者在浏览器内调校复杂折射材质与布料动力学的能力，推动了 3D 网页普及潮。",
    href: "https://spline.design/",
  },
  {
    id: "12",
    catalogNo: "ARCHIVE № 12",
    title: "Linear Sync Engine 极速同步设计规范",
    subtitle: "以毫秒级离线优先乐观更新与低碳排版构建的现代软件工匠精神图腾",
    author: "Linear Design Team · San Francisco",
    categoryId: "brand",
    year: "2026",
    medium: "Design System · Enterprise Identity",
    image: gradients[17],
    artMotif: "matrix",
    tags: [
      { label: "B端后台", color: "purple" },
      { label: "设计工程", color: "accent" },
    ],
    likes: "4.5k",
    views: "32.0k",
    curatorCritique: "成为全球设计工程师心目中的美学黄金基准，把工具软件的响应速度升华为了品牌的最高尊严。",
    href: "https://linear.app/method",
  },
  {
    id: "13",
    catalogNo: "ARCHIVE № 13",
    title: "Aceternity UI 动效设计工程基石",
    subtitle: "由 React、Tailwind CSS 与 Framer Motion 构筑的先锋动效组件与设计工程注册表",
    author: "Manu Arora × 21st.dev",
    categoryId: "design-eng",
    year: "2026",
    medium: "Component Library · Design Engineering",
    image: gradients[11],
    artMotif: "matrix",
    featuredSpan: "wide",
    tags: [
      { label: "设计工程", color: "accent" },
      { label: "React", color: "purple" },
      { label: "UI设计", color: "yellow" },
    ],
    likes: "5.2k",
    views: "38.6k",
    curatorCritique: "彻底掀起了设计工程师（Design Engineer）与 AI Coding 时代的高阶 UI 范式，将过去需数周开发的顶级微动效解构为优雅的即插即用图元。",
    href: "https://ui.aceternity.com/",
  },
  {
    id: "14",
    catalogNo: "ARCHIVE № 14",
    title: "Verve 算法字体与参数化排印实验",
    subtitle: "以贝塞尔曲率数学矩阵实时生成字形权重的实验性字体排印与数字插图系统",
    author: "Atelier Typo · Berlin",
    categoryId: "illustration",
    year: "2026",
    medium: "Generative Typography · Vector Art",
    image: gradients[16],
    artMotif: "topography",
    tags: [
      { label: "插画设计", color: "yellow" },
      { label: "字体排印", color: "accent" },
    ],
    likes: "1.9k",
    views: "10.4k",
    curatorCritique: "字形笔画随着音频振幅与光标重力产生弹性形变，将传统印刷活字带入了生成式算法的新纪元。",
    href: "https://www.cosmos.so/",
  },
  {
    id: "15",
    catalogNo: "ARCHIVE № 15",
    title: "Komorebi 极简和纸冥想时钟",
    subtitle: "模拟自然天光漫射与细微触觉震动的移动端离线数字空间",
    author: "Sora Works · Kyoto",
    categoryId: "mobile",
    year: "2026",
    medium: "Ambient UI · Mobile App",
    image: gradients[18],
    artMotif: "editorial",
    tags: [
      { label: "移动端", color: "yellow" },
      { label: "UI设计", color: "green" },
    ],
    likes: "2.1k",
    views: "13.0k",
    curatorCritique: "在通知纷扰的现代手机生态中，营造了一处如同清晨庭院竹影摇曳般的沉静避难所。",
    href: "https://www.producthunt.com/",
  },
  {
    id: "16",
    catalogNo: "ARCHIVE № 16",
    title: "ShaderCraft 粒子流场着色器实验室",
    subtitle: "纯原生 WebGL GLSL 数学着色器实时交互画廊，探究力场与混沌吸引子",
    author: "FlowMath · Montreal",
    categoryId: "design-eng",
    year: "2026",
    medium: "GLSL Shader · Creative Coding",
    image: gradients[19],
    artMotif: "matrix",
    tags: [
      { label: "设计工程", color: "accent" },
      { label: "WebGL", color: "purple" },
      { label: "数据可视化", color: "green" },
    ],
    likes: "3.4k",
    views: "22.5k",
    curatorCritique: "每一行片段着色器代码都是纯粹的数学函数，却在屏幕上渲染出宇宙星云般深邃绚烂的流体轨迹。",
    href: "https://21st.dev/",
  },
];

export const dailyCurations: DailyCurationItem[] = [
  {
    id: "c13",
    issueNo: "CURATION · 13",
    category: "website",
    categoryLabel: "灵感网站 · 动态微交互顶峰",
    title: "FlowFest 2025 — 色彩叙事与手势动效年度网站",
    creatorOrHost: "Dennis Snellenberg & Osmo · Awwwards SOTD / SOTY",
    summary:
      "由全球传奇创意开发者联合呈现，运用极具张力的色彩律动与视差层级，将活动网站转变为一场可随滚轮起舞的数字狂欢。",
    curatorNote: "动效没有一处多余的夸饰，每一个像素位移都完美服务于视觉节奏与叙事张力。",
    dateAdded: "2026-10-27",
    tags: ["Awwwards", "动态排印", "微交互", "年度网站"],
    accent: "accent",
    href: "https://www.awwwards.com/websites/",
    sourceName: "Awwwards",
  },
  {
    id: "c14",
    issueNo: "CURATION · 14",
    category: "product",
    categoryLabel: "设计工程 · AI Agent 组件注册表",
    title: "21st.dev — 面向设计工程师与 AI Coding 的开源组件集市",
    creatorOrHost: "21st.dev 社区 · 独立全栈先锋",
    summary:
      "类似设计工程师领域的 npm，汇集 Aceternity UI、Magic UI 等动效级 UI 组件，专为 Cursor 等 AI 编码智能体优化上下文注入与代码拾取。",
    curatorNote: "深刻改变了前端 UI 的生产管线：让高质量动效与复杂组件成为可被 AI 精确引用的乐高积木。",
    dateAdded: "2026-10-27",
    tags: ["设计工程", "React", "AI Agent", "开源组件"],
    accent: "purple",
    href: "https://21st.dev/",
    sourceName: "21st.dev",
  },
  {
    id: "c15",
    issueNo: "CURATION · 15",
    category: "event",
    categoryLabel: "创意活动 · 意图驱动 DeFi 智能体",
    title: "DynaVest — 自适应风险感知与自主策略执行 AI Agent",
    creatorOrHost: "ETHGlobal Taipei 2025 · Top 8 决赛赢家",
    summary:
      "基于用户自然语言意图与实时链上流动性深度，自主推演跨协议资产再平衡与对冲策略，并提供透明可验证的解释链条。",
    curatorNote: "将枯燥复杂的金融数学抽象为直觉化的多步策略推演图，展示了意图交互（Intent UX）在去中心化领域的未来。",
    dateAdded: "2026-10-27",
    tags: ["AI Agent", "意图交互", "ETHGlobal", "金融科技"],
    accent: "green",
    href: "https://ethglobal.com/",
    sourceName: "ETHGlobal",
  },
  {
    id: "c16",
    issueNo: "CURATION · 16",
    category: "website",
    categoryLabel: "设计哲学 · 微交互手记",
    title: "Invisible Details (Craft) — 界面微交互与触觉质感圣经",
    creatorOrHost: "Rauno Freiberg (@raunofreiberg)",
    summary:
      "对光标悬停力学、弹簧阻尼系数、焦点环过度与界面余温的长篇互动式沉思，被全球一线设计工程师奉为案头圣经。",
    curatorNote: "好设计往往是隐形的——那些让人感到‘顺手’的微小细节背后，是对毫秒与像素物理学极致的敬畏。",
    dateAdded: "2026-10-27",
    tags: ["微交互", "设计哲学", "设计工程", "触觉体验"],
    accent: "yellow",
    href: "https://rauno.me/craft",
    sourceName: "Craft",
  },
  {
    id: "c17",
    issueNo: "CURATION · 17",
    category: "product",
    categoryLabel: "有趣产品 · 浏览器生成式沙盒",
    title: "bolt.new & Lovable — 模糊设计与代码边界的即时全栈画布",
    creatorOrHost: "Product Hunt Golden Kitty 2024 年度双冠",
    summary:
      "允许创作者通过自然语言对话与画布圈选，在几秒内从草图推演至可部署的完整全栈 Web 应用，彻底重塑原型验证速度。",
    curatorNote: "从传统设计图向代码交接的鸿沟在此消融，设计师首次能够直接在活生生的全栈沙盒中打磨产品体验。",
    dateAdded: "2026-10-27",
    tags: ["AI工具", "全栈生成", "Product Hunt", "交互原型"],
    accent: "accent",
    href: "https://bolt.new/",
    sourceName: "Product Hunt",
  },
  {
    id: "c18",
    issueNo: "CURATION · 18",
    category: "event",
    categoryLabel: "先锋赛事 · 情绪地形图",
    title: "Signals — 连续价格区间情绪预测市场与动态热力图",
    creatorOrHost: "ETHGlobal Taipei 2025 · 顶尖决赛项目",
    summary:
      "告别传统二元对错下注，让交易者在三维高斯分布曲面上圈选预测区间，实时聚合生成整个社群对市场走势的直觉地形图。",
    curatorNote: "数据可视化的创新典范：将冷冰冰的订单簿深度重构成如同气候等温线一般的集体情绪地形图谱。",
    dateAdded: "2026-10-27",
    tags: ["数据可视化", "预测市场", "ETHGlobal", "三维图谱"],
    accent: "purple",
    href: "https://ethglobal.com/",
    sourceName: "ETHGlobal",
  },
  {
    id: "c9",
    issueNo: "CURATION · 09",
    category: "website",
    categoryLabel: "灵感网站 · 交互展陈",
    title: "Hearst Exhibit 2026 — 沉浸式数字建筑与编辑展陈",
    creatorOrHost: "Awwwards Site of the Day · SOTD",
    summary:
      "融合三维空间计算与杂志编排美学，将百年出版档案转化为可在浏览器自由漫游的虚拟建筑艺术展厅。",
    curatorNote: "展厅的光影渲染与字体层级平衡极佳，为数字空间中的文献策展提供了绝佳样本。",
    dateAdded: "2026-10-27",
    tags: ["三维展陈", "建筑美学", "Awwwards"],
    accent: "accent",
    href: "https://www.awwwards.com/sites/hearst-exhibit-2026",
    sourceName: "Awwwards",
  },
  {
    id: "c10",
    issueNo: "CURATION · 10",
    category: "product",
    categoryLabel: "有趣产品 · 原生图形引擎",
    title: "desigma — 基于 Rust 构建的高性能独立设计工具",
    creatorOrHost: "Product Hunt · 极客设计造物",
    summary:
      "基于 Rust 语言与原生图形渲染构建的自由设计套件，追求极致的画布帧率与离线优先体验。",
    curatorNote: "在云端工具泛滥的当下，重拾原生计算性能与本地文件自主权的先锋尝试。",
    dateAdded: "2026-10-27",
    tags: ["Rust", "UI设计", "独立工具"],
    accent: "purple",
    href: "https://www.producthunt.com/products/desigma",
    sourceName: "Product Hunt",
  },
  {
    id: "c11",
    issueNo: "CURATION · 11",
    category: "website",
    categoryLabel: "灵感网站 · 趋势报告",
    title: "Ai in Design Report 2026 — 全球 AI 设计趋势交互年度报告",
    creatorOrHost: "Awwwards Site of the Day · SOTD",
    summary:
      "以高度互动的数据图谱与动态排版，全景复盘生成式 AI 对全球产品设计与创意工作室工作流的重构。",
    curatorNote: "把枯燥的行业白皮书做成了兼具艺术感与探索欲的数字多媒体长卷。",
    dateAdded: "2026-10-27",
    tags: ["AI趋势", "数据叙事", "年度报告"],
    accent: "green",
    href: "https://www.awwwards.com/sites/ai-in-design-report-2026",
    sourceName: "Awwwards",
  },
  {
    id: "c12",
    issueNo: "CURATION · 12",
    category: "event",
    categoryLabel: "创意活动 · 在线设计黑客松",
    title: "Protothon 2026 — 全球 UX 原型与创意技术黑客松",
    creatorOrHost: "DubsTech × Design Buddies · Luma",
    summary:
      "由全球最大设计师社群联合发起的线上设计冲刺赛，聚焦解决真实世界社会议题的 UX 交互原型。",
    curatorNote: "不仅注重视觉完成度，更强调用户同理心与可落地性的高口碑黑客松。",
    dateAdded: "2026-10-27",
    tags: ["UX设计", "原型黑客松", "Design Buddies"],
    accent: "yellow",
    href: "https://luma.com/r4wzlr41",
    sourceName: "Luma",
  },
  {
    id: "c1",
    issueNo: "CURATION · 01",
    category: "website",
    categoryLabel: "灵感网站 · 交互叙事",
    title: "Ponpon Mania — 交互式音乐冒险视觉漫画",
    creatorOrHost: "Awwwards Site of the Year / SOTD",
    summary:
      "跟随一只梦想让全世界起舞的狂想小羊展开冒险，将手绘分镜、声音律动与 WebGL 微交互融为一体。",
    curatorNote: "打破传统网页滚动的线性束缚，把浏览器变成一部可演奏的绘本剧场。",
    dateAdded: "2026-10-27",
    tags: ["交互叙事", "WebGL", "年度网站"],
    accent: "accent",
    href: "https://www.awwwards.com/sites/ponpon-mania",
    sourceName: "Awwwards",
  },
  {
    id: "c2",
    issueNo: "CURATION · 02",
    category: "product",
    categoryLabel: "有趣产品 · AI 原型画布",
    title: "Magic Patterns — 无限画布上的 AI 产品与交互设计 Agent",
    creatorOrHost: "Product Hunt · 4.9★ 高分产品",
    summary:
      "在无限画布上把灵感草图与自然语言提示词转化为符合真实 UX 规范的可交互原型，并支持导出至 Figma。",
    curatorNote: "兼具工程严谨度与探索自由度，让产品构思像在画廊拼贴情绪板一样轻盈。",
    dateAdded: "2026-10-27",
    tags: ["AI 设计工具", "无限画布", "交互原型"],
    accent: "purple",
    href: "https://www.producthunt.com/products/magicpatterns",
    sourceName: "Product Hunt",
  },
  {
    id: "c3",
    issueNo: "CURATION · 03",
    category: "event",
    categoryLabel: "创意活动 · 跨界黑客松",
    title: "TAG — Creative AI 跨媒介艺术黑客松",
    creatorOrHost: "Luma Creative Community",
    summary:
      "汇聚影像导演、动画师、独立音乐人、3D 艺术家与平面设计师，在一天之内围绕生成式 AI 共创短片与实验视觉。",
    curatorNote: "少见的纯艺术与视听导向创客聚会，关注技术如何服务于直觉与诗意表达。",
    dateAdded: "2026-10-27",
    tags: ["生成式艺术", "跨界共创", "线下聚会"],
    accent: "green",
    href: "https://luma.com/v2biborh",
    sourceName: "Luma",
  },
  {
    id: "c4",
    issueNo: "CURATION · 04",
    category: "website",
    categoryLabel: "灵感网站 · 动态视觉系统",
    title: "Lando Norris 个人数字展馆",
    creatorOrHost: "OFF+BRAND · Awwwards 月度最佳网站",
    summary:
      "采用极具冲击力的荧光黄（#D2FF00）与深邃碳黑（#111112）高对比色系，结合高速流体转场诠释赛道速度美学。",
    curatorNote: "字体排印的张力与帧率级滚动动画配合得天衣无缝，堪称人物数字档案的标杆。",
    dateAdded: "2026-10-27",
    tags: ["动态排印", "人物志", "Awwwards"],
    accent: "yellow",
    href: "https://www.awwwards.com/sites/lando-norris",
    sourceName: "Awwwards",
  },
  {
    id: "c5",
    issueNo: "CURATION · 05",
    category: "product",
    categoryLabel: "有趣产品 · 对话式视觉生成",
    title: "Kodo — 对话即画布的可编辑视觉设计工坊",
    creatorOrHost: "Product Hunt · 新锐创意工具",
    summary:
      "无需繁琐图层操作，通过自然语言对话直接生成图层结构清晰、完全可二次编辑的平面与品牌视觉设计。",
    curatorNote: "保留了设计师对字距、留白与版式的最终控制权，而非只输出不可拆解的静态位图。",
    dateAdded: "2026-10-27",
    tags: ["对话式设计", "平面视觉", "AI 协作"],
    accent: "accent",
    href: "https://www.producthunt.com/products/kodo-3",
    sourceName: "Product Hunt",
  },
  {
    id: "c6",
    issueNo: "CURATION · 06",
    category: "event",
    categoryLabel: "创意赛事 · 全球创客挑战",
    title: "ETHGlobal Lisbon 2026 × The Graph 数据与 AI Agent 挑战赛",
    creatorOrHost: "ETHGlobal · 里斯本",
    summary:
      "围绕实时链上数据图谱、跨协议可视化仪表盘与 AI Agent 自主推理展开的开源工具与交互构建大赛。",
    curatorNote: "适合数据可视化设计师与全栈开发者组队，探索复杂金融与协议数据的优雅表达。",
    dateAdded: "2026-10-27",
    tags: ["数据可视化", "AI Agent", "ETHGlobal"],
    accent: "purple",
    href: "https://ethglobal.com/events/lisbon2026/prizes/the-graph",
    sourceName: "ETHGlobal",
  },
  {
    id: "c7",
    issueNo: "CURATION · 07",
    category: "website",
    categoryLabel: "深度好文与工具志 · 创作者宣言",
    title: "Colortreat 协作创作者社区白皮书（V.01）",
    creatorOrHost: "Colortreat Collective",
    summary:
      "一份关于“多人共创（Multiplayer Creation）”的独立宣言，探讨自由设计师、开发者如何共享灵感图谱与数字产品所有权。",
    curatorNote: "不仅是一份社区宣言，其文档本身的章节编排与集体创作理念也极具启发性。",
    dateAdded: "2026-10-27",
    tags: ["设计哲学", "多人共创", "独立宣言"],
    accent: "green",
    href: "https://static.colortreat.de/cc-whitepaper.pdf",
    sourceName: "Colortreat",
  },
  {
    id: "c8",
    issueNo: "CURATION · 08",
    category: "website",
    categoryLabel: "灵感网站 · 视觉工具策展",
    title: "Cosmos 视觉工具箱（@hellopixely 策展）",
    creatorOrHost: "Cosmos · 灵感策展社区",
    summary:
      "汇集 Typescale 排版比例生成器、Coolors 极速配色方案与 Microcopy 界面微文案库等独立创作者案头利器。",
    curatorNote: "像逛独立艺术书店的工具架一样，随手拾取能提升作品细节质感的轻量小工具。",
    dateAdded: "2026-10-27",
    tags: ["字体排印", "色彩灵感", "案头工具"],
    accent: "yellow",
    href: "https://www.cosmos.so/hellopixely/online-tools",
    sourceName: "Cosmos",
  },
];

export const hackathonCards: HackathonCard[] = [
  {
    id: "h1",
    catalogNo: "HACK · 01",
    title: "Web3 去中心化社交平台",
    team: "Team ChainSync · ETHGlobal 2024",
    summary: "以去中心化身份图谱为核心的创作者订阅与链上策展空间",
    image: gradients[6],
    badge: "一等奖",
    badgeColor: "purple",
    href: "https://ethglobal.com/events/lisbon2026/prizes/the-graph",
    curatorNote: "利用去中心化图谱重构粉丝与创作者关系，交互直观且链上确认动效丝滑。",
    tags: ["Web3", "社交图谱", "ETHGlobal"],
  },
  {
    id: "h2",
    catalogNo: "HACK · 02",
    title: "AI 驱动智能农业监测",
    team: "Team AgriMind · HackUST 2024",
    summary: "结合多光谱遥感与边缘端视觉识别的农田生态数字孪生系统",
    image: gradients[7],
    badge: "二等奖",
    badgeColor: "yellow",
    href: "https://luma-hackathon-500.devpost.com/",
    curatorNote: "将低空无人机数据与农业病虫害模型结合，实时生成直观的农田健康指数热力图。",
    tags: ["数字孪生", "遥感", "边缘计算"],
  },
  {
    id: "h3",
    catalogNo: "HACK · 03",
    title: "城市交通碳排放可视化",
    team: "Team GreenPath · TreeHacks 2024",
    summary: "实时演进的城市脉搏与三维等高线碳足迹流体地图",
    image: gradients[8],
    badge: "三等奖",
    badgeColor: "green",
    href: "https://luma.com/o2sau79c",
    curatorNote: "用粒子流速和流体扩散象征碳排放浓度，将冰冷的环境指标转化为令人屏息的宏大视觉图谱。",
    tags: ["三维地图", "数据可视化", "可持续性"],
  },
  {
    id: "h4",
    catalogNo: "HACK · 04",
    title: "AR 室内导航无障碍助手",
    team: "Team NavAR · HackMIT 2024",
    summary: "面向视障与听障人群的空间声学引导与高对比度 AR 视觉辅助",
    image: gradients[9],
    badge: "最佳创意",
    badgeColor: "accent",
    href: "https://luma.com/v2biborh",
    curatorNote: "充满人道主义关怀的极客造物，巧妙利用空间声场定位解决地下交通枢纽盲行痛点。",
    tags: ["无障碍设计", "AR空间", "声学定位"],
  },
  {
    id: "h5",
    catalogNo: "HACK · 05",
    title: "Cook Some Hooks — Uniswap v4 挂钩生成器",
    team: "Team Uniswap Crafters · ETHGlobal Brussels 冠军",
    summary: "生成式 AI 驱动的去中心化交易所自定义流动性池挂钩即时仿真与部署套件",
    image: gradients[12],
    badge: "总冠军",
    badgeColor: "purple",
    href: "https://ethglobal.com/",
    curatorNote: "将复杂的 Solidity 与微积分流动性曲线解构为拖拽与对话推演界面，极具工程创造力。",
    tags: ["DeFi", "Uniswap", "AI代码", "ETHGlobal"],
  },
  {
    id: "h6",
    catalogNo: "HACK · 06",
    title: "cellfi — 无网 SMS 极简链上结算助手",
    team: "Team Cellfi · ETHGlobal Taipei 2025 Top 8",
    summary: "无需智能手机或蜂窝网络，通过纯短信交互完成全球去中心化稳定币转账与身份确认",
    image: gradients[10],
    badge: "顶尖佳作",
    badgeColor: "yellow",
    href: "https://ethglobal.com/",
    curatorNote: "极致克制的无界面（Zero UI）交互典范，打破网络鸿沟让数字货币服务于更广泛的发展中人群。",
    tags: ["Zero UI", "SMS", "普惠金融", "ETHGlobal"],
  },
];

export const aiContestCards: AIContestCard[] = [
  {
    id: "a1",
    catalogNo: "AI ART · 01",
    title: "Midjourney 建筑概念设计",
    meta: "Midjourney Architecture Award 金奖",
    curatorNote: "将粗野主义混凝土与自然洞穴光影交织的未来美术馆构想",
    image: gradients[10],
    badge: "AI 生成",
    badgeColor: "green",
    href: "https://www.cosmos.so/",
    tags: ["概念建筑", "Midjourney", "光影艺术"],
  },
  {
    id: "a2",
    catalogNo: "AI ART · 02",
    title: "GPT-4o 多模态交互设计",
    meta: "OpenAI DevDay Hackathon 最佳",
    curatorNote: "实时语音情绪感知与动态排版共鸣的沉浸式桌面伴侣",
    image: gradients[11],
    badge: "最佳应用",
    badgeColor: "accent",
    href: "https://www.producthunt.com/categories/ai-designer",
    tags: ["多模态", "动态排版", "语音交互"],
  },
  {
    id: "a3",
    catalogNo: "AI ART · 03",
    title: "Stable Diffusion 品牌视觉",
    meta: "Stability AI Creative Awards 银奖",
    curatorNote: "可控网格约束下的高定香水品牌动态植物学纹样系统",
    image: gradients[12],
    badge: "创新应用",
    badgeColor: "purple",
    href: "https://www.producthunt.com/topics/graphic-design",
    tags: ["品牌视觉", "扩散模型", "图案生成"],
  },
  {
    id: "a4",
    catalogNo: "AI ART · 04",
    title: "DALL-E 3 电商商品图生成",
    meta: "AI E-commerce Hackathon Top 3",
    curatorNote: "超现实主义静物布光与几何雕塑底座的商品摄影实验",
    image: gradients[13],
    badge: "开源项目",
    badgeColor: "yellow",
    href: "https://www.producthunt.com/products/kodo-3",
    tags: ["电商设计", "静物摄影", "DALL-E"],
  },
  {
    id: "a5",
    catalogNo: "AI ART · 05",
    title: "Flux.1 概念美学实验工作台",
    meta: "Black Forest Labs 社区年度先锋精选",
    curatorNote: "次时代开源生成模型在多主体复杂透视与排印字体上的绝妙突破",
    image: gradients[15],
    badge: "社区先锋",
    badgeColor: "purple",
    href: "https://blackforestlabs.ai/",
    tags: ["Flux", "开源AI", "高精细节"],
  },
  {
    id: "a6",
    catalogNo: "AI ART · 06",
    title: "Magnific AI 8K 空间重构与幻觉绘图",
    meta: "AI Creative Award 年度金奖",
    curatorNote: "将低清晰度草图通过微观幻觉渲染提升至电影级 8K 材质纹理，开拓了数字美术新边疆",
    image: gradients[14],
    badge: "年度金奖",
    badgeColor: "accent",
    href: "https://magnific.ai/",
    tags: ["8K超分", "材质渲染", "创意重构"],
  },
];

export const footerLinks = {
  browse: [
    { label: "精选作品", href: "#featured" },
    { label: "每日策展", href: "#daily-curations" },
    { label: "分类浏览", href: "#categories" },
    { label: "信源图谱", href: "#sources" },
    { label: "设计工程", href: "https://21st.dev/" },
  ],
  contest: [
    { label: "黑客松作品", href: "#hackathons" },
    { label: "AI 大赛佳作", href: "#ai-contests" },
    { label: "ETHGlobal 竞赛", href: "https://ethglobal.com/" },
    { label: "TAG AI 黑客松", href: "https://luma.com/v2biborh" },
  ],
  about: [
    { label: "Awwwards 灵感", href: "https://www.awwwards.com/" },
    { label: "Product Hunt AI", href: "https://www.producthunt.com/categories/ai-designer" },
    { label: "Cosmos 视觉库", href: "https://www.cosmos.so/" },
    { label: "Aceternity UI", href: "https://ui.aceternity.com/" },
  ],
};
