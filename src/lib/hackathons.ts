/**
 * Global Hackathon & Winning Products Registry
 * 全球黑客松赛事与高票/获奖造物数据中心
 *
 * 覆盖平台分类：
 * - app: 移动端 App (iOS / Android / 原生移动客户端)
 * - web: Web 网站与应用 (Web App / Chrome 扩展 / SaaS 平台)
 * - ai: AI Agent 与智能体 (自主代理 / 多模态系统 / 开发者工具)
 * - cross: 跨端硬件与空间计算 (visionOS / 桌面端 / 物联网与机器人)
 */

export type PlatformCategory = "all" | "app" | "web" | "ai" | "cross";

export interface PlatformFilterItem {
  id: PlatformCategory;
  label: string;
  en: string;
  count: number;
}

export interface HackathonProduct {
  id: string;
  catalogNo: string;
  title: string;
  tagline: string;
  hackathonId: string;
  hackathonName: string;
  hackathonDates: string;
  organizer: string;
  platformCategory: Exclude<PlatformCategory, "all">;
  targetPlatform: string;
  award: string;
  votes: number;
  voteRank: number;
  team: {
    name: string;
    members?: string[];
  };
  summary: string;
  techStack: string[];
  officialUrl: string;
  githubUrl?: string;
  curatorCritique: string;
  coverGradient: string;
}

export interface HackathonEdition {
  id: string;
  catalogNo: string;
  name: string;
  englishName: string;
  organizer: string;
  organizerLogoText: string;
  edition: string;
  startDate: string;
  endDate: string;
  dateDisplay: string;
  location: string;
  prizePool: string;
  status: "completed" | "ongoing" | "upcoming";
  platformCategories: Exclude<PlatformCategory, "all">[];
  tagline: string;
  description: string;
  officialUrl: string;
  totalSubmissions?: number;
  products: HackathonProduct[];
}

