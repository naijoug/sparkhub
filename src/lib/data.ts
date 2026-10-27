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
  artMotif: "bauhaus" | "kinetic" | "topography" | "prism" | "orbital" | "editorial";
  tags: { label: string; color: AccentTone }[];
  likes: string;
  views: string;
  featuredSpan?: "wide" | "normal";
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
  { id: "all", label: "全部展品", enLabel: "ALL WORKS", count: 8, active: true },
  { id: "mobile", label: "移动应用", enLabel: "MOBILE", count: 1 },
  { id: "web", label: "网页设计", enLabel: "WEB & EDITORIAL", count: 1 },
  { id: "brand", label: "品牌设计", enLabel: "IDENTITY", count: 1 },
  { id: "illustration", label: "插画设计", enLabel: "ILLUSTRATION", count: 1 },
  { id: "3d", label: "3D 设计", enLabel: "SPATIAL 3D", count: 1 },
  { id: "interaction", label: "交互设计", enLabel: "INTERACTIVE", count: 2 },
  { id: "motion", label: "动效设计", enLabel: "KINETIC", count: 1 },
];

export const hotTags = [
  { label: "仪表盘", color: "accent" as const },
  { label: "AI 应用", color: "green" as const },
  { label: "移动端", color: "yellow" as const },
  { label: "B端后台", color: "purple" as const },
  { label: "数据可视化", color: "accent" as const },
  { label: "WebGL", color: "purple" as const },
];

const gradients = [
  "from-[#C8432B] via-[#9E2E1D] to-[#1D1210]",
  "from-[#332B66] via-[#4A3BC2] to-[#141222]",
  "from-[#194434] via-[#245E47] to-[#0D1E17]",
  "from-[#5E2E50] via-[#8F3D64] to-[#1E111B]",
  "from-[#A66C14] via-[#C8432B] to-[#21170F]",
  "from-[#1B455C] via-[#2A6888] to-[#0E1E28]",
  "from-[#7D2630] via-[#B5402A] to-[#1A1012]",
  "from-[#3D2E6B] via-[#604A9E] to-[#161222]",
  "from-[#1E4C3B] via-[#32755B] to-[#0E1F19]",
  "from-[#8A4E16] via-[#BA6B22] to-[#1F150C]",
  "from-[#1E365E] via-[#35578F] to-[#101828]",
  "from-[#662B50] via-[#944073] to-[#1F101A]",
  "from-[#2F522F] via-[#497A49] to-[#111D11]",
  "from-[#1B4A52] via-[#2A727D] to-[#0E1F23]",
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
  },
];

export const dailyCurations: DailyCurationItem[] = [
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
  },
];

export const footerLinks = {
  browse: [
    { label: "精选作品", href: "#featured" },
    { label: "每日策展", href: "#daily-curations" },
    { label: "分类浏览", href: "#categories" },
  ],
  contest: [
    { label: "黑客松作品", href: "#hackathons" },
    { label: "AI 大赛佳作", href: "#ai-contests" },
    { label: "TAG AI 黑客松", href: "https://luma.com/v2biborh" },
  ],
  about: [
    { label: "Awwwards 灵感", href: "https://www.awwwards.com/" },
    { label: "Product Hunt AI", href: "https://www.producthunt.com/categories/ai-designer" },
    { label: "Cosmos 视觉库", href: "https://www.cosmos.so/" },
  ],
};
