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
  problemSolved: string;
  coreFeatures: string[];
  techStack: string[];
  officialUrl: string;
  githubUrl?: string;
  curatorCritique: string;
  metrics: {
    views: string;
    stars: string;
  };
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

export const platformCategories: PlatformFilterItem[] = [
  { id: "all", label: "全部平台", en: "ALL PLATFORMS", count: 20 },
  { id: "app", label: "移动端 App", en: "MOBILE (iOS / Android)", count: 7 },
  { id: "web", label: "Web 网站与应用", en: "WEB & CLOUD APPS", count: 8 },
  { id: "ai", label: "AI 智能体与模型", en: "AI AGENTS & MULTIMODAL", count: 8 },
  { id: "cross", label: "跨端与空间计算", en: "SPATIAL & EMBEDDED", count: 4 },
];

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
        problemSolved:
          "企业与个人日常有大量需要跨多个孤立软件（如从邮件复制数据到 Excel 再导入 ERP）的繁琐重复劳动，传统 RPA 脚本脆弱且一改版就报错。Jayu 具备自适应视觉认知，像人类一样直面屏幕界面工作。",
        coreFeatures: [
          "基于原生多模态视觉流，毫秒级定位屏幕任何 UI 控件并点击输入",
          "遇到报错或未知弹窗具备自我修正（Self-healing）与重试推演能力",
          "支持自然语言委派超长工作流，全程生成透明行动轨迹供用户随时接管",
          "完全运行在用户本地工作环境，无需目标软件开放 API 接口",
        ],
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
        metrics: {
          views: "32.4k",
          stars: "4.8k",
        },
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
        problemSolved:
          "传统医用眼控仪设备昂贵（动辄上万美元）、笨重且难以随身携带。Gaze Link 将硬件门槛降至零，让全球发展中国家的残障人士只需一部普通 Android 手机即可重获语言权利。",
        coreFeatures: [
          "自研端侧超低功耗眼球瞳孔与注视点注视检测算法",
          "结合聊天对象身份与上下文，Gemini 秒级预判可能想要表达的完整词句",
          "内置自然人声合成与紧急一键眼神呼叫看护人功能",
          "针对强光、弱光与卧床仰卧姿势进行了深度鲁棒性视觉补偿",
        ],
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
        metrics: {
          views: "24.6k",
          stars: "3.2k",
        },
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
        problemSolved:
          "全球有超过 2.5 亿视力受损人群在观看视频教程、影视作品时无法感知画面信息，而人工配解说音轨成本极其昂贵、覆盖率不足 0.1%。",
        coreFeatures: [
          "音轨静默区（Silence Gap）毫秒级智能探测，杜绝与原视频台词重叠",
          "Gemini 1.5 视频理解流：实时识别角色动作、黑板板书与镜头语言",
          "支持 28 种语言的自然情感旁白合成与语速自动伸缩匹配",
          "纯纯 Web 端即插即用，毫秒级串流回放无需预先下载完整视频",
        ],
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
        metrics: {
          views: "18.9k",
          stars: "2.1k",
        },
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
    platformCategories: ["app", "web", "ai"],
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
        problemSolved:
          "链上治理周期长、技术门槛高，普通代币持有者难以评估恶意提案对金库的吸血风险。",
        coreFeatures: [
          "多 Agent 模拟博弈对抗，预测提案通过后 30 天内金库资产损益曲线",
          "自然语言输入想法，AI 自动编译为标准化 BIP/EIP 提案与智能合约",
          "Telegram 与 Discord 机器人联动，群内即刻发起一键无感签名投票",
          "集成账户抽象 (ERC-4337)，实现治理动作自动化触发与时间锁防暴走",
        ],
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
        metrics: {
          views: "21.2k",
          stars: "1.9k",
        },
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
        problemSolved:
          "发展中国家高度依赖央行本地二维码清算体系，境外游客无法绑定，经常因无现金陷入无法出停车场的尴尬。",
        coreFeatures: [
          "相机直接扫描泰国标准 PromptPay EMVCo 二维码，智能提取金额与商户代码",
          "集成极速链上流动性池，0.8 秒内完成 USDC 到泰铢法币网关自动承兑",
          "无感免签名账户抽象，给游客带来等同于微信/支付宝的丝滑移动体验",
          "内置数字发票与泊位倒计时提醒，彻底告别超时罚单",
        ],
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
        metrics: {
          views: "19.5k",
          stars: "1.6k",
        },
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
        problemSolved:
          "传统多签钱包（如 Safe）界面繁琐、每次签名都必须连电脑网页，导致轻量级团队与好友圈子根本用不起来。",
        coreFeatures: [
          "内嵌于 Telegram 原生应用，零跳出体验与极速加载",
          "多签门限动态可调，小额开销单人审核、大额开销全群多签共识",
          "集成 Passkey 生物识别，用手机 Face ID 替代私钥繁琐密码输入",
          "自动生成透明账单卡片直接推送至群聊消息流",
        ],
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
        metrics: {
          views: "17.3k",
          stars: "1.4k",
        },
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
        problemSolved:
          "传统 PoW 算力中心化为大型矿场，普通人无法参与；而 PoS 往往演化为富者愈富的质押资本博弈。Ore 重塑了中本聪早期‘一人一机’的去中心化纯粹梦想。",
        coreFeatures: [
          "无需任何复杂配置，直接在现代浏览器网页中开启 WebAssembly 线程参与计算",
          "严谨密码学设计的公平线性出块曲线，任何人无法包揽单个区块奖励",
          "完全开源、零预挖、无投资人预留份额的纯粹极客精神作品",
          "成为 Solana 历史上单日调用频次最高的智能合约之一",
        ],
        techStack: ["Rust", "Solana Anchor", "Wasm", "TypeScript", "Next.js"],
        officialUrl: "https://ore.supply/",
        githubUrl: "https://github.com/harding/ore",
        curatorCritique:
          "它不仅是一段精巧的高性能智能合约代码，更是向数字货币最初愿景发起的一记浪漫诗篇。在浏览器点开它的一瞬间，极客时代的自由脉搏再次跳动。",
        metrics: {
          views: "54.2k",
          stars: "6.7k",
        },
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
        problemSolved:
          "创作者在社交平台创作了大量爆款内容，平台赚走了所有广告费，创作者本身除了虚浮的数字点赞外无法获得直接收益。",
        coreFeatures: [
          "结合 X/Twitter 开放 API 验证推文真实归属权，一键秒级代币化",
          "基于自动做市商（AMM）联合曲线，随时提供即时交易流动性",
          "极具新粗野主义（Neo-brutalism）风格的炫酷移动端 Web UI 交互",
          "内置打赏与粉丝社群封闭专属讨论室",
        ],
        techStack: ["React", "Tailwind CSS", "Solana Web3.js", "Redis"],
        officialUrl: "https://banger.lol/",
        githubUrl: "https://github.com/banger-lol/core",
        curatorCritique:
          "将 meme 文化、社群认同与金融工程巧妙融合的消费级交互典范，界面排版张力十足，动效极为流畅。",
        metrics: {
          views: "28.1k",
          stars: "2.8k",
        },
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
        problemSolved:
          "科技巨头（如 Google、Apple）制作街景和 3D 地图需要耗费数十亿美元的专用雷达车，更新极其缓慢且数据私有封闭。Meshmap 用游戏化众包将成本降至千分之一。",
        coreFeatures: [
          "充分释放 iPhone Pro 系列 LiDAR 传感器潜力的移动端点云重建",
          "结合 GPS 围栏与现实地理坐标的‘占地盘’多人即时对抗游戏玩法",
          "自动剔除画面中的行人面孔与车牌号码，隐私脱敏合规后上链",
          "众包点云自动压缩对齐，实时拼装为整座城市的无缝 3D 数字世界",
        ],
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
        metrics: {
          views: "22.4k",
          stars: "2.3k",
        },
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
    platformCategories: ["app", "web", "cross"],
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
        problemSolved:
          "院外心脏骤停救活率不足 10%，黄金抢救时间仅 4 分钟。普通人即便学过急救，在紧急关头也会因遗忘按压频率与手法而不敢施救。",
        coreFeatures: [
          "利用 MediaPipe 与 OpenCV 空间骨骼追踪，毫秒级校准施救者双手按压垂直姿态",
          "空间全息音画双重反馈：动态音效节奏（100-120 次/分钟）配合绿色深度波形",
          "自动识别周围自动体外除颤器（AED）型号并逐步投射电极片贴放虚实结合指引",
          "急救过程全程自动化报警并同步将患者空间体征数据串流发送给急救中心 911",
        ],
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
        metrics: {
          views: "36.8k",
          stars: "4.5k",
        },
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
        problemSolved:
          "救灾黄金 72 小时内，搜救队往往因无法判断废墟坍塌内部空隙与承重墙稳定性而冒险进入，造成二次伤亡。",
        coreFeatures: [
          "创新的边缘端实时稀疏高斯泼溅算法，计算耗时仅传统 NeRF 的 1/30",
          "地面站指挥官可在 Web 浏览器中自由拖拽漫游，如同使用第一人称无人机进入瓦砾内部探查",
          "集成红外热成像通道，在 3D 模型中高亮显示生命体征微弱热源坐标",
          "离线优先架构：无网络无通信基站环境下两台笔记本电脑即可完成全流程运算",
        ],
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
        metrics: {
          views: "29.4k",
          stars: "3.7k",
        },
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
        problemSolved:
          "软件开发中 70% 的时间被消耗在枯燥的查 Bug 与复现边缘环境上，现有 AI 工具常给出看似合理却引入新 Bug 的幻觉代码。",
        coreFeatures: [
          "深度对接 Debugger 接口，能够一步一步 Step-over / Step-into 执行复杂代码堆栈",
          "运行时变量内存快照对比，精准定位在哪一行代码产生了空指针或溢出异常",
          "自动生成针对当前 Bug 的回归测试用例，确保修复代码不会破坏既有功能",
          "支持云端 Webhooks 触发，深夜告警时自动自愈并部署上线",
        ],
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
        metrics: {
          views: "27.1k",
          stars: "3.1k",
        },
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
        problemSolved:
          "AI 生成代码中隐藏的安全后门、虚假单元测试覆盖率以及不可复现的偶然成功问题，成为阻碍 AI 进入金融与航空级关键系统的最大绊脚石。",
        coreFeatures: [
          "轻量级 eBPF 探针全程记录容器环境下的文件读写与网络外发请求",
          "将代码静态分析报告、动态测试覆盖率与视频录屏哈希打包生成签名印章",
          "GitHub Actions 无缝集成：没有 Signal Seal 绿标认证的 PR 严禁合并",
          "提供开箱即用的高颜值审计证明公开验证 Web 页面",
        ],
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
        metrics: {
          views: "31.2k",
          stars: "3.8k",
        },
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
        problemSolved:
          "团队在长达数小时的语音头脑风暴后，观点零散、缺乏视觉共识，会后往往还要花费半天时间手动梳理流程图。",
        coreFeatures: [
          "声纹分离多人多通道语音识别，清晰区分谁提出了什么关键假设与质疑",
          "自适应非线性布局引擎，观点发生冲突时自动在白板上分叉出分支博弈树",
          "可一键将画布节点导出为标准 Mermaid 流程图或 Figma 图层格式",
          "支持与会者随时在画布上双击打字插话或拖动节点重新编排逻辑关系",
        ],
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
        metrics: {
          views: "23.8k",
          stars: "2.6k",
        },
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
        problemSolved:
          "都市年轻人食物浪费严重（食材经常在角落发霉）、外卖高油高盐，想自己做饭却面对零散食材无从下手的痛点。",
        coreFeatures: [
          "端侧结合 Vision 框架的多目标食材几何框选，精准辨别‘还剩半块的嫩豆腐’",
          "自适应食谱生成：优先消耗即将在 48 小时内变质的脆弱蔬菜与肉类",
          "烹饪时全程支持语音指令翻页与‘小火煮 8 分钟’智能语音倒计时",
          "精致的温暖日式杂志风排印，每一份出炉食谱都可一键生成漂亮打卡海报",
        ],
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
        metrics: {
          views: "26.5k",
          stars: "3.4k",
        },
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
        problemSolved:
          "许多云端 AI 笔记会将用户的私密日记上传到第三方服务器训练，且网络信号不好时无法录音，严重打断瞬时灵感捕捉。",
        coreFeatures: [
          "Whisper.cpp 本地端侧量化运行，飞行模式或深山野营依然顺畅录音转写",
          "端侧轻量小模型自动提炼灵感标签（Tags）与关键要点（Action Items）",
          "数据完全以本地纯文本 Markdown 与 SQLite 文件存储，用户拥有 100% 自主权",
          "遵循极简社论版式规范，支持优雅纸质色调与衬线字体深度阅读",
        ],
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
        metrics: {
          views: "21.9k",
          stars: "2.9k",
        },
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
        problemSolved:
          "学琴初学者‘识谱慢、找不准键、练琴枯燥’容易在中途放弃，传统平板教学视频没有空间对应感。",
        coreFeatures: [
          "毫秒级空间锚定，无论施救者头部如何移动，全息音符与实体钢琴按键始终严丝合缝",
          "自适应跟随模式：琴童弹对一个音，全息光流才继续向下流淌，避免赶不上节奏的焦虑",
          "结合空间音频（Spatial Audio），仿佛置身于维也纳金色大厅中接受大师亲授",
          "支持无实体钢琴模式：在普通书桌上直接虚拟映射出一架 88 键施坦威九尺三角钢琴",
        ],
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
        metrics: {
          views: "38.5k",
          stars: "5.1k",
        },
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
        problemSolved:
          "传统生物制药与医学院仅凭电脑屏幕二维平面软件观察复杂三维空间折叠构象，极度缺乏直觉与空间景深感。",
        coreFeatures: [
          "支持标准 PDB (Protein Data Bank) 格式文件直接导入，秒级渲染数百万原子点阵",
          "利用双手自然手势（Pinch & Drag）像捏泥塑一样旋转、缩放与剖切蛋白质截面",
          "多人空间协同：分布在不同国家的科学家可戴着头显围站在同一个全息分子前实时交流标注",
          "结合流体动力学粒子系统，逼真模拟药物小分子在细胞质溶剂中的布朗运动",
        ],
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
        metrics: {
          views: "24.1k",
          stars: "3.2k",
        },
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
        problemSolved:
          "非技术人员用 AI 生成了惊艳的交互网页或计算器，却因为不懂购买服务器、配置域名和部署流水线而无法分享给客户与团队使用。",
        coreFeatures: [
          "一键抓取聊天中的 React / HTML / SVG 组件，秒级打包并在边缘节点完成部署",
          "自动注入无服务器轻量持久化存储（KV Storage），让静态组件瞬间拥有记忆",
          "可视化连线编辑器：将多个独立的 Artifacts 应用像乐高积木一样组合串联",
          "自动生成支持自定义品牌域名的响应式 Web 分享页面",
        ],
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
        metrics: {
          views: "25.3k",
          stars: "3.5k",
        },
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
        problemSolved:
          "跨国并购合同极其厚重，人工审阅耗费数周时间且极易遗漏前后自相矛盾的免责小字条款，产生不可估量的诉讼风险。",
        coreFeatures: [
          "交叉审阅多份关联法律文本，绘制义务与风险拓扑责任网",
          "独家‘谈判沙盘模式’：输入己方商业底线，AI 自动生成三套梯级让步与进攻策略话术",
          "精确到自然段落的法律判例引证与风险级别高亮提示",
          "数据严密遵循本地内存即毁原则，严格符合律师职业保密特权要求",
        ],
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
        metrics: {
          views: "19.8k",
          stars: "2.4k",
        },
        coverGradient: "from-[#5E2E50] via-[#8F3D64] to-[#1E111B]",
      },
    ],
  },
];

// Helper queries and derivations
export const allHackathonProducts: HackathonProduct[] = hackathonEditions.flatMap(
  (edition) => edition.products
);

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