export const hackathonEditions: HackathonEdition[] = [
  // ── 01 · Gemini API Developer Competition ─────────────────────────────
  {
    id: "gemini-api-dev-competition-2024",
    catalogNo: "HACK · VOL.01",
    name: "Gemini API 全球开发者大赛",
    englishName: "Gemini API Developer Competition 2024",
    organizer: "Google DeepMind × Devpost",
    organizerLogoText: "G",
    edition: "2024 全球旗舰季",
    startDate: "2024-06-27",
    endDate: "2024-11-21",
    dateDisplay: "2024.06.27 – 2024.11.21",
    location: "全球线上 (Online)",
    prizePool: "$1,000,000 + 定制 1981 DeLorean EV",
    status: "completed",
    totalSubmissions: 4200,
    platformCategories: ["app", "web", "ai"],
    tagline: "释放 Gemini 1.5 Pro / Flash 超长上下文与多模态原生推理潜能",
    description:
      "Google 官方面向全球数万名开发者发起的年度最高规格 AI 创造力竞赛。重点考察多模态输入（音视频、图文、代码）、百万级 Token 超长上下文理解以及自主 Agent 真实可落地的生产力创新。",
    officialUrl: "https://ai.google.dev/competition",
    products: [
      {
        id: "jayu-ai-assistant",
        catalogNo: "HACK-PRD · 01",
        title: "Jayu (自由)",
        tagline: "首个真正能像人类一样坐在电脑前自主操控屏幕与全生态软件的 AI Agent",
        hackathonId: "gemini-api-dev-competition-2024",
        hackathonName: "Gemini API 全球开发者大赛",
        hackathonDates: "2024.06.27 – 2024.11.21",
        organizer: "Google DeepMind × Devpost",
        platformCategory: "ai",
        targetPlatform: "macOS / Windows 桌面端智能体",
        award: "🏆 全球特等奖 (Grand Prize Winner · 赢得 DeLorean 跑车)",
        votes: 4280,
        voteRank: 1,
        team: {
          name: "Jonathan Ouyang",
          members: ["Jonathan Ouyang"],
        },
        summary:
          "Jayu 彻底打破了传统 AI 仅能输出文本的死局。它通过 Gemini 1.5 的多模态屏幕感知能力，实时理解显示器上的像素、按钮与界面层级，自主通过键鼠模拟操控浏览器、终端、VS Code 与复杂桌面应用，完成跨软件的端到端自动化作业。",
        techStack: [
          "Gemini 1.5 Pro",
          "Python",
          "PyAutoGUI",
          "OpenCV",
          "Electron",
          "Accessibility API",
        ],
        officialUrl: "https://jonathanouyang.com/jayu",
        githubUrl: "https://github.com/jonathanouyang/jayu",
        curatorCritique:
          "评审团评价其为‘计算机操控领域的惊鸿一瞥’。它不仅展示了 Gemini 1.5 极高精度的视觉空间推理，更为通用人工智能（AGI）在桌面操作系统上的落地树立了黄金标杆。",
        coverGradient: "from-[#C8432B] via-[#9E2E1D] to-[#1D1210]",
      },
      {
        id: "gaze-link-als",
        catalogNo: "HACK-PRD · 02",
        title: "Gaze Link",
        tagline: "无需昂贵外设，普通手机前置镜头即可让渐冻症患者用眼神流畅对话",
        hackathonId: "gemini-api-dev-competition-2024",
        hackathonName: "Gemini API 全球开发者大赛",
        hackathonDates: "2024.06.27 – 2024.11.21",
        organizer: "Google DeepMind × Devpost",
        platformCategory: "app",
        targetPlatform: "Android 原生 App",
        award: "🥇 最佳 Android 移动应用 (Best Android App)",
        votes: 3190,
        voteRank: 2,
        team: {
          name: "Team NeuroVision",
          members: ["Liam Chen", "Sarah Jenkins"],
        },
        summary:
          "为 ALS（肌萎缩侧索硬化症）与运动神经功能丧失患者打造的原生移动端沟通工具。仅利用普通千元智能手机的前置摄像头进行毫米级眼动追踪，配合 Gemini 的上下文语言预判能力，使患者打字交流速度提升 5 倍以上。",
        techStack: [
          "Android NDK",
          "Kotlin",
          "Gemini 1.5 Flash",
          "MediaPipe Face Mesh",
          "TensorFlow Lite",
        ],
        officialUrl: "https://gazelink.app/",
        githubUrl: "https://github.com/gazelink/gaze-link-android",
        curatorCritique:
          "科技向善的极致典范。它证明了将轻量级端侧视觉检测与云端超强大脑模型结合，能够产生多么震撼人心的社会价值。",
        coverGradient: "from-[#194434] via-[#245E47] to-[#0D1E17]",
      },
      {
        id: "viddyscribe-web",
        catalogNo: "HACK-PRD · 03",
        title: "ViddyScribe",
        tagline: "实时为全网任意无字幕/画面视频生成富有电影感的多语言解说旁白",
        hackathonId: "gemini-api-dev-competition-2024",
        hackathonName: "Gemini API 全球开发者大赛",
        hackathonDates: "2024.06.27 – 2024.11.21",
        organizer: "Google DeepMind × Devpost",
        platformCategory: "web",
        targetPlatform: "Web 平台 / Chrome 扩展",
        award: "🥇 最佳 Web 应用奖 (Best Web App)",
        votes: 2450,
        voteRank: 3,
        team: {
          name: "Adaptive Media Labs",
          members: ["Marcus Vance", "Elena Rostova"],
        },
        summary:
          "为全网视障群体与数字无障碍而生的 Web 神器。安装插件后在 YouTube、Bilibili 或 Coursera 观看任意视频，ViddyScribe 会在角色对白停顿的静默空隙，自动插入生动描绘画面转场、角色微表情与场景道具的音频解说。",
        techStack: [
          "TypeScript",
          "Web Audio API",
          "Chrome Extension Manifest V3",
          "Gemini 1.5 Flash",
          "Next.js",
        ],
        officialUrl: "https://viddyscribe.com/",
        githubUrl: "https://github.com/viddyscribe/extension",
        curatorCritique:
          "巧妙运用了视音频时间轴上的空隙插值哲学，把原本冷冰冰的无障碍改造变成了如同时光流转般丝滑的视听享受。",
        coverGradient: "from-[#332B66] via-[#4A3BC2] to-[#141222]",
      },
    ],
  },

  // ── 02 · ETHGlobal Bangkok 2024 ──────────────────────────────────────
  {
    id: "ethglobal-bangkok-2024",
    catalogNo: "HACK · VOL.02",
    name: "ETHGlobal 曼谷站",
    englishName: "ETHGlobal Bangkok 2024",
    organizer: "ETHGlobal",
    organizerLogoText: "E",
    edition: "2024 东南亚旗舰站 (Devcon 7)",
    startDate: "2024-11-15",
    endDate: "2024-11-17",
    dateDisplay: "2024.11.15 – 2024.11.17",
    location: "泰国曼谷 · QSNCC 国家会议中心",
    prizePool: "$750,000+",
    status: "completed",
    totalSubmissions: 713,
    platformCategories: ["app", "ai"],
    tagline: "713 个先锋团队角逐：AI 代理经济、移动原生体验与 ZK 基础设施爆发",
    description:
      "伴随以太坊 Devcon 7 在曼谷召开的全球顶级黑客松，吸引来自 80 多个国家的 2,500+ 名创客。本届赛事最大特色是 AI Agent 深入自治经济体，以及 Telegram 与手机端扫码支付等极具现实落地价值的应用。",
    officialUrl: "https://ethglobal.com/events/bangkok2024",
    products: [
      {
        id: "daogenie-governance",
        catalogNo: "HACK-PRD · 04",
        title: "DAOGenie",
        tagline: "将冗长复杂的治理提案转化为自动化推演、模拟与执行的自治 AI 智囊团",
        hackathonId: "ethglobal-bangkok-2024",
        hackathonName: "ETHGlobal 曼谷站",
        hackathonDates: "2024.11.15 – 2024.11.17",
        organizer: "ETHGlobal",
        platformCategory: "ai",
        targetPlatform: "Web App & 治理协议",
        award: "🏆 全球十佳总决赛优胜奖 (Finalist & Winner)",
        votes: 3820,
        voteRank: 1,
        team: {
          name: "Autonomous Agora",
          members: ["Pavel K.", "Kenji Sato", "Maya Lin"],
        },
        summary:
          "改变传统 DAO 社区成员懒得看数十页白皮书、投票率持续低迷的窘境。DAOGenie 会自动爬取链上提案并进行代币经济学沙盒压力测试，生成正反方辩护论点；投票通过后自动合成安全审计交易并在指定区块执行。",
        techStack: [
          "Solidity",
          "LangGraph",
          "Foundry",
          "Next.js",
          "Viem",
          "The Graph",
        ],
        officialUrl: "https://ethglobal.com/showcase/daogenie-w4392",
        githubUrl: "https://github.com/daogenie/daogenie-agent",
        curatorCritique:
          "将政治学协商机制与加密经济原语完美交织，展现了 AI Agent 如何从单纯聊天机器人演进为掌管千万美元金库的数字理性法官。",
        coverGradient: "from-[#5E2E50] via-[#8F3D64] to-[#1E111B]",
      },
      {
        id: "ethpark-qr-mobile",
        catalogNo: "HACK-PRD · 05",
        title: "ETHPark-QR",
        tagline: "无需本地银行卡，国际游客直接用链上代币扫码支付泰国市政停车与商户",
        hackathonId: "ethglobal-bangkok-2024",
        hackathonName: "ETHGlobal 曼谷站",
        hackathonDates: "2024.11.15 – 2024.11.17",
        organizer: "ETHGlobal",
        platformCategory: "app",
        targetPlatform: "移动端 Web / PWA App",
        award: "🏆 全球十佳总决赛优胜奖 (Finalist & Winner)",
        votes: 3410,
        voteRank: 2,
        team: {
          name: "Siam Web3 Mobility",
          members: ["Somchai P.", "Alex Turner"],
        },
        summary:
          "解决外国游客和数字游民在曼谷无法开立本地银行账户从而无法使用泰国主流国家二维码（PromptPay）扫码缴停车费与小商贩的痛点。用户只需手机打开网站，扫描任意 PromptPay 二维码，直接从链上钱包扣除 USDC 并在 1 秒内完成法币清算。",
        techStack: [
          "React Native / PWA",
          "Biconomy",
          "EIP-3074",
          "Node.js",
          "Tailwind CSS",
        ],
        officialUrl: "https://ethglobal.com/showcase/ethpark-qr-9y76k",
        githubUrl: "https://github.com/ethpark-qr/mobile-app",
        curatorCritique:
          "真正解决真实世界物理痛点的教科书级产品。没有虚浮的概念炒作，只有在曼谷街头实测一枪过验的落地快感。",
        coverGradient: "from-[#A66C14] via-[#C8432B] to-[#21170F]",
      },
      {
        id: "minidao-telegram",
        catalogNo: "HACK-PRD · 06",
        title: "MiniDAO",
        tagline: "在 Telegram 群组内一秒启动多签金库，像发表情包一样发起聚会众筹",
        hackathonId: "ethglobal-bangkok-2024",
        hackathonName: "ETHGlobal 曼谷站",
        hackathonDates: "2024.11.15 – 2024.11.17",
        organizer: "ETHGlobal",
        platformCategory: "app",
        targetPlatform: "Telegram Mini App",
        award: "🏆 全球十佳总决赛优胜奖 (Finalist & Winner)",
        votes: 2950,
        voteRank: 3,
        team: {
          name: "TeleSquad",
          members: ["Viktor B.", "Clara Moreau"],
        },
        summary:
          "基于 Telegram Mini App 打造的轻量级好友金库。群友聊天时无需跳转任何外部网页，直接在聊天窗口拉起嵌入式界面，所有人均可按预设规则共同向金库充值、发起团建聚餐报销并集体点击指纹签名确认付款。",
        techStack: [
          "Telegram Bot API",
          "TON / EVM Dual-chain",
          "Safe Core SDK",
          "TypeScript",
        ],
        officialUrl: "https://ethglobal.com/showcase/minidao-tg-821aa",
        githubUrl: "https://github.com/minidao-tg/telegram-bot",
        curatorCritique:
          "把区块链技术隐藏在几十亿人最习惯的即时通讯窗口背后，是 Web3 走向十亿大众的最佳 UI 范式。",
        coverGradient: "from-[#1B455C] via-[#2A6888] to-[#0E1E28]",
      },
    ],
  },

  // ── 03 · Solana Renaissance Hackathon ────────────────────────────────
  {
    id: "solana-renaissance-2024",
    catalogNo: "HACK · VOL.03",
    name: "Solana 文艺复兴全球黑客松",
    englishName: "Solana Renaissance Hackathon 2024",
    organizer: "Colosseum & Solana Foundation",
    organizerLogoText: "S",
    edition: "Season 1 全球赛季",
    startDate: "2024-03-04",
    endDate: "2024-04-08",
    dateDisplay: "2024.03.04 – 2024.04.08",
    location: "Colosseum 全球创投竞技场 (Online)",
    prizePool: "$1,050,000 + 种子轮加速直通车",
    status: "completed",
    totalSubmissions: 1071,
    platformCategories: ["app", "web"],
    tagline: "8,300+ 名全球顶级极客角逐：探索高吞吐、DePIN 物理世界与移动消费级新大陆",
    description:
      "由前 Solana 基金会高管创办的 Colosseum 平台主办的第九届官方旗舰黑客松。本届赛事诞生了轰动整个科技圈的数字原生挖矿协议 Ore，以及大量将移动设备与现实街景绑定的 DePIN 现象级项目。",
    officialUrl: "https://www.colosseum.org/renaissance",
    products: [
      {
        id: "ore-fair-mining",
        catalogNo: "HACK-PRD · 07",
        title: "Ore (矿石协议)",
        tagline: "彻底颠覆矿机垄断：任何人在网页浏览器和手机上都能参与的非排他公平 PoW",
        hackathonId: "solana-renaissance-2024",
        hackathonName: "Solana 文艺复兴全球黑客松",
        hackathonDates: "2024.03.04 – 2024.04.08",
        organizer: "Colosseum & Solana Foundation",
        platformCategory: "web",
        targetPlatform: "Web 浏览器端 & CLI",
        award: "🏆 全球总冠军 (Grand Champion · 获 $50,000 USDC + 顶投直投)",
        votes: 5120,
        voteRank: 1,
        team: {
          name: "Hardhat Chad & Core Contribs",
          members: ["Hardhat Chad"],
        },
        summary:
          "黑客松上线第一周即导致全网交易量暴增的现象级产品。Ore 创造了一种全新的非排他性工作量证明（PoW）算法。与传统比特币‘算力最高者通吃所有奖励’不同，Ore 让每个参与者的每一点算力都能线性换取对应的代币产出，彻底杜绝了 ASIC 巨头垄断。",
        techStack: ["Rust", "Solana Anchor", "Wasm", "TypeScript", "Next.js"],
        officialUrl: "https://ore.supply/",
        githubUrl: "https://github.com/harding/ore",
        curatorCritique:
          "它不仅是一段精巧的高性能智能合约代码，更是向数字货币最初愿景发起的一记浪漫诗篇。在浏览器点开它的一瞬间，极客时代的自由脉搏再次跳动。",
        coverGradient: "from-[#8A4E16] via-[#BA6B22] to-[#1F150C]",
      },
      {
        id: "banger-lol-creator",
        catalogNo: "HACK-PRD · 08",
        title: "Banger.lol",
        tagline: "把高赞推文变成可交易的数字资产，把社交注意力转化为创作者的长尾版税",
        hackathonId: "solana-renaissance-2024",
        hackathonName: "Solana 文艺复兴全球黑客松",
        hackathonDates: "2024.03.04 – 2024.04.08",
        organizer: "Colosseum & Solana Foundation",
        platformCategory: "web",
        targetPlatform: "社交 Web App / 移动网页",
        award: "🥇 消费级应用赛道第 1 名 (1st Place Consumer Apps)",
        votes: 3670,
        voteRank: 2,
        team: {
          name: "Banger Labs",
          members: ["Nate Finch", "Kenji M."],
        },
        summary:
          "专为社交媒体创作者打造的注意力清算市场。创作者可以将自己最精彩的一条推文一键铸造为流动性份额。粉丝可以在联合曲线上买卖该推文的份额，推文传播越广、赞赏越多，早期持有者与作者均可分润。",
        techStack: ["React", "Tailwind CSS", "Solana Web3.js", "Redis"],
        officialUrl: "https://banger.lol/",
        githubUrl: "https://github.com/banger-lol/core",
        curatorCritique:
          "将 meme 文化、社群认同与金融工程巧妙融合的消费级交互典范，界面排版张力十足，动效极为流畅。",
        coverGradient: "from-[#7D2630] via-[#B5402A] to-[#1A1012]",
      },
      {
        id: "meshmap-city-champ",
        catalogNo: "HACK-PRD · 09",
        title: "Meshmap + City Champ",
        tagline: "拿着手机走上街头扫描建筑，在 AR 领地争夺游戏中众包重构全球 3D 数字孪生",
        hackathonId: "solana-renaissance-2024",
        hackathonName: "Solana 文艺复兴全球黑客松",
        hackathonDates: "2024.03.04 – 2024.04.08",
        organizer: "Colosseum & Solana Foundation",
        platformCategory: "app",
        targetPlatform: "iOS / Android 原生移动端",
        award: "🥇 游戏与空间赛道第 1 名 (1st Place Gaming & DePIN)",
        votes: 2890,
        voteRank: 3,
        team: {
          name: "Spatial Mesh Corp",
          members: ["Toby Davies", "Aris Thorne"],
        },
        summary:
          "结合手机激光雷达（LiDAR）与 DePIN 众包激励的移动端 AR 街头对战游戏。玩家在现实街头通过手机摄像头对身边雕塑与街景进行点云扫描，不仅能攻占数字地盘，更能将高保真 3D 几何数据上传至去中心化空间网络换取报酬。",
        techStack: [
          "iOS Swift",
          "ARKit / LiDAR",
          "Metal Shader",
          "Solana DePIN",
          "Rust",
        ],
        officialUrl: "https://meshmap.xyz/",
        githubUrl: "https://github.com/meshmap/city-champ-app",
        curatorCritique:
          "将原本枯燥的基础设施空间扫描工作，转化成了让人忍不住穿上球鞋走遍城市每个角落的快乐游戏探索。",
        coverGradient: "from-[#1E365E] via-[#35578F] to-[#101828]",
      },
    ],
  },

  // ── 04 · TreeHacks 2024 (Stanford) ──────────────────────────────────
  {
    id: "treehacks-stanford-2024",
    catalogNo: "HACK · VOL.04",
    name: "斯坦福 TreeHacks 2024",
    englishName: "TreeHacks 2024 (Stanford University)",
    organizer: "Stanford University × Devpost",
    organizerLogoText: "T",
    edition: "第 10 届十周年纪念季",
    startDate: "2024-02-16",
    endDate: "2024-02-18",
    dateDisplay: "2024.02.16 – 2024.02.18",
    location: "斯坦福大学工程学院 (Palo Alto, CA)",
    prizePool: "$150,000+ 及硅谷顶投孵化",
    status: "completed",
    totalSubmissions: 1200,
    platformCategories: ["web", "cross"],
    tagline: "全美最大高校黑客松十周年：医疗无障碍、空间计算与应急救灾爆发",
    description:
      "由斯坦福大学主办、全美最具声望的高校创客大赛。汇聚哈佛、MIT、斯坦福等全球名校的顶尖学生团队，以解决气候危机、罕见病医疗救助与前沿人机交互为核心宗旨。",
    officialUrl: "https://treehacks.com/",
    products: [
      {
        id: "good-samaritan-vision",
        catalogNo: "HACK-PRD · 10",
        title: "Good Samaritan (好撒玛利亚人)",
        tagline: "Apple Vision Pro 空间急救辅助：视野中实时投射 CPR 黄金按压引导全息图",
        hackathonId: "treehacks-stanford-2024",
        hackathonName: "斯坦福 TreeHacks 2024",
        hackathonDates: "2024.02.16 – 2024.02.18",
        organizer: "Stanford University × Devpost",
        platformCategory: "cross",
        targetPlatform: "Apple Vision Pro (visionOS)",
        award: "🏆 全场最具社会影响力特等奖 (Most Impactful Hack)",
        votes: 4190,
        voteRank: 1,
        team: {
          name: "Stanford Bio-Engineering & Vision Lab",
          members: ["Anika Sharma", "Daniel Cohen", "Jenny Hu"],
        },
        summary:
          "当身旁有人突然心脏骤停倒地时，零医学经验的路人往往惊慌失措。戴上 Vision Pro 启动应用，空间系统会通过红外与高精摄像头实时定位患者胸骨位置，在视野中投射三维节拍器与按压深度提示，指导目击者实施高质量心肺复苏术与 AED 除颤。",
        techStack: [
          "visionOS",
          "SwiftUI",
          "RealityKit",
          "OpenCV",
          "MediaPipe",
          "AVFoundation",
        ],
        officialUrl: "https://treehacks-2024.devpost.com/submissions/467812-good-samaritan",
        githubUrl: "https://github.com/good-samaritan-vision/app",
        curatorCritique:
          "在虚实交融的微光中挽救生命。它向全世界展示了空间计算绝不仅仅是用来在客厅看电影的玩具，而是能将专业医学技能瞬间赋予每一个普通人的普惠之光。",
        coverGradient: "from-[#C8432B] via-[#9E2E1D] to-[#1D1210]",
      },
      {
        id: "skysplat-gaussian-drones",
        catalogNo: "HACK-PRD · 11",
        title: "SkySplat",
        tagline: "自主无人机集群结合 3D 高斯泼溅，在震后灾区 10 分钟内完成全域毫米级 3D 建模",
        hackathonId: "treehacks-stanford-2024",
        hackathonName: "斯坦福 TreeHacks 2024",
        hackathonDates: "2024.02.16 – 2024.02.18",
        organizer: "Stanford University × Devpost",
        platformCategory: "cross",
        targetPlatform: "无人机边缘端 & 应急地面站 Web",
        award: "🏆 气候与应急救灾特等奖 (Sustainability Grand Prize)",
        votes: 3520,
        voteRank: 2,
        team: {
          name: "Aerial Splat Tech",
          members: ["Anirudh Kotamraju", "David Zhang"],
        },
        summary:
          "地震或洪灾发生后，传统航拍卫星图不仅存在盲区，且无法提供立体高度信息。SkySplat 调度多台低成本民用无人机构成自主飞行阵列，在空中拍摄高帧率影像后直接通过 3D Gaussian Splatting 技术实时拼装出带真实光照反射的厘米级三维废墟模型。",
        techStack: [
          "3D Gaussian Splatting",
          "CUDA / C++",
          "DJI Onboard SDK",
          "Three.js",
          "WebGL",
        ],
        officialUrl: "https://skysplat.dev/",
        githubUrl: "https://github.com/skysplat/skysplat-engine",
        curatorCritique:
          "计算机图形学顶级学术成果与极端工程场景的硬核碰撞，把原本需要渲染数小时的实验室技术直接变成了抢险前线挽救生命的战术地图。",
        coverGradient: "from-[#194434] via-[#245E47] to-[#0D1E17]",
      },
      {
        id: "coderepair-autonomous",
        catalogNo: "HACK-PRD · 12",
        title: "CodeRepair",
        tagline: "像资深工程师一样自主启动断点调试、执行堆栈回溯与代码热自愈的开发 Agent",
        hackathonId: "treehacks-stanford-2024",
        hackathonName: "斯坦福 TreeHacks 2024",
        hackathonDates: "2024.02.16 – 2024.02.18",
        organizer: "Stanford University × Devpost",
        platformCategory: "web",
        targetPlatform: "Web 控制台 & VSCode 扩展",
        award: "🏆 Y Combinator 重点孵化特别大奖 (YC Prize)",
        votes: 3120,
        voteRank: 3,
        team: {
          name: "Yoneda Labs",
          members: ["Kunal Agarwal", "Samir Sen"],
        },
        summary:
          "摆脱目前 Copilot 类工具‘仅凭静态文本猜测报错原因’的浅层局限。CodeRepair 能够自主挂载到开发者的本地 Node.js / Python 运行时中，自动安插断点、监控变量污染链、在隔离沙盒中重现 Bug，并在验证通过后生成最小差分修补 PR。",
        techStack: [
          "TypeScript",
          "DAP (Debug Adapter Protocol)",
          "Docker Sandbox",
          "FastAPI",
          "React",
        ],
        officialUrl: "https://coderepair.dev/",
        githubUrl: "https://github.com/coderepair-ai/agent",
        curatorCritique:
          "这是 AI 编程助手从‘代码自动补全’跃迁至‘真正工程同行’的关键里程碑，展现了极其成熟的编译与调试底层理解力。",
        coverGradient: "from-[#332B66] via-[#4A3BC2] to-[#141222]",
      },
    ],
  },

  // ── 05 · Cerebral Valley AI Summit Hackathon ────────────────────────
  {
    id: "cerebral-valley-sf-2024",
    catalogNo: "HACK · VOL.05",
    name: "硅谷大脑山谷 AI 黑客松",
    englishName: "Cerebral Valley AI Summit Hackathon 2024",
    organizer: "Cerebral Valley (San Francisco)",
    organizerLogoText: "C",
    edition: "2024 秋季全球创客季",
    startDate: "2024-09-28",
    endDate: "2024-09-29",
    dateDisplay: "2024.09.28 – 2024.09.29",
    location: "旧金山 · 海耶斯谷 (Hayes Valley, SF)",
    prizePool: "$200,000+ 及一线 VC 直投孵化",
    status: "completed",
    totalSubmissions: 350,
    platformCategories: ["web", "ai"],
    tagline: "旧金山硬核 AI 圈焦点：聚焦 Agent 验证可信度、多模态白板与超拟真音视频交互",
    description:
      "被誉为全球生成式 AI 发展风向标的闭门精英创客大会。数十位硅谷顶尖天使投资人与模型架构师亲临现场，评审极为严苛，注重在真实代码执行痕迹与前沿体验上的绝对突破。",
    officialUrl: "https://cerebralvalley.ai/",
    products: [
      {
        id: "signal-seal-agent-audit",
        catalogNo: "HACK-PRD · 13",
        title: "Signal Seal",
        tagline: "为自动化 AI Coding Agent 输出建立防幻觉的加密真实验证印章与可溯源执行存证",
        hackathonId: "cerebral-valley-sf-2024",
        hackathonName: "硅谷大脑山谷 AI 黑客松",
        hackathonDates: "2024.09.28 – 2024.09.29",
        organizer: "Cerebral Valley (San Francisco)",
        platformCategory: "ai",
        targetPlatform: "Web 管理台 & 审计 CLI",
        award: "🏆 评审团一致评定第 1 名 (1st Place Overall Winner)",
        votes: 3950,
        voteRank: 1,
        team: {
          name: "Verifiable Systems Lab",
          members: ["Evan Wright", "Seraphina Lin"],
        },
        summary:
          "当企业越来越广泛地采用 AI Agent 编写生产代码时，如何证明这段代码确实在真实环境中通过了测试且未被投毒？Signal Seal 在隔离执行环境中对 Agent 的每一步操作记录系统调用痕迹，生成经零知识证明签名的防篡改‘代码质量公证印章’。",
        techStack: [
          "Rust",
          "eBPF",
          "Cosign / Web3 PKI",
          "Next.js",
          "Tailwind CSS",
        ],
        officialUrl: "https://signalseal.ai/",
        githubUrl: "https://github.com/signalseal/audit-seal",
        curatorCritique:
          "切中了大模型落地工业界最痛的一根神经。它不再沉迷于炫技‘模型能写多少行代码’，而是冷静严肃地回答‘我们如何百分之百信任这段代码’。",
        coverGradient: "from-[#662B50] via-[#944073] to-[#1F101A]",
      },
      {
        id: "scribemind-canvas",
        catalogNo: "HACK-PRD · 14",
        title: "ScribeMind",
        tagline: "多人高能会议的多模态实时拓扑心智白板，把每一句头脑风暴自动绘制成可交互系统图",
        hackathonId: "cerebral-valley-sf-2024",
        hackathonName: "硅谷大脑山谷 AI 黑客松",
        hackathonDates: "2024.09.28 – 2024.09.29",
        organizer: "Cerebral Valley (San Francisco)",
        platformCategory: "web",
        targetPlatform: "无限画布 Web App",
        award: "🥇 最佳生产力工具与高票作品 (People's Choice Award)",
        votes: 2780,
        voteRank: 2,
        team: {
          name: "Infinite Thinkers",
          members: ["Julian Frost", "Mei-Ling Zhou"],
        },
        summary:
          "传统在线会议纪要只是一长串令人昏昏欲睡的文字摘要。ScribeMind 像一位坐在白板前的顶级架构师，倾听会议中的每一次观点交锋，实时在无限画布上绘制并动态演进业务流程图、架构演化图与责任人分工矩阵。",
        techStack: [
          "React 19",
          "tldraw Canvas Engine",
          "WebRTC",
          "FastAPI",
          "Gemini 1.5 Pro",
        ],
        officialUrl: "https://scribemind.io/",
        githubUrl: "https://github.com/scribemind/canvas",
        curatorCritique:
          "无限画布排版极其优美，动画极其克制从容，将无形的语言交流转译为有形的空间拓扑，是交互设计艺术与认知心理学的完美联姻。",
        coverGradient: "from-[#2F522F] via-[#497A49] to-[#111D11]",
      },
    ],
  },

  // ── 06 · DoraHacks AppWorks AI & Mobile Hackathon ────────────────────
  {
    id: "dorahacks-appworks-mobile-2024",
    catalogNo: "HACK · VOL.06",
    name: "DoraHacks × AppWorks 移动与 AI 黑客松",
    englishName: "DoraHacks AppWorks AI & Mobile Hackathon 2024",
    organizer: "DoraHacks × AppWorks",
    organizerLogoText: "D",
    edition: "2024 亚太创新季",
    startDate: "2024-08-10",
    endDate: "2024-08-25",
    dateDisplay: "2024.08.10 – 2024.08.25",
    location: "台北 & 全球线上 (Hybrid)",
    prizePool: "$120,000+",
    status: "completed",
    totalSubmissions: 580,
    platformCategories: ["app"],
    tagline: "聚焦移动原生创新：将大模型压缩进手掌，重塑年轻一代的健康生活与灵感记录",
    description:
      "由全球知名极客运动平台 DoraHacks 与亚太知名创投机构 AppWorks 联合主办。赛事专设‘移动端优先’赛道，旨在发掘能够真正装入用户日常手机并创造高频情感陪伴价值的原生作品。",
    officialUrl: "https://dorahacks.io/hackathon/appworks-ai-mobile",
    products: [
      {
        id: "pocketchef-ai-mobile",
        catalogNo: "HACK-PRD · 15",
        title: "PocketChef AI",
        tagline: "对准杂乱冰箱拍张照片，秒级获得兼顾控糖卡路里的米其林级食谱与烹饪计时",
        hackathonId: "dorahacks-appworks-mobile-2024",
        hackathonName: "DoraHacks × AppWorks 移动与 AI 黑客松",
        hackathonDates: "2024.08.10 – 2024.08.25",
        organizer: "DoraHacks × AppWorks",
        platformCategory: "app",
        targetPlatform: "iOS 原生 App (SwiftUI)",
        award: "🥇 移动端赛道第一名 (1st Place Mobile App)",
        votes: 3260,
        voteRank: 1,
        team: {
          name: "Culinary Vision Tech",
          members: ["Chloe Dupont", "Kenji Takahashi"],
        },
        summary:
          "下班回家对着冰箱发愁‘今天吃什么’的终极解药。打开 App 对准冰箱冷藏室咔嚓一张照片，毫秒级圈出所有食材、识别保质期与临期轻重缓急，结合用户当天的健身步数与控糖目标，生成步骤清晰、配有动态倒计时的专属暖心家常菜谱。",
        techStack: [
          "SwiftUI",
          "CoreML",
          "Vision Framework",
          "Gemini 1.5 Flash",
          "Live Activities",
        ],
        officialUrl: "https://pocketchef.app/",
        githubUrl: "https://github.com/pocketchef-ai/ios-app",
        curatorCritique:
          "极佳的 iOS 原生体验。巧妙利用了 Dynamic Island（灵动岛）和实时活动来展示烹饪倒计时，把技术温柔地藏在了美食的香气与烟火气背后。",
        coverGradient: "from-[#A66C14] via-[#C8432B] to-[#21170F]",
      },
      {
        id: "subtlenote-offline-journal",
        catalogNo: "HACK-PRD · 16",
        title: "SubtleNote (微语笔记)",
        tagline: "端侧本地离线加密的灵感碎碎念随手记，将零碎口语自动沉淀为优雅卡片盒思想档案",
        hackathonId: "dorahacks-appworks-mobile-2024",
        hackathonName: "DoraHacks × AppWorks 移动与 AI 黑客松",
        hackathonDates: "2024.08.10 – 2024.08.25",
        organizer: "DoraHacks × AppWorks",
        platformCategory: "app",
        targetPlatform: "iOS / macOS 本地优先 App",
        award: "🏆 社区投票最高金奖 (Community Choice #1)",
        votes: 2980,
        voteRank: 2,
        team: {
          name: "Quiet Craft Studio",
          members: ["Hao-Ting Chang", "Linnea Berg"],
        },
        summary:
          "专为创作者与写作者打造的‘无压力’语音随想录。主打绝对隐私与本地优先（Local-First）。你在散步、通勤时随口说的零碎口语，完全在设备芯片的 NPU 上离线转写为文字，并自动去除口头禅，梳理为层级严谨、支持双向链接的 Markdown 卡片。",
        techStack: [
          "Swift",
          "Whisper.cpp",
          "CoreData / SQLite",
          "Llama.cpp on Metal",
        ],
        officialUrl: "https://subtlenote.io/",
        githubUrl: "https://github.com/subtlenote/local-first-note",
        curatorCritique:
          "在云端工具泛滥且侵犯隐私的喧嚣时代，以沉静克制的设计语言重拾了人与自己思想对话的宁静时刻，质感极其温润。",
        coverGradient: "from-[#1B4A52] via-[#2A727D] to-[#0E1F23]",
      },
    ],
  },

  // ── 07 · VisionDevCamp 2024 (Apple Vision Pro) ──────────────────────
  {
    id: "vision-devcamp-2024",
    catalogNo: "HACK · VOL.07",
    name: "硅谷 VisionDevCamp 空间计算峰会",
    englishName: "VisionDevCamp 2024 (Apple Vision Pro)",
    organizer: "VisionDevCamp (Santa Clara University)",
    organizerLogoText: "V",
    edition: "2024 空间计算创世纪",
    startDate: "2024-03-29",
    endDate: "2024-03-31",
    dateDisplay: "2024.03.29 – 2024.03.31",
    location: "加州圣克拉拉大学 · 硅谷",
    prizePool: "顶奢硬件大奖与硅谷早期投资通道",
    status: "completed",
    totalSubmissions: 180,
    platformCategories: ["cross"],
    tagline: "Apple Vision Pro 首发后的全球首场高密度硬核空间计算开发者冲刺",
    description:
      "由苹果早期开发者社群传奇人物发起的纯线下闭门空间黑客松。全场数十台 Apple Vision Pro 同时运行，探索手眼协同、真实物理世界遮挡与全息沉浸式声学的极限体验。",
    officialUrl: "https://visiondevcamp.org/",
    products: [
      {
        id: "pianoverse-spatial-piano",
        catalogNo: "HACK-PRD · 17",
        title: "Pianoverse",
        tagline: "戴上 Vision Pro 坐在任何实体钢琴前，全息光流音符瀑布般精准降落在真实琴键上",
        hackathonId: "vision-devcamp-2024",
        hackathonName: "硅谷 VisionDevCamp 空间计算峰会",
        hackathonDates: "2024.03.29 – 2024.03.31",
        organizer: "VisionDevCamp (Santa Clara University)",
        platformCategory: "cross",
        targetPlatform: "Apple Vision Pro (visionOS)",
        award: "🏆 全场最佳空间体验总冠军 (Best Overall Spatial App)",
        votes: 4350,
        voteRank: 1,
        team: {
          name: "Harmonic Reality Lab",
          members: ["Julian Bell", "Sora Takahashi", "Mira Novak"],
        },
        summary:
          "彻底打破了传统看纸质五线谱和死板琴谱学习钢琴的痛苦。坐在家里任何一台实体钢琴或电钢琴前，Pianoverse 会通过空间摄像头自动识别琴键的物理绝对坐标。经典名曲的乐符化为发光粒子流优雅坠落在对应的黑白键上，手势追踪毫秒级纠正弹奏指法与节奏。",
        techStack: [
          "visionOS",
          "RealityKit 4",
          "CoreMIDI",
          "Spatial Audio Engine",
          "Metal",
        ],
        officialUrl: "https://pianoverse.vision/",
        githubUrl: "https://github.com/pianoverse/visionos-app",
        curatorCritique:
          "当第一个音符伴随着指尖落下、空间粒子在真实木质琴盖上泛起涟漪时，全场评委起立鼓掌。这是物理现实与数字梦境最优雅的交响曲。",
        coverGradient: "from-[#332B66] via-[#4A3BC2] to-[#141222]",
      },
      {
        id: "cellsculpt-spatial-bio",
        catalogNo: "HACK-PRD · 18",
        title: "CellSculpt (细胞雕塑家)",
        tagline: "伸手捏合拆解活体蛋白质与病毒靶点分子，在客厅中漫游超高精分子结构三维显微镜",
        hackathonId: "vision-devcamp-2024",
        hackathonName: "硅谷 VisionDevCamp 空间计算峰会",
        hackathonDates: "2024.03.29 – 2024.03.31",
        organizer: "VisionDevCamp (Santa Clara University)",
        platformCategory: "cross",
        targetPlatform: "Apple Vision Pro (visionOS)",
        award: "🥇 最佳科学探索与教育奖 (Best Science & Education)",
        votes: 2790,
        voteRank: 2,
        team: {
          name: "BioImmersive Studio",
          members: ["Dr. Aris Vance", "Ling-Wei Sun"],
        },
        summary:
          "将冷冻电镜（Cryo-EM）采集的微观分子与细胞内部世界直接搬入客厅三维空间。医学生与生物制药科学家可以直接用双手捏起冠状病毒突刺蛋白模型，观察小分子药物如何穿过细胞膜进入活性口袋，进行毫秒级对接模拟与结构拆解。",
        techStack: [
          "visionOS",
          "RealityKit",
          "BioPDB Parser",
          "SharePlay Spatial",
          "Metal Compute",
        ],
        officialUrl: "https://cellsculpt.bio/",
        githubUrl: "https://github.com/cellsculpt/cellsculpt-vision",
        curatorCritique:
          "让深奥晦涩的分子生物学化作触手可及的宏伟建筑。它彻底重新定义了科学研究者观察自然真理的维度与范式。",
        coverGradient: "from-[#194434] via-[#245E47] to-[#0D1E17]",
      },
    ],
  },

  // ── 08 · Anthropic Claude Builder Hackathon ──────────────────────────
  {
    id: "anthropic-claude-builder-2024",
    catalogNo: "HACK · VOL.08",
    name: "Anthropic Claude 创造者全球黑客松",
    englishName: "Anthropic Claude Builder Hackathon 2024",
    organizer: "Lablab.ai × Anthropic",
    organizerLogoText: "A",
    edition: "2024 年度全球季",
    startDate: "2024-10-05",
    endDate: "2024-10-20",
    dateDisplay: "2024.10.05 – 2024.10.20",
    location: "全球线上 (Online)",
    prizePool: "$80,000+ API Credits & 孵化",
    status: "completed",
    totalSubmissions: 890,
    platformCategories: ["web", "ai"],
    tagline: "深挖 Claude 3.5 Sonnet 推理潜力：从 Artifacts 微应用到高难度长文档博弈",
    description:
      "由全球最大 AI 极客竞赛平台 Lablab.ai 与 Anthropic 联合主办。重点挖掘 Claude 3.5 Sonnet 强大的代码生成、长上下文结构化反思与 Artifacts 即时预览生态系统。",
    officialUrl: "https://lablab.ai/event/claude-builder-hackathon",
    products: [
      {
        id: "artifacts-flow-builder",
        catalogNo: "HACK-PRD · 19",
        title: "ArtifactsFlow",
        tagline: "将对话中生成的零散 Artifacts 组件，一键发布为生产级独立 Web 微应用与工作流",
        hackathonId: "anthropic-claude-builder-2024",
        hackathonName: "Anthropic Claude 创造者全球黑客松",
        hackathonDates: "2024.10.05 – 2024.10.20",
        organizer: "Lablab.ai × Anthropic",
        platformCategory: "web",
        targetPlatform: "Web 平台 / Chrome 扩展",
        award: "🏆 最佳工作流创新大奖 (Best Workflow Innovation)",
        votes: 3420,
        voteRank: 1,
        team: {
          name: "Flowcraft Studio",
          members: ["Benoit Laurent", "Grace O'Connor"],
        },
        summary:
          "Claude 官方自带的 Artifacts 很好用，但只能停留在聊天窗口内供个人预览。ArtifactsFlow 允许用户点击一下，自动将这些前端代码部署为拥有独立域名、集成数据库与鉴权体系的全功能线上应用，并能串联成企业内部自动化流水线。",
        techStack: [
          "Claude 3.5 Sonnet",
          "Cloudflare Workers",
          "Next.js",
          "Tailwind CSS",
          "Vercel SDK",
        ],
        officialUrl: "https://artifactsflow.dev/",
        githubUrl: "https://github.com/artifactsflow/builder",
        curatorCritique:
          "打通了生成式 AI 与可交付软件之间的‘最后一公里’。让任何一个充满创意的普通人真正体会到了从灵感到上线只需 60 秒的造物快感。",
        coverGradient: "from-[#1E365E] via-[#35578F] to-[#101828]",
      },
      {
        id: "legaleagle-contract-arena",
        catalogNo: "HACK-PRD · 20",
        title: "LegalEagle AI",
        tagline: "数百页并购重组复杂合同的红线条款冲突秒级诊断，结合博弈论沙盘模拟商业谈判",
        hackathonId: "anthropic-claude-builder-2024",
        hackathonName: "Anthropic Claude 创造者全球黑客松",
        hackathonDates: "2024.10.05 – 2024.10.20",
        organizer: "Lablab.ai × Anthropic",
        platformCategory: "ai",
        targetPlatform: "深度法律协作 Web App",
        award: "🥇 垂直专业领域最佳应用 (Top Vertical Industry Award)",
        votes: 2650,
        voteRank: 2,
        team: {
          name: "Juris Tech Partners",
          members: ["Arthur Pendelton", "Siddharth Rao"],
        },
        summary:
          "面向企业法务与投行精英的法律智能审阅工作台。上传数十份互相引用的投资意向书与合规条款，LegalEagle 充分运用 Claude 200k 超长上下文，自动标出责任倒挂、违约金无限连带与对赌条款陷阱，并模拟在谈判桌上提出修改意见后对方的可能反制手段。",
        techStack: [
          "Claude 3.5 Sonnet",
          "Python",
          "FastAPI",
          "React PDF Viewer",
          "PostgreSQL",
        ],
        officialUrl: "https://legaleagle.legal/",
        githubUrl: "https://github.com/legaleagle-ai/contract-analyzer",
        curatorCritique:
          "不仅展示了极其深厚的法律知识图谱理解，更将长文本大模型的能力从‘摘要阅读’升华到了‘战略博弈辅助’的高维境界。",
        coverGradient: "from-[#5E2E50] via-[#8F3D64] to-[#1E111B]",
      },
    ],
  },
];

