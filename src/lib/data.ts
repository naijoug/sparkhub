export interface DesignCard {
  id: string;
  title: string;
  author: string;
  image: string;
  tags: { label: string; color: "accent" | "purple" | "green" | "yellow" }[];
  likes: string;
  views: string;
}

export interface HackathonCard {
  id: string;
  title: string;
  team: string;
  image: string;
  badge: string;
  badgeColor: "purple" | "yellow" | "green" | "accent";
}

export interface AIContestCard {
  id: string;
  title: string;
  meta: string;
  image: string;
  badge: string;
  badgeColor: "purple" | "yellow" | "green" | "accent";
}

export interface Category {
  id: string;
  label: string;
  active?: boolean;
}

export const categories: Category[] = [
  { id: "all", label: "全部", active: true },
  { id: "mobile", label: "移动应用" },
  { id: "web", label: "网页设计" },
  { id: "brand", label: "品牌设计" },
  { id: "illustration", label: "插画设计" },
  { id: "3d", label: "3D 设计" },
  { id: "interaction", label: "交互设计" },
  { id: "motion", label: "动效设计" },
];

export const hotTags = [
  { label: "移动端 UI", color: "accent" as const },
  { label: "仪表盘设计", color: "purple" as const },
  { label: "AI 应用", color: "green" as const },
  { label: "登录注册", color: "yellow" as const },
  { label: "B 端后台", color: "purple" as const },
];

const gradients = [
  "from-orange-400 to-red-500",
  "from-blue-400 to-indigo-500",
  "from-green-400 to-teal-500",
  "from-purple-400 to-pink-500",
  "from-yellow-400 to-orange-500",
  "from-cyan-400 to-blue-500",
  "from-rose-400 to-red-500",
  "from-violet-400 to-purple-600",
  "from-emerald-400 to-green-600",
  "from-amber-400 to-orange-600",
  "from-sky-400 to-indigo-600",
  "from-fuchsia-400 to-pink-600",
  "from-lime-400 to-emerald-500",
  "from-teal-400 to-cyan-600",
];

export const featuredCards: DesignCard[] = [
  {
    id: "1",
    title: "FinTech 金融仪表盘设计",
    author: "by DesignStudio",
    image: gradients[0],
    tags: [
      { label: "仪表盘", color: "accent" },
      { label: "金融科技", color: "purple" },
    ],
    likes: "2.4k",
    views: "12.8k",
  },
  {
    id: "2",
    title: "AI 智能助手聊天界面",
    author: "by AILab Creative",
    image: gradients[1],
    tags: [
      { label: "AI 应用", color: "green" },
      { label: "聊天", color: "yellow" },
    ],
    likes: "3.1k",
    views: "18.5k",
  },
  {
    id: "3",
    title: "电商 App 首页 redesign",
    author: "by PixelCraft",
    image: gradients[2],
    tags: [
      { label: "电商", color: "yellow" },
      { label: "移动端", color: "accent" },
    ],
    likes: "1.8k",
    views: "9.2k",
  },
  {
    id: "4",
    title: "SaaS 多租户管理后台",
    author: "by TechUI Lab",
    image: gradients[3],
    tags: [{ label: "B端后台", color: "purple" }],
    likes: "1.6k",
    views: "7.3k",
  },
  {
    id: "5",
    title: "运动健康 App 数据可视化",
    author: "by FitDesign Co.",
    image: gradients[4],
    tags: [
      { label: "健康", color: "green" },
      { label: "数据可视化", color: "accent" },
    ],
    likes: "2.9k",
    views: "15.1k",
  },
  {
    id: "6",
    title: "在线教育平台课程页面",
    author: "by EduUX Studio",
    image: gradients[5],
    tags: [
      { label: "教育", color: "purple" },
      { label: "网页", color: "yellow" },
    ],
    likes: "1.2k",
    views: "5.6k",
  },
];

export const hackathonCards: HackathonCard[] = [
  {
    id: "h1",
    title: "Web3 去中心化社交平台",
    team: "Team ChainSync · ETHGlobal 2024",
    image: gradients[6],
    badge: "一等奖",
    badgeColor: "purple",
  },
  {
    id: "h2",
    title: "AI 驱动智能农业监测",
    team: "Team AgriMind · HackUST 2024",
    image: gradients[7],
    badge: "二等奖",
    badgeColor: "yellow",
  },
  {
    id: "h3",
    title: "城市交通碳排放可视化",
    team: "Team GreenPath · TreeHacks 2024",
    image: gradients[8],
    badge: "三等奖",
    badgeColor: "green",
  },
  {
    id: "h4",
    title: "AR 室内导航无障碍助手",
    team: "Team NavAR · HackMIT 2024",
    image: gradients[9],
    badge: "最佳创意",
    badgeColor: "accent",
  },
];

export const aiContestCards: AIContestCard[] = [
  {
    id: "a1",
    title: "Midjourney 建筑概念设计",
    meta: "Midjourney Architecture Award 金奖",
    image: gradients[10],
    badge: "AI 生成",
    badgeColor: "green",
  },
  {
    id: "a2",
    title: "GPT-4o 多模态交互设计",
    meta: "OpenAI DevDay Hackathon 最佳",
    image: gradients[11],
    badge: "最佳应用",
    badgeColor: "accent",
  },
  {
    id: "a3",
    title: "Stable Diffusion 品牌视觉",
    meta: "Stability AI Creative Awards 银奖",
    image: gradients[12],
    badge: "创新应用",
    badgeColor: "purple",
  },
  {
    id: "a4",
    title: "DALL-E 3 电商商品图生成",
    meta: "AI E-commerce Hackathon Top 3",
    image: gradients[13],
    badge: "开源项目",
    badgeColor: "yellow",
  },
];

export const footerLinks = {
  browse: [
    { label: "精选作品", href: "#" },
    { label: "分类浏览", href: "#" },
    { label: "热门标签", href: "#" },
  ],
  contest: [
    { label: "黑客松作品", href: "#" },
    { label: "AI 大赛佳作", href: "#" },
    { label: "参赛指南", href: "#" },
  ],
  about: [
    { label: "关于我们", href: "#" },
    { label: "上传作品", href: "#" },
    { label: "联系我们", href: "#" },
  ],
};
