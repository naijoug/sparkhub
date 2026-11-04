import {
  getProductById,
  HackathonProduct,
} from "./hackathons";

export interface HackathonProductNarrative {
  problemSolved: string;
  coreFeatures: string[];
}

export interface HackathonProductDetail
  extends HackathonProduct,
    HackathonProductNarrative {}

export const hackathonProductNarratives: Record<
  string,
  HackathonProductNarrative
> = {
  "jayu-ai-assistant": {
    problemSolved:
      "企业与个人日常有大量需要跨多个孤立软件（如从邮件复制数据到 Excel 再导入 ERP）的繁琐重复劳动，传统 RPA 脚本脆弱且一改版就报错。Jayu 具备自适应视觉认知，像人类一样直面屏幕界面工作。",
    coreFeatures: [
      "基于原生多模态视觉流，毫秒级定位屏幕任何 UI 控件并点击输入",
      "遇到报错或未知弹窗具备自我修正（Self-healing）与重试推演能力",
      "支持自然语言委派超长工作流，全程生成透明行动轨迹供用户随时接管",
      "完全运行在用户本地工作环境，无需目标软件开放 API 接口",
    ],
  },
  "gaze-link-als": {
    problemSolved:
      "传统医用眼控仪设备昂贵（动辄上万美元）、笨重且难以随身携带。Gaze Link 将硬件门槛降至零，让全球发展中国家的残障人士只需一部普通 Android 手机即可重获语言权利。",
    coreFeatures: [
      "自研端侧超低功耗眼球瞳孔与注视点注视检测算法",
      "结合聊天对象身份与上下文，Gemini 秒级预判可能想要表达的完整词句",
      "内置自然人声合成与紧急一键眼神呼叫看护人功能",
      "针对强光、弱光与卧床仰卧姿势进行了深度鲁棒性视觉补偿",
    ],
  },
  "viddyscribe-web": {
    problemSolved:
      "全球有超过 2.5 亿视力受损人群在观看视频教程、影视作品时无法感知画面信息，而人工配解说音轨成本极其昂贵、覆盖率不足 0.1%。",
    coreFeatures: [
      "音轨静默区（Silence Gap）毫秒级智能探测，杜绝与原视频台词重叠",
      "Gemini 1.5 视频理解流：实时识别角色动作、黑板板书与镜头语言",
      "支持 28 种语言的自然情感旁白合成与语速自动伸缩匹配",
      "纯纯 Web 端即插即用，毫秒级串流回放无需预先下载完整视频",
    ],
  },
  "daogenie-governance": {
    problemSolved:
      "链上治理周期长、技术门槛高，普通代币持有者难以评估恶意提案对金库的吸血风险。",
    coreFeatures: [
      "多 Agent 模拟博弈对抗，预测提案通过后 30 天内金库资产损益曲线",
      "自然语言输入想法，AI 自动编译为标准化 BIP/EIP 提案与智能合约",
      "Telegram 与 Discord 机器人联动，群内即刻发起一键无感签名投票",
      "集成账户抽象 (ERC-4337)，实现治理动作自动化触发与时间锁防暴走",
    ],
  },
  "ethpark-qr-mobile": {
    problemSolved:
      "发展中国家高度依赖央行本地二维码清算体系，境外游客无法绑定，经常因无现金陷入无法出停车场的尴尬。",
    coreFeatures: [
      "相机直接扫描泰国标准 PromptPay EMVCo 二维码，智能提取金额与商户代码",
      "集成极速链上流动性池，0.8 秒内完成 USDC 到泰铢法币网关自动承兑",
      "无感免签名账户抽象，给游客带来等同于微信/支付宝的丝滑移动体验",
      "内置数字发票与泊位倒计时提醒，彻底告别超时罚单",
    ],
  },
  "minidao-telegram": {
    problemSolved:
      "传统多签钱包（如 Safe）界面繁琐、每次签名都必须连电脑网页，导致轻量级团队与好友圈子根本用不起来。",
    coreFeatures: [
      "内嵌于 Telegram 原生应用，零跳出体验与极速加载",
      "多签门限动态可调，小额开销单人审核、大额开销全群多签共识",
      "集成 Passkey 生物识别，用手机 Face ID 替代私钥繁琐密码输入",
      "自动生成透明账单卡片直接推送至群聊消息流",
    ],
  },
  "ore-fair-mining": {
    problemSolved:
      "传统 PoW 算力中心化为大型矿场，普通人无法参与；而 PoS 往往演化为富者愈富的质押资本博弈。Ore 重塑了中本聪早期‘一人一机’的去中心化纯粹梦想。",
    coreFeatures: [
      "无需任何复杂配置，直接在现代浏览器网页中开启 WebAssembly 线程参与计算",
      "严谨密码学设计的公平线性出块曲线，任何人无法包揽单个区块奖励",
      "完全开源、零预挖、无投资人预留份额的纯粹极客精神作品",
      "成为 Solana 历史上单日调用频次最高的智能合约之一",
    ],
  },
  "banger-lol-creator": {
    problemSolved:
      "创作者在社交平台创作了大量爆款内容，平台赚走了所有广告费，创作者本身除了虚浮的数字点赞外无法获得直接收益。",
    coreFeatures: [
      "结合 X/Twitter 开放 API 验证推文真实归属权，一键秒级代币化",
      "基于自动做市商（AMM）联合曲线，随时提供即时交易流动性",
      "极具新粗野主义（Neo-brutalism）风格的炫酷移动端 Web UI 交互",
      "内置打赏与粉丝社群封闭专属讨论室",
    ],
  },
  "meshmap-city-champ": {
    problemSolved:
      "科技巨头（如 Google、Apple）制作街景和 3D 地图需要耗费数十亿美元的专用雷达车，更新极其缓慢且数据私有封闭。Meshmap 用游戏化众包将成本降至千分之一。",
    coreFeatures: [
      "充分释放 iPhone Pro 系列 LiDAR 传感器潜力的移动端点云重建",
      "结合 GPS 围栏与现实地理坐标的‘占地盘’多人即时对抗游戏玩法",
      "自动剔除画面中的行人面孔与车牌号码，隐私脱敏合规后上链",
      "众包点云自动压缩对齐，实时拼装为整座城市的无缝 3D 数字世界",
    ],
  },
  "good-samaritan-vision": {
    problemSolved:
      "院外心脏骤停救活率不足 10%，黄金抢救时间仅 4 分钟。普通人即便学过急救，在紧急关头也会因遗忘按压频率与手法而不敢施救。",
    coreFeatures: [
      "利用 MediaPipe 与 OpenCV 空间骨骼追踪，毫秒级校准施救者双手按压垂直姿态",
      "空间全息音画双重反馈：动态音效节奏（100-120 次/分钟）配合绿色深度波形",
      "自动识别周围自动体外除颤器（AED）型号并逐步投射电极片贴放虚实结合指引",
      "急救过程全程自动化报警并同步将患者空间体征数据串流发送给急救中心 911",
    ],
  },
  "skysplat-gaussian-drones": {
    problemSolved:
      "救灾黄金 72 小时内，搜救队往往因无法判断废墟坍塌内部空隙与承重墙稳定性而冒险进入，造成二次伤亡。",
    coreFeatures: [
      "创新的边缘端实时稀疏高斯泼溅算法，计算耗时仅传统 NeRF 的 1/30",
      "地面站指挥官可在 Web 浏览器中自由拖拽漫游，如同使用第一人称无人机进入瓦砾内部探查",
      "集成红外热成像通道，在 3D 模型中高亮显示生命体征微弱热源坐标",
      "离线优先架构：无网络无通信基站环境下两台笔记本电脑即可完成全流程运算",
    ],
  },
  "coderepair-autonomous": {
    problemSolved:
      "软件开发中 70% 的时间被消耗在枯燥的查 Bug 与复现边缘环境上，现有 AI 工具常给出看似合理却引入新 Bug 的幻觉代码。",
    coreFeatures: [
      "深度对接 Debugger 接口，能够一步一步 Step-over / Step-into 执行复杂代码堆栈",
      "运行时变量内存快照对比，精准定位在哪一行代码产生了空指针或溢出异常",
      "自动生成针对当前 Bug 的回归测试用例，确保修复代码不会破坏既有功能",
      "支持云端 Webhooks 触发，深夜告警时自动自愈并部署上线",
    ],
  },
  "signal-seal-agent-audit": {
    problemSolved:
      "AI 生成代码中隐藏的安全后门、虚假单元测试覆盖率以及不可复现的偶然成功问题，成为阻碍 AI 进入金融与航空级关键系统的最大绊脚石。",
    coreFeatures: [
      "轻量级 eBPF 探针全程记录容器环境下的文件读写与网络外发请求",
      "将代码静态分析报告、动态测试覆盖率与视频录屏哈希打包生成签名印章",
      "GitHub Actions 无缝集成：没有 Signal Seal 绿标认证的 PR 严禁合并",
      "提供开箱即用的高颜值审计证明公开验证 Web 页面",
    ],
  },
  "scribemind-canvas": {
    problemSolved:
      "团队在长达数小时的语音头脑风暴后，观点零散、缺乏视觉共识，会后往往还要花费半天时间手动梳理流程图。",
    coreFeatures: [
      "声纹分离多人多通道语音识别，清晰区分谁提出了什么关键假设与质疑",
      "自适应非线性布局引擎，观点发生冲突时自动在白板上分叉出分支博弈树",
      "可一键将画布节点导出为标准 Mermaid 流程图或 Figma 图层格式",
      "支持与会者随时在画布上双击打字插话或拖动节点重新编排逻辑关系",
    ],
  },
  "pocketchef-ai-mobile": {
    problemSolved:
      "都市年轻人食物浪费严重（食材经常在角落发霉）、外卖高油高盐，想自己做饭却面对零散食材无从下手的痛点。",
    coreFeatures: [
      "端侧结合 Vision 框架的多目标食材几何框选，精准辨别‘还剩半块的嫩豆腐’",
      "自适应食谱生成：优先消耗即将在 48 小时内变质的脆弱蔬菜与肉类",
      "烹饪时全程支持语音指令翻页与‘小火煮 8 分钟’智能语音倒计时",
      "精致的温暖日式杂志风排印，每一份出炉食谱都可一键生成漂亮打卡海报",
    ],
  },
  "subtlenote-offline-journal": {
    problemSolved:
      "许多云端 AI 笔记会将用户的私密日记上传到第三方服务器训练，且网络信号不好时无法录音，严重打断瞬时灵感捕捉。",
    coreFeatures: [
      "Whisper.cpp 本地端侧量化运行，飞行模式或深山野营依然顺畅录音转写",
      "端侧轻量小模型自动提炼灵感标签（Tags）与关键要点（Action Items）",
      "数据完全以本地纯文本 Markdown 与 SQLite 文件存储，用户拥有 100% 自主权",
      "遵循极简社论版式规范，支持优雅纸质色调与衬线字体深度阅读",
    ],
  },
  "pianoverse-spatial-piano": {
    problemSolved:
      "学琴初学者‘识谱慢、找不准键、练琴枯燥’容易在中途放弃，传统平板教学视频没有空间对应感。",
    coreFeatures: [
      "毫秒级空间锚定，无论施救者头部如何移动，全息音符与实体钢琴按键始终严丝合缝",
      "自适应跟随模式：琴童弹对一个音，全息光流才继续向下流淌，避免赶不上节奏的焦虑",
      "结合空间音频（Spatial Audio），仿佛置身于维也纳金色大厅中接受大师亲授",
      "支持无实体钢琴模式：在普通书桌上直接虚拟映射出一架 88 键施坦威九尺三角钢琴",
    ],
  },
  "cellsculpt-spatial-bio": {
    problemSolved:
      "传统生物制药与医学院仅凭电脑屏幕二维平面软件观察复杂三维空间折叠构象，极度缺乏直觉与空间景深感。",
    coreFeatures: [
      "支持标准 PDB (Protein Data Bank) 格式文件直接导入，秒级渲染数百万原子点阵",
      "利用双手自然手势（Pinch & Drag）像捏泥塑一样旋转、缩放与剖切蛋白质截面",
      "多人空间协同：分布在不同国家的科学家可戴着头显围站在同一个全息分子前实时交流标注",
      "结合流体动力学粒子系统，逼真模拟药物小分子在细胞质溶剂中的布朗运动",
    ],
  },
  "artifacts-flow-builder": {
    problemSolved:
      "非技术人员用 AI 生成了惊艳的交互网页或计算器，却因为不懂购买服务器、配置域名和部署流水线而无法分享给客户与团队使用。",
    coreFeatures: [
      "一键抓取聊天中的 React / HTML / SVG 组件，秒级打包并在边缘节点完成部署",
      "自动注入无服务器轻量持久化存储（KV Storage），让静态组件瞬间拥有记忆",
      "可视化连线编辑器：将多个独立的 Artifacts 应用像乐高积木一样组合串联",
      "自动生成支持自定义品牌域名的响应式 Web 分享页面",
    ],
  },
  "legaleagle-contract-arena": {
    problemSolved:
      "跨国并购合同极其厚重，人工审阅耗费数周时间且极易遗漏前后自相矛盾的免责小字条款，产生不可估量的诉讼风险。",
    coreFeatures: [
      "交叉审阅多份关联法律文本，绘制义务与风险拓扑责任网",
      "独家‘谈判沙盘模式’：输入己方商业底线，AI 自动生成三套梯级让步与进攻策略话术",
      "精确到自然段落的法律判例引证与风险级别高亮提示",
      "数据严密遵循本地内存即毁原则，严格符合律师职业保密特权要求",
    ],
  },
};

export function getProductDetailById(
  id: string
): HackathonProductDetail | undefined {
  const base = getProductById(id);
  if (!base) return undefined;
  const narrative = hackathonProductNarratives[id] ?? {
    problemSolved: base.summary,
    coreFeatures: [],
  };
  return {
    ...base,
    ...narrative,
  };
}