// Helper queries and derivations
export const allHackathonProducts: HackathonProduct[] = hackathonEditions.flatMap(
  (edition) => edition.products
);

function countProductsByPlatform(category: Exclude<PlatformCategory, "all">): number {
  return allHackathonProducts.filter((p) => p.platformCategory === category).length;
}

export const platformCategories: PlatformFilterItem[] = [
  {
    id: "all",
    label: "全部平台",
    en: "ALL PLATFORMS",
    count: allHackathonProducts.length,
  },
  {
    id: "app",
    label: "移动端 App",
    en: "MOBILE (iOS / Android)",
    count: countProductsByPlatform("app"),
  },
  {
    id: "web",
    label: "Web 网站与应用",
    en: "WEB & CLOUD APPS",
    count: countProductsByPlatform("web"),
  },
  {
    id: "ai",
    label: "AI 智能体与模型",
    en: "AI AGENTS & MULTIMODAL",
    count: countProductsByPlatform("ai"),
  },
  {
    id: "cross",
    label: "跨端与空间计算",
    en: "SPATIAL & EMBEDDED",
    count: countProductsByPlatform("cross"),
  },
];

export function getProductById(id: string): HackathonProduct | undefined {
  return allHackathonProducts.find((p) => p.id === id);
}

export function getHackathonById(id: string): HackathonEdition | undefined {
  return hackathonEditions.find((h) => h.id === id);
}

export function getProductsByPlatform(category: PlatformCategory): HackathonProduct[] {
  if (category === "all") return allHackathonProducts;
  return allHackathonProducts.filter((p) => p.platformCategory === category);
}

export function getRelatedProducts(
  currentProductId: string,
  limit: number = 3
): HackathonProduct[] {
  const current = getProductById(currentProductId);
  if (!current) return allHackathonProducts.slice(0, limit);

  // prioritize same platform or same hackathon, excluding current
  const others = allHackathonProducts.filter((p) => p.id !== currentProductId);
  const samePlatform = others.filter(
    (p) => p.platformCategory === current.platformCategory
  );
  const remaining = others.filter(
    (p) => p.platformCategory !== current.platformCategory
  );

  return [...samePlatform, ...remaining].slice(0, limit);
}
