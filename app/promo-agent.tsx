"use client";

import { useState, useRef } from "react";
import Navbar from "./components/Navbar";

/* ============================================================
 *  Mock Data — based on 宣发Agent-前端开发文档.md
 * ============================================================ */

const DRAMA_NAME = "天机匣";
const DRAMA_EPISODE = "第1集：雨夜惊变";

const PROMO_PROJECTS = [
  { project: "天机匣", cover: "/人物/1_阿离_30515.png", episodes: ["第1集：雨夜惊变", "第2集：客栈风云"] },
  { project: "剑来", cover: "/人物/2_苏沐瑶_30516.png", episodes: ["第1集：少年持剑", "第2集：剑气长城"] },
  { project: "长安十二时辰", cover: "/人物/4_燕十三_30518.png", episodes: ["第3集：暗夜追凶", "第5集：上元灯会"] },
];

/* P2 策略方案 */
const STRATEGY = {
  core_selling_points: ["雨夜开匣悬念", "师兄身份反转", "古风武侠美学", "强节奏剧情"],
  target_audience: {
    age_range: "18-35",
    gender: "女性为主（65%）",
    interests: ["古风言情", "武侠冒险", "悬疑推理", "短剧追更"],
  },
  main_angle: "以「雨夜开匣」为核心悬念钩子，主打师兄身份反转的情感冲突，吸引女性用户追更讨论。",
  platform_positioning: {
    抖音: "3秒强钩子开头，突出师兄身份悬念，结尾引导追剧",
    B站: "完整剧情解说+幕后解读，适合中长视频内容",
    小红书: "角色人设种草，古风美学氛围感图文",
    微博: "话题化标题，引导站队讨论「师兄到底是谁」",
  },
  tone: "悬疑紧张",
  expected_hooks: ["木匣里的秘密是什么？", "师兄为何背叛师门？", "师父留下的最后一句话"],
};

/* P2 资产知识图谱 */
const SPIDER_CATEGORIES: {
  id: string; label: string; color: string; icon: string;
  items: { name: string; desc: string; thumb: string; img?: string; video?: string; videoTime?: number }[];
}[] = [
  {
    id: "characters",
    label: "人物",
    color: "#f49169",
    icon: "人",
    items: [
      { name: "师兄·沈玉衡", desc: "核心角色 / 身份成谜", thumb: "沈", img: "/人物/1_阿离_30515.png" },
      { name: "柳大娘", desc: "关键NPC / 暗藏身份", thumb: "柳", img: "/人物/3_柳大娘_30517.png" },
      { name: "师父", desc: "线索人物 / 遗留木匣", thumb: "师", img: "/人物/7_师父_30521.png" },
      { name: "掌柜·老赵", desc: "配角 / 消息灵通", thumb: "赵", img: "/人物/2_老周头_30516.png" },
      { name: "神秘剑客", desc: "伏笔角色 / 身份未知", thumb: "剑", img: "/人物/5_黑袍人_30519.png" },
    ],
  },
  {
    id: "props",
    label: "道具",
    color: "#f4be79",
    icon: "物",
    items: [
      { name: "神秘木匣", desc: "核心道具 / 全剧线索", thumb: "匣", img: "/道具/天机匣_道具资产_木匣_30549.png" },
      { name: "青铜面具", desc: "线索道具 / 身份凭证", thumb: "面", img: "/道具/天机匣_道具资产_青铜面具_30557.png" },
      { name: "短剑", desc: "关键道具 / 解谜钥匙", thumb: "剑", img: "/道具/天机匣_道具资产_短剑_30553.png" },
    ],
  },
  {
    id: "scenes",
    label: "场景",
    color: "#e8a87c",
    icon: "景",
    items: [
      { name: "客栈大堂", desc: "主场景 / 多线交汇", thumb: "客", img: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png" },
      { name: "竹林小径", desc: "开场场景 / 悬念起点", thumb: "竹", img: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png" },
      { name: "江南驿道", desc: "转折场景 / 追踪线索", thumb: "驿", img: "/场景/天机匣_场景资产_江南古道驿道_外景(全景)_30531.png" },
    ],
  },
  {
    id: "episodes",
    label: "其他剧集",
    color: "#d4a26a",
    icon: "剧",
    items: [
      { name: "第1集·雨夜惊变", desc: "师父遗留木匣，师兄身份成谜", thumb: "1", img: "", video: "/视频/第1集-1-189033-天机匣-多图-user_15170076640.mp4", videoTime: 2 },
      { name: "第1集·客栈风云", desc: "柳大娘身份揭露", thumb: "2", img: "", video: "/视频/第1集-2-189058-天机匣-多图-user_15170076640.mp4", videoTime: 2 },
      { name: "第3集·雨巷追踪", desc: "木匣线索追踪", thumb: "3", img: "", video: "/视频/combined-video-1783406098199.mp4", videoTime: 3 },
    ],
  },
  {
    id: "assets",
    label: "资产",
    color: "#c9b07a",
    icon: "材",
    items: [
      { name: "雨夜开匣镜头", desc: "高光镜头 / 情绪爆点", thumb: "雨", img: "", video: "/视频/第1集-1-189033-天机匣-多图-user_15170076640.mp4", videoTime: 4 },
      { name: "师兄回眸镜头", desc: "CP糖点 / 角色高光", thumb: "回", img: "", video: "/视频/combined-video-1783406098199.mp4", videoTime: 1 },
      { name: "客栈对峙片段", desc: "高光冲突 / 戏剧张力", thumb: "峙", img: "", video: "/视频/第1集-2-189058-天机匣-多图-user_15170076640.mp4", videoTime: 1 },
    ],
  },
];

/* P2 资产预览 */
const ASSET_EPISODES = [
  { ep: 1, title: "雨夜惊变", highlights: "师父遗留木匣，师兄身份成谜" },
  { ep: 2, title: "客栈风云", highlights: "柳大娘身份揭露，暗流涌动" },
  { ep: 3, title: "雨巷追踪", highlights: "木匣线索追踪，江湖令牌现身" },
  { ep: 4, title: "真相之门", highlights: "木匣初现端倪，敌人步步紧逼" },
  { ep: 5, title: "师兄归来", highlights: "师兄真实身份揭晓" },
  { ep: 6, title: "决战之夜", highlights: "终极对决，木匣之谜解开" },
];

const EMOTION_CURVE = [
  { ep: 1, score: 45 },
  { ep: 2, score: 62 },
  { ep: 3, score: 58 },
  { ep: 4, score: 75 },
  { ep: 5, score: 92 },
  { ep: 6, score: 88 },
];

/* P3 选题选段 */
const SEGMENT_TYPES: Record<string, string> = {
  "情绪爆点": "#f5222d",
  "高光冲突": "#fa8c16",
  "CP糖点": "#eb2f96",
  "悬念钩子": "#722ed1",
  "金句台词": "#1677ff",
};

const SEGMENTS = [
  { id: "s1", ep: 1, time: "05:23-07:15", type: "情绪爆点", reason: "师兄雨中回眸，情绪爆发张力极强", score: 95, platforms: ["抖音", "小红书"] },
  { id: "s2", ep: 1, time: "12:40-13:55", type: "悬念钩子", reason: "木匣被打开瞬间，悬念拉满", score: 92, platforms: ["抖音", "微博"] },
  { id: "s3", ep: 1, time: "18:02-19:30", type: "高光冲突", reason: "客栈对峙戏，角色冲突高潮", score: 88, platforms: ["B站", "快手"] },
  { id: "s4", ep: 1, time: "22:15-23:48", type: "CP糖点", reason: "师兄与师弟的羁绊暗示", score: 85, platforms: ["小红书", "微博"] },
  { id: "s5", ep: 1, time: "08:30-09:50", type: "金句台词", reason: "师父遗言：江湖路远，木匣有灵", score: 82, platforms: ["B站", "微博"] },
  { id: "s6", ep: 1, time: "15:00-16:20", type: "情绪爆点", reason: "柳大娘身份揭露，全场反转", score: 90, platforms: ["抖音", "快手"] },
];

/* P4 渠道配置 */
const CHANNELS = [
  { id: "wechat", name: "微信公众号", type: "长图文" },
  { id: "douyin", name: "抖音", type: "短视频成片" },
  { id: "bilibili", name: "B站", type: "中长视频成片" },
  { id: "kuaishou", name: "快手", type: "短视频成片" },
  { id: "xiaohongshu", name: "小红书", type: "图文笔记" },
];

const CHANNEL_ICONS: Record<string, string> = {
  douyin: "/icons/douyin.svg",
  bilibili: "/icons/bilibili.svg",
  kuaishou: "/icons/kuaishou.svg",
  xiaohongshu: "/icons/xiaohongshu.svg",
  wechat: "/icons/wechat.svg",
};

const GOALS = [
  { id: "acquisition", label: "拉新引流", desc: "提升点击与进站追剧" },
  { id: "exposure", label: "品牌曝光", desc: "扩大IP知名度" },
  { id: "buzz", label: "话题造势", desc: "制造讨论与热搜" },
  { id: "conversion", label: "转化付费", desc: "推动充值与追更" },
  { id: "retention", label: "粉丝维护", desc: "增强粉丝粘性" },
];

const TONES = ["正式", "轻松幽默", "悬疑紧张", "甜宠治愈", "热血燃向"];
const LENGTHS = ["精简", "标准", "详细"];

/* P5 生成结果 */
const GEN_CONTENT: Record<string, { text: string; hasVideo: boolean; images?: string[] }> = {
  抖音: { text: "雨夜木匣被打开的那一刻，师兄的真实身份再也藏不住了…🤯\n\n#天机匣 #古风短剧 #师兄身份 #雨夜开匣 #追剧推荐", hasVideo: true },
  B站: { text: "【天机匣】第1集深度解说：师父遗留的神秘木匣，到底藏着什么秘密？从雨夜开匣到师兄回眸，带你看懂这部古风武侠短剧的精彩开局。", hasVideo: true },
  小红书: { text: "姐妹们！这部剧也太上头了吧😭\n古风美学天花板，师兄真的帅到窒息\n雨夜开匣那一幕我反复看了十遍\n\n#天机匣 #古风短剧 #追剧日常 #师兄", hasVideo: false, images: ["/人物/1_阿离_30515.png", "/人物/3_柳大娘_30517.png", "/人物/5_黑袍人_30519.png"] },
  微博: { text: "如果你是女主，你会相信师兄还是柳大娘？\n\n#天机匣# #师兄到底是谁# 加入讨论👇", hasVideo: false },
  快手: { text: "古风武侠天花板来了！天机匣第1集高能混剪🔥\n\n#天机匣 #短剧推荐 #古风", hasVideo: true },
  微信公众号: { text: "《天机匣》雨夜惊变：一只神秘木匣，牵出整个江湖的旧账。本文带你深度解析这部古风武侠短剧的核心卖点与追剧指南。", hasVideo: false },
};

/* Channel → video file mapping for completed cards */
const GEN_VIDEOS: Record<string, { src: string; time: number; ratio: string }> = {
  抖音: { src: "/视频/第1集-1-189033-天机匣-多图-user_15170076640.mp4", time: 2, ratio: "9:16" },
  B站: { src: "/视频/combined-video-1783406098199.mp4", time: 3, ratio: "16:9" },
  快手: { src: "/视频/第1集-2-189058-天机匣-多图-user_15170076640.mp4", time: 1, ratio: "9:16" },
};

/* P6 审核数据 */
const AUDIT = {
  compliance: { status: "passed", label: "合规审核" },
  brand: { status: "warning", label: "品牌审核" },
  quality: { status: "passed", score: 85, label: "质量审核" },
} as const;

const AUDIT_DETAILS = [
  { channel: "抖音", status: "passed", layer: "合规", issue: "—", suggestion: "—" },
  { channel: "B站", status: "warning", layer: "品牌", issue: "品牌logo缺失", suggestion: "建议在片尾补充官方logo" },
  { channel: "小红书", status: "passed", layer: "合规", issue: "—", suggestion: "—" },
  { channel: "微博", status: "passed", layer: "质量", issue: "—", suggestion: "—" },
  { channel: "快手", status: "passed", layer: "合规", issue: "—", suggestion: "—" },
] as const;

/* Per-channel audit summary (compliance / quality) */
const CHANNEL_AUDIT: Record<string, { compliance: "passed" | "warning" | "failed"; quality: number; issues: { layer: string; status: string; issue: string }[] }> = {
  抖音: { compliance: "passed", quality: 92, issues: [{ layer: "合规检测", status: "passed", issue: "未发现风险" }] },
  B站: { compliance: "warning", quality: 88, issues: [{ layer: "合规检测", status: "passed", issue: "未发现风险" }, { layer: "品牌检测", status: "warning", issue: "品牌logo缺失" }] },
  小红书: { compliance: "passed", quality: 90, issues: [{ layer: "合规检测", status: "passed", issue: "未发现风险" }] },
  快手: { compliance: "passed", quality: 87, issues: [{ layer: "合规检测", status: "passed", issue: "未发现风险" }] },
  微信公众号: { compliance: "passed", quality: 86, issues: [{ layer: "合规检测", status: "passed", issue: "未发现风险" }] },
};

/* P7 发布数据 */
const PUBLISH_RECORDS = [
  { channel: "抖音", title: "天机匣第1集·雨夜开匣悬念cut", status: "auditing", message: "预计30分钟内审核完成" },
  { channel: "B站", title: "天机匣第1集深度解说", status: "published", message: "发布成功" },
  { channel: "小红书", title: "姐妹们！天机匣也太上头了吧", status: "published", message: "发布成功" },
  { channel: "微博", title: "师兄到底是谁？", status: "failed", message: "接口超时" },
  { channel: "快手", title: "古风武侠天花板来了", status: "auditing", message: "预计20分钟内审核完成" },
] as const;

/* Strategy AI models */
const PROMO_MODELS = ["DeepSeek-R1", "Qwen-Max", "Claude-3.5-Sonnet", "GPT-4o"];

const STEPS = [
  { id: "select", label: "选剧", desc: "确定宣发对象" },
  { id: "strategy", label: "策略", desc: "AI策略方案" },
  { id: "channels", label: "渠道", desc: "渠道与目标" },
  { id: "generate", label: "生成", desc: "生成与自动审核" },
  { id: "publish", label: "发布", desc: "发布看板" },
];

type StepId = (typeof STEPS)[number]["id"];

/* Per-channel generation steps */
const getChannelFlow = (chName: string, chType: string) => {
  const hasVideo = chType.includes("视频");
  const steps = [
    { icon: "✍️", title: `调用 DeepSeek-R1 生成${chName}文案`, detail: `基于策略方案，为${chName}生成${chType}，匹配悬疑钩子调性`, duration: 1200 },
    { icon: "🎨", title: "调用 AI 绘图模型配图", detail: `提取《天机匣》人物、场景资产，为${chName}生成配套封面图`, duration: 1000 },
  ];
  if (hasVideo) {
    steps.push({ icon: "🎬", title: "调用视频合成引擎", detail: `将高光镜头片段与文案匹配，渲染${chName}成片`, duration: 1400 });
  }
  steps.push(
    { icon: "🛡️", title: "调用自动审核 · 合规检测", detail: "扫描敏感词、违禁内容 — 未发现风险，通过✓", duration: 800 },
    { icon: "🛡️", title: "调用自动审核 · 质量评分", detail: "多维度质量打分：文案/视觉/整体 — 通过✓", duration: 800 },
  );
  return steps;
};

/* ============================================================
 *  Main Component
 * ============================================================ */

export default function PromoAgentPage({
  project,
  episode,
  initialStep,
  onBack,
  onHome,
  onAssetLibrary,
  onAssetLayer,
}: {
  project?: string;
  episode?: string;
  initialStep?: StepId;
  onBack?: () => void;
  onHome?: () => void;
  onAssetLibrary?: () => void;
  onAssetLayer?: (key: string) => void;
}) {
  const dramaName = project || DRAMA_NAME;
  const dramaEp = episode || DRAMA_EPISODE;

  const [step, setStep] = useState<StepId>(initialStep || "strategy");
  const [localProject, setLocalProject] = useState(project || "");
  const [localEpisode, setLocalEpisode] = useState(episode || "");
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set(["douyin", "bilibili", "xiaohongshu"]));
  const [goal, setGoal] = useState("buzz");
  const [tone, setTone] = useState("悬疑紧张");
  const [length, setLength] = useState("标准");
  const [constraints, setConstraints] = useState("");
  const [selectedSegs, setSelectedSegs] = useState<Set<string>>(new Set(["s1", "s2", "s6"]));
  const [segFilter, setSegFilter] = useState("全部");
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genDone, setGenDone] = useState(false);
  const [genChannelIdx, setGenChannelIdx] = useState(-1);
  const [genStepIdx, setGenStepIdx] = useState(-1);
  const [genCompleted, setGenCompleted] = useState<Set<number>>(new Set());
  const [genCurrentStep, setGenCurrentStep] = useState<{ icon: string; title: string; detail: string } | null>(null);
  const [genJustDone, setGenJustDone] = useState<number | null>(null);
  const [genModalOpen, setGenModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishChannels, setPublishChannels] = useState<Set<string>>(new Set());
  const [publishDone, setPublishDone] = useState(false);
  const [publishResults, setPublishResults] = useState<{ channel: string; status: "published"; message: string }[]>([]);
  const [activeTab, setActiveTab] = useState("全部");
  const [spiderDetail, setSpiderDetail] = useState<string | null>(null);
  const [strategyEditing, setStrategyEditing] = useState(false);
  const [promoModel, setPromoModel] = useState("DeepSeek-R1");
  const [promoModelOpen, setPromoModelOpen] = useState(false);
  const [graphZoom, setGraphZoom] = useState(1);
  const [graphPan, setGraphPan] = useState({ x: 0, y: 0 });
  const graphDragRef = useRef<{ dragging: boolean; startX: number; startY: number; baseX: number; baseY: number }>({ dragging: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });
  const [graphFullscreen, setGraphFullscreen] = useState(false);
  const [fsZoom, setFsZoom] = useState(1);
  const [fsPan, setFsPan] = useState({ x: 0, y: 0 });
  const fsDragRef = useRef<{ dragging: boolean; startX: number; startY: number; baseX: number; baseY: number }>({ dragging: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });
  const [fsPreview, setFsPreview] = useState<{ name: string; img?: string; video?: string; videoTime?: number; catColor: string; catLabel: string; desc: string } | null>(null);

  /* Radial graph geometry */
  const SPIDER_ANGLES = [-90, -18, 54, 126, 198];
  const polar = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
  };
  const childAngle = (catIdx: number, itemIdx: number, total: number) => {
    const spread = Math.min(total * 13, 56);
    return SPIDER_ANGLES[catIdx] - spread / 2 + (total > 1 ? (spread * itemIdx) / (total - 1) : 0);
  };

  /* Graph zoom/pan handlers */
  const handleGraphWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setGraphZoom((z) => Math.min(3, Math.max(0.5, +(z + delta).toFixed(2))));
  };
  const handleGraphMouseDown = (e: React.MouseEvent) => {
    graphDragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, baseX: graphPan.x, baseY: graphPan.y };
  };
  const handleGraphMouseMove = (e: React.MouseEvent) => {
    if (!graphDragRef.current.dragging) return;
    setGraphPan({
      x: graphDragRef.current.baseX + (e.clientX - graphDragRef.current.startX),
      y: graphDragRef.current.baseY + (e.clientY - graphDragRef.current.startY),
    });
  };
  const handleGraphMouseUp = () => { graphDragRef.current.dragging = false; };
  const handleGraphZoomBtn = (dir: number) => {
    setGraphZoom((z) => Math.min(3, Math.max(0.5, +(z + dir * 0.2).toFixed(2))));
  };
  const handleGraphReset = () => { setGraphZoom(1); setGraphPan({ x: 0, y: 0 }); };

  /* Fullscreen modal zoom/pan handlers */
  const handleFsWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setFsZoom((z) => Math.min(5, Math.max(0.3, +(z + delta).toFixed(2))));
  };
  const handleFsMouseDown = (e: React.MouseEvent) => {
    fsDragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, baseX: fsPan.x, baseY: fsPan.y };
  };
  const handleFsMouseMove = (e: React.MouseEvent) => {
    if (!fsDragRef.current.dragging) return;
    setFsPan({
      x: fsDragRef.current.baseX + (e.clientX - fsDragRef.current.startX),
      y: fsDragRef.current.baseY + (e.clientY - fsDragRef.current.startY),
    });
  };
  const handleFsMouseUp = () => { fsDragRef.current.dragging = false; };
  const handleFsZoomBtn = (dir: number) => {
    setFsZoom((z) => Math.min(5, Math.max(0.3, +(z + dir * 0.3).toFixed(2))));
  };
  const handleFsReset = () => { setFsZoom(1); setFsPan({ x: 0, y: 0 }); };
  const openGraphFullscreen = () => { setGraphFullscreen(true); setFsZoom(1); setFsPan({ x: 0, y: 0 }); };

  const activeStepIdx = STEPS.findIndex((s) => s.id === step);
  const selectedChannelList = CHANNELS.filter((c) => selectedChannels.has(c.id));

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSeg = (id: string) => {
    setSelectedSegs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredSegs = segFilter === "全部" ? SEGMENTS : SEGMENTS.filter((s) => s.type === segFilter);

  const handleGenerate = () => {
    setGenerating(true);
    setGenDone(false);
    setGenProgress(0);
    setGenChannelIdx(-1);
    setGenStepIdx(-1);
    setGenCompleted(new Set());
    setGenCurrentStep(null);
    setGenJustDone(null);

    const channels = CHANNELS.filter((c) => selectedChannels.has(c.id));
    let chIdx = 0;
    let totalSteps = channels.reduce((sum, ch) => sum + getChannelFlow(ch.name, ch.type).length, 0);
    let doneSteps = 0;

    const runChannel = () => {
      if (chIdx >= channels.length) {
        setGenerating(false);
        setGenDone(true);
        setGenProgress(100);
        setGenChannelIdx(-1);
        setGenCurrentStep(null);
        setTimeout(() => {
          setGenModalOpen(false);
          setStep("generate");
        }, 800);
        return;
      }
      const ch = channels[chIdx];
      const steps = getChannelFlow(ch.name, ch.type);
      let sIdx = 0;
      setGenChannelIdx(chIdx);

      const runStep = () => {
        if (sIdx >= steps.length) {
          setGenCompleted((prev) => new Set(prev).add(chIdx));
          setGenCurrentStep(null);
          setGenJustDone(chIdx);
          chIdx++;
          setTimeout(() => { setGenJustDone(null); runChannel(); }, 1000);
          return;
        }
        setGenStepIdx(sIdx);
        setGenCurrentStep(steps[sIdx]);
        doneSteps++;
        setGenProgress(Math.round((doneSteps / totalSteps) * 100));
        const duration = steps[sIdx].duration;
        sIdx++;
        setTimeout(runStep, duration);
      };
      setTimeout(runStep, 300);
    };
    setTimeout(runChannel, 300);
  };

  /* Publish flow */
  const openPublishModal = () => {
    setPublishChannels(new Set(selectedChannelList.map((ch) => ch.id)));
    setPublishModalOpen(true);
  };
  const togglePublishChannel = (chId: string) => {
    setPublishChannels((prev) => {
      const next = new Set(prev);
      if (next.has(chId)) next.delete(chId); else next.add(chId);
      return next;
    });
  };
  const confirmPublish = () => {
    const channels = selectedChannelList.filter((ch) => publishChannels.has(ch.id));
    setPublishModalOpen(false);
    setPublishDone(false);
    setPublishResults([]);
    setStep("publish");
    /* Simulate sequential publish */
    let idx = 0;
    const publishNext = () => {
      if (idx >= channels.length) {
        setPublishDone(true);
        return;
      }
      const ch = channels[idx];
      setPublishResults((prev) => [...prev, { channel: ch.name, status: "published", message: "发布成功" }]);
      idx++;
      setTimeout(publishNext, 800);
    };
    setTimeout(publishNext, 500);
  };

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  };
  const goPrev = () => {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx > 0) setStep(STEPS[idx - 1].id);
  };

  const nextBtnLabel = () => {
    const labels: Record<string, string> = {
      select: "下一步",
      strategy: "确认策略，选择渠道",
      channels: "开始生成内容",
      generate: "去发布",
      publish: "完成",
    };
    return labels[step] || "下一步";
  };

  return (
    <div className="page">
      <div className="bg-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg-image" src="/bg.png" alt="" />
        <div className="bg-overlay" />
      </div>

      <Navbar onHome={onHome} onAssetLibrary={onAssetLibrary} onAssetLayer={onAssetLayer} activeNav="agent" />

      <div className="promo-page">
        {/* Breadcrumb */}
        <div className="promo-breadcrumb">
          <span className="promo-crumb" onClick={onHome}>首页</span>
          <span className="promo-crumb-sep">/</span>
          <span className="promo-crumb" onClick={onBack}>宣发 Agent</span>
          <span className="promo-crumb-sep">/</span>
          <span className="promo-crumb-current">{STEPS[activeStepIdx]?.label}</span>
        </div>

        {/* Stepper + Project info — same row */}
        <div className="promo-topbar">
          {/* StepBar */}
          <div className="promo-stepper promo-stepper-5">
            {STEPS.map((item, index) => (
              <button
                key={item.id}
                className={`promo-step ${step === item.id ? "active" : ""} ${index < activeStepIdx ? "done" : ""}`}
                onClick={() => setStep(item.id)}
              >
                <span>{index + 1}</span>
                <strong>{item.label}</strong>
                <em>{item.desc}</em>
              </button>
            ))}
          </div>

          {/* Project info */}
          <div className="promo-workbench-summary">
            <span>《{dramaName}》</span>
            <strong>{dramaEp}</strong>
            <em>已选 {selectedChannels.size} 个渠道</em>
          </div>
        </div>

        {/* ============ P1 选剧 ============ */}
        {step === "select" && (
          <div className="promo-panel-card">
            <div className="promo-select-grid">
              {PROMO_PROJECTS.map((p) => {
                const isSelected = localProject === p.project;
                const showEpisodes = isSelected;
                return (
                  <div
                    key={p.project}
                    className={`promo-select-card ${isSelected ? "selected" : ""}`}
                    onClick={() => { setLocalProject(p.project); setLocalEpisode(""); }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="promo-select-cover" src={p.cover} alt={p.project} draggable={false} />
                    <div className="promo-select-card-info">
                      <strong>《{p.project}》</strong>
                      <span>{p.episodes.length} 集</span>
                    </div>
                    {isSelected && (
                      <div className="promo-select-eps" onClick={(e) => e.stopPropagation()}>
                        {p.episodes.map((ep) => (
                          <button
                            key={ep}
                            className={`promo-select-ep-btn ${localEpisode === ep ? "active" : ""}`}
                            onClick={() => setLocalEpisode(ep)}
                          >{ep}</button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="promo-nav-bar promo-nav-bar-fixed">
              <button
                className="promo-nav-btn promo-nav-primary"
                onClick={goNext}
                disabled={!localProject || !localEpisode}
              >下一步</button>
            </div>
          </div>
        )}

        {/* ============ P2 策略方案 ============ */}
        {step === "strategy" && (
          <div className="promo-strategy-layout">
            {/* Left 60% — Strategy Card */}
            <div className="promo-strategy-left">
              <div className="promo-section">
                <div className="promo-section-title">
                  策略方案
                  <button
                    className={`promo-edit-icon-btn ${strategyEditing ? "active" : ""}`}
                    onClick={() => setStrategyEditing(!strategyEditing)}
                    title="手动编辑"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {strategyEditing && <span>编辑中</span>}
                  </button>
                </div>
                <div className="promo-strat-body">
                  <div className="promo-strat-block">
                    <span className="promo-strat-label">核心卖点</span>
                    <div className="promo-strat-tags">
                      {STRATEGY.core_selling_points.map((tag) => (
                        <span key={tag} className="promo-strat-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="promo-strat-block">
                    <span className="promo-strat-label">受众画像</span>
                    <div className="promo-strat-audience">
                      <span>{STRATEGY.target_audience.age_range}岁</span>
                      <span>{STRATEGY.target_audience.gender}</span>
                      <span>{STRATEGY.target_audience.interests.join(" · ")}</span>
                    </div>
                  </div>
                  <div className="promo-strat-block">
                    <span className="promo-strat-label">主宣发角度</span>
                    <p className="promo-strat-text">{STRATEGY.main_angle}</p>
                  </div>
                  <div className="promo-strat-block">
                    <span className="promo-strat-label">调性 / 预期钩子</span>
                    <div className="promo-strat-misc">
                      <span className="promo-strat-tag">{STRATEGY.tone}</span>
                      {STRATEGY.expected_hooks.map((hook) => (
                        <span key={hook} className="promo-strat-hook">{hook}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Bottom-left: model selector + regenerate */}
                <div className="promo-strat-footer">
                  <div className="model-selector-group">
                    <span className="model-label">{promoModel === "DeepSeek-R1" ? "智能推荐" : "自定义"}</span>
                    <span className="model-divider">|</span>
                    <div className="model-dropdown">
                      <button className="model-dropdown-trigger" onClick={() => setPromoModelOpen(!promoModelOpen)}>
                        {promoModel}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {promoModelOpen && (
                        <div className="model-dropdown-menu">
                          {PROMO_MODELS.map((m) => (
                            <div
                              key={m}
                              className={`model-dropdown-item ${promoModel === m ? "selected" : ""}`}
                              onClick={() => { setPromoModel(m); setPromoModelOpen(false); }}
                            >
                              {m}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="promo-regen-btn">重新生成</button>
                </div>
              </div>
            </div>

            {/* Right 40% — Asset Knowledge Graph */}
            <div className="promo-strategy-right">
              <div className="promo-section promo-spider-section">
                <div className="promo-section-title">
                  资产图谱
                  <button className="promo-spider-fs-btn" onClick={openGraphFullscreen} title="全屏查看">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="promo-spider-canvas">
                <div className="promo-spider-viewport">
                <div className="promo-spider">
                  {/* SVG connection lines */}
                  <svg className="promo-spider-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Center → categories */}
                    {SPIDER_CATEGORIES.map((cat, i) => {
                      const pos = polar(SPIDER_ANGLES[i], 20);
                      return (
                        <line key={cat.id} x1="50" y1="50" x2={pos.x} y2={pos.y}
                          stroke={cat.color} strokeWidth={0.3} strokeOpacity={0.4} />
                      );
                    })}
                    {/* Categories → children (all visible) */}
                    {SPIDER_CATEGORIES.map((cat, ci) =>
                      cat.items.map((item, ii) => {
                        const catPos = polar(SPIDER_ANGLES[ci], 20);
                        const chPos = polar(childAngle(ci, ii, cat.items.length), 40);
                        return (
                          <line key={item.name} x1={catPos.x} y1={catPos.y} x2={chPos.x} y2={chPos.y}
                            stroke={cat.color} strokeWidth={0.25} strokeOpacity={0.3} strokeDasharray="0.6,0.5" />
                        );
                      })
                    )}
                  </svg>

                  {/* Center node */}
                  <div className="promo-spider-center">
                    <span className="promo-spider-center-name">《{dramaName}》</span>
                    <span className="promo-spider-center-sub">{dramaEp}</span>
                  </div>

                  {/* Category nodes */}
                  {SPIDER_CATEGORIES.map((cat, i) => {
                    const pos = polar(SPIDER_ANGLES[i], 20);
                    return (
                      <div key={cat.id}
                        className="promo-spider-cat"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%`, "--cat-color": cat.color } as React.CSSProperties}
                      >
                        <span className="promo-spider-cat-icon" style={{ background: `${cat.color}22`, color: cat.color }}>{cat.icon}</span>
                        <strong>{cat.label}</strong>
                        <em className="promo-spider-cat-count" style={{ color: cat.color }}>{cat.items.length}</em>
                      </div>
                    );
                  })}

                  {/* All child nodes (always visible) */}
                  {SPIDER_CATEGORIES.map((cat, ci) =>
                    cat.items.map((item, ii) => {
                      const chPos = polar(childAngle(ci, ii, cat.items.length), 40);
                      const isDetail = spiderDetail === item.name;
                      return (
                        <div key={item.name}
                          className={`promo-spider-child ${isDetail ? "active" : ""}`}
                          style={{ left: `${chPos.x}%`, top: `${chPos.y}%`, "--cat-color": cat.color } as React.CSSProperties}
                          onClick={() => setSpiderDetail(isDetail ? null : item.name)}
                        >
                          {item.img ? (
                            <img className="promo-spider-child-img" src={item.img} alt={item.name} draggable={false} />
                          ) : item.video ? (
                            <video className="promo-spider-child-img promo-spider-child-video" src={`${item.video}#t=${item.videoTime || 1}`} muted playsInline preload="metadata" />
                          ) : (
                            <span className="promo-spider-child-thumb" style={{ background: `${cat.color}22`, color: cat.color }}>{item.thumb}</span>
                          )}
                          <strong>{item.name}</strong>
                        </div>
                      );
                    })
                  )}
                </div>
                </div>
                </div>

                {/* Detail card */}
                {spiderDetail && (() => {
                  const item = SPIDER_CATEGORIES.flatMap((c) => c.items).find((it) => it.name === spiderDetail);
                  const cat = SPIDER_CATEGORIES.find((c) => c.items.some((it) => it.name === spiderDetail));
                  if (!item || !cat) return null;
                  return (
                    <div className="promo-spider-detail">
                      <span className="promo-spider-detail-tag" style={{ background: `${cat.color}22`, color: cat.color }}>{cat.label}</span>
                      <strong>{item.name}</strong>
                      <p>{item.desc}</p>
                      <button onClick={() => setSpiderDetail(null)}>关闭</button>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="promo-nav-bar promo-nav-bar-fixed promo-nav-strategy">
              <button className="start-btn promo-nav-arrow" onClick={goNext}>
                确认策略，选择渠道
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ============ P3 渠道配置 ============ */}
        {step === "channels" && (
          <div className="promo-channels-layout">
            {/* Channel Selector */}
            <div className="promo-section">
              <div className="promo-section-title">渠道选择</div>
              <div className="promo-ch-list">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    className={`promo-ch-item ${selectedChannels.has(ch.id) ? "active" : ""}`}
                    onClick={() => toggleChannel(ch.id)}
                  >
                    <div className="promo-ch-item-info">
                      <strong>{ch.name}</strong>
                      <span>{ch.type}</span>
                    </div>
                    {selectedChannels.has(ch.id) && <span className="promo-ch-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selector */}
            <div className="promo-section">
              <div className="promo-section-title">宣发目标</div>
              <div className="promo-goal-list">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    className={`promo-goal-radio ${goal === g.id ? "active" : ""}`}
                    onClick={() => setGoal(g.id)}
                  >
                    <strong>{g.label}</strong>
                    <span>{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Config */}
            <div className="promo-section">
              <div className="promo-section-title">风格配置</div>
              <div className="promo-style-config">
                <div className="promo-style-field">
                  <label>语气风格</label>
                  <div className="promo-chips">
                    {TONES.map((t) => (
                      <button key={t} className={`promo-chip ${tone === t ? "active" : ""}`} onClick={() => setTone(t)}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="promo-style-field">
                  <label>文案长度</label>
                  <div className="promo-chips">
                    {LENGTHS.map((l) => (
                      <button key={l} className={`promo-chip ${length === l ? "active" : ""}`} onClick={() => setLength(l)}>{l}</button>
                    ))}
                  </div>
                </div>
                <div className="promo-style-field">
                  <label>自定义约束</label>
                  <textarea
                    className="promo-textarea"
                    placeholder="输入禁用词、必须包含的关键词、品牌 slogan 等，每行一个"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="promo-nav-bar promo-nav-bar-fixed promo-nav-strategy">
              <div className="promo-strat-footer-inline">
                <div className="model-selector-group">
                  <span className="model-label">{promoModel === "DeepSeek-R1" ? "智能推荐" : "自定义"}</span>
                  <span className="model-divider">|</span>
                  <div className="model-dropdown">
                    <button className="model-dropdown-trigger" onClick={() => setPromoModelOpen(!promoModelOpen)}>
                      {promoModel}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {promoModelOpen && (
                      <div className="model-dropdown-menu">
                        {PROMO_MODELS.map((m) => (
                          <div
                            key={m}
                            className={`model-dropdown-item ${promoModel === m ? "selected" : ""}`}
                            onClick={() => { setPromoModel(m); setPromoModelOpen(false); }}
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button className="start-btn promo-nav-arrow" onClick={() => { setGenModalOpen(true); handleGenerate(); }}>
                开始生成内容
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ============ P5 生成中心 ============ */}
        {step === "generate" && (
          <div className="promo-gen-wrap">
            {/* Per-channel generation cards */}
            <div className="promo-gen-results">
              {selectedChannelList.map((ch, chIdx) => {
                const isCompleted = genCompleted.has(chIdx) || genDone;
                const isJustDone = genJustDone === chIdx;
                const isProcessing = genChannelIdx === chIdx && generating;
                const isWaiting = genChannelIdx >= 0 && chIdx > genChannelIdx && !genDone;
                const isPending = genChannelIdx < 0 && !genDone;
                const content = GEN_CONTENT[ch.name] || { text: "内容生成中...", hasVideo: false };
                const videoInfo = GEN_VIDEOS[ch.name];

                return (
                  <div key={ch.id} className={`promo-gen-card ${isProcessing ? "processing" : ""} ${isCompleted ? "done" : ""} ${isJustDone ? "just-done" : ""}`}>
                    <div className="promo-gen-card-header">
                      <div className="promo-gen-card-title">
                        <span className="promo-gen-card-num">{chIdx + 1}</span>
                        <strong>{ch.name}</strong>
                        <em>{ch.type}</em>
                      </div>
                      {isProcessing && <span className="promo-gen-card-badge active">生成中</span>}
                      {(isWaiting || isPending) && <span className="promo-gen-card-badge waiting">等待中</span>}
                    </div>

                    {/* Just-done flash animation */}
                    {isJustDone && (
                      <div className="promo-gen-flash">
                        <div className="promo-gen-flash-inner">
                          <span className="promo-gen-flash-check">✓</span>
                          <strong>{ch.name} 生成完成</strong>
                          <span className="promo-gen-flash-sub">自动审核通过</span>
                        </div>
                      </div>
                    )}

                    {isProcessing && genCurrentStep && (
                      <div className="promo-gen-step-active" key={`${genChannelIdx}-${genStepIdx}`}>
                        <span className="promo-gen-step-icon">{genCurrentStep.icon}</span>
                        <div className="promo-gen-step-body">
                          <strong>{genCurrentStep.title}</strong>
                          <p>{genCurrentStep.detail}</p>
                          <div className="promo-gen-step-loading">
                            <span className="promo-gen-spinner" />
                            处理中...
                          </div>
                        </div>
                      </div>
                    )}

                    {(isWaiting || isPending) && (
                      <div className="promo-gen-step-placeholder">
                        <span>等待生成...</span>
                      </div>
                    )}

                    {isCompleted && !isJustDone && (
                      <>
                        <div className="promo-gen-card-text">
                          <label>文案内容</label>
                          <textarea defaultValue={content.text} rows={content.hasVideo ? 4 : 5} />
                        </div>
                        {content.hasVideo && videoInfo && (
                          <div className="promo-gen-card-video">
                            <div className={`promo-gen-video-frame ${videoInfo.ratio === "9:16" ? "vertical" : "horizontal"}`}>
                              <video
                                className="promo-gen-video-clip"
                                src={`${videoInfo.src}#t=${videoInfo.time}`}
                                muted
                                loop
                                autoPlay
                                playsInline
                                preload="metadata"
                              />
                              <div className="promo-gen-video-overlay">
                                <span>▶</span>
                              </div>
                            </div>
                            <div className="promo-gen-video-meta">
                              <span>视频成片</span>
                              <em>{videoInfo.ratio}</em>
                            </div>
                          </div>
                        )}
                        {content.images && content.images.length > 0 && (
                          <div className="promo-gen-card-images">
                            <label>AI 配图</label>
                            <div className="promo-gen-images-grid">
                              {content.images.map((img, i) => (
                                <div key={i} className="promo-gen-image-item">
                                  <img src={img} alt={`配图${i + 1}`} draggable={false} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Inline audit results — all passed */}
                        <div className="promo-gen-card-audit">
                          <div className="promo-gen-audit-tags">
                            <span className="promo-gen-audit-tag passed">✓ 合规审核</span>
                            <span className="promo-gen-audit-tag passed">✓ 品牌安全</span>
                            <span className="promo-gen-audit-tag passed">✓ 质量评分</span>
                          </div>
                        </div>
                        <div className="promo-gen-card-actions">
                          <button className="promo-result-edit-btn">重新生成</button>
                          <button className="promo-result-edit-btn">下载</button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="promo-nav-bar promo-nav-bar-fixed promo-nav-strategy">
              <button className="start-btn promo-nav-arrow" onClick={openPublishModal} disabled={!genDone}>
                去发布
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ============ P5 发布看板 ============ */}
        {step === "publish" && (
          <div className="promo-publish-wrap">
            <div className="promo-section">
              <div className="promo-section-title">发布结果</div>
              <div className="promo-publish-results">
                {selectedChannelList.filter((ch) => publishChannels.has(ch.id)).map((ch) => {
                  const result = publishResults.find((r) => r.channel === ch.name);
                  const isPublished = !!result;
                  const content = GEN_CONTENT[ch.name];
                  const videoInfo = GEN_VIDEOS[ch.name];
                  return (
                    <div key={ch.id} className={`promo-pub-card ${isPublished ? "published" : "pending"}`}>
                      <div className="promo-pub-card-icon">
                        {CHANNEL_ICONS[ch.id] ? (
                          <img src={CHANNEL_ICONS[ch.id]} alt={ch.name} className="promo-pub-brand-logo" />
                        ) : (
                          <span>{content?.hasVideo ? "🎬" : content?.images ? "📸" : "📝"}</span>
                        )}
                      </div>
                      <div className="promo-pub-card-content">
                        <div className="promo-pub-card-name">
                          <strong>{ch.name}</strong>
                          <em>{ch.type}</em>
                        </div>
                        {isPublished && content && (
                          <div className="promo-pub-card-detail">
                            <div className="promo-pub-card-copy">
                              <label>文案内容</label>
                              <p>{content.text}</p>
                            </div>
                            {content.hasVideo && videoInfo ? (
                              <div className="promo-pub-card-media">
                                <div className={`promo-gen-video-frame ${videoInfo.ratio === "9:16" ? "vertical" : "horizontal"}`}>
                                  <video className="promo-gen-video-clip" src={`${videoInfo.src}#t=${videoInfo.time}`} muted loop autoPlay playsInline preload="metadata" />
                                  <div className="promo-gen-video-overlay">
                                    <span>▶</span>
                                  </div>
                                </div>
                                <div className="promo-gen-video-meta">
                                  <span>视频成片</span>
                                  <em>{videoInfo.ratio}</em>
                                </div>
                              </div>
                            ) : content.images ? (
                              <div className="promo-pub-card-images">
                                <label>AI 配图</label>
                                <div className="promo-gen-images-grid">
                                  {content.images.map((img, i) => (
                                    <div key={i} className="promo-gen-image-item">
                                      <img src={img} alt={`配图${i + 1}`} draggable={false} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                      <div className="promo-pub-card-status">
                        {isPublished ? (
                          <span className="promo-pub-badge published">已发布</span>
                        ) : (
                          <span className="promo-pub-badge pending">发布中...</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="promo-nav-bar promo-nav-bar-fixed promo-nav-strategy">
              <button className="start-btn promo-nav-arrow" onClick={onHome} disabled={!publishDone}>
                完成，返回首页
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ====== Generation Progress Modal ====== */}
      {genModalOpen && (
        <div className="promo-gen-modal-overlay">
          <div className="promo-gen-modal">
            <div className="promo-gen-modal-header">
              <strong>AI 生成中</strong>
              <span className="promo-gen-modal-sub">正在为 {selectedChannelList.length} 个平台生成内容</span>
            </div>
            <div className="promo-gen-modal-body">
              {/* Progress bar */}
              <div className="promo-gen-pipeline-bar">
                <div className="promo-gen-pipeline-track">
                  <div className="promo-gen-pipeline-fill" style={{ width: `${genProgress}%` }} />
                </div>
                <span className="promo-gen-pipeline-pct">{genProgress}%</span>
              </div>
              {/* Channel nodes */}
              <div className="promo-gen-pipeline-nodes">
                {selectedChannelList.map((ch, chIdx) => {
                  const st: "done" | "active" | "waiting" = genCompleted.has(chIdx) ? "done" : genChannelIdx === chIdx ? "active" : "waiting";
                  return (
                    <div key={ch.id} className={`promo-gen-node promo-gen-node-${st}`}>
                      <span className="promo-gen-node-dot">
                        {st === "done" ? "✓" : st === "active" ? ch.name[0] : ""}
                      </span>
                      <em>{ch.name}</em>
                    </div>
                  );
                })}
                <div className="promo-gen-pipeline-count">
                  {genChannelIdx >= 0 ? genChannelIdx + 1 : selectedChannelList.length}/{selectedChannelList.length}
                </div>
              </div>
              {/* Live status */}
              {genCurrentStep && genChannelIdx >= 0 && (
                <div className="promo-gen-live-status" key={`${genChannelIdx}-${genStepIdx}`}>
                  <span className="promo-gen-live-icon">{genCurrentStep.icon}</span>
                  <div className="promo-gen-live-text">
                    <strong>{genCurrentStep.title}</strong>
                    <div className="promo-gen-live-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                  <span className="promo-gen-live-channel">{selectedChannelList[genChannelIdx]?.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====== Publish Confirm Modal ====== */}
      {publishModalOpen && (
        <div className="promo-publish-modal-overlay" onClick={() => setPublishModalOpen(false)}>
          <div className="promo-publish-modal" onClick={(e) => e.stopPropagation()}>
            <div className="promo-publish-modal-header">
              <strong>一键发布</strong>
              <button className="promo-publish-modal-close" onClick={() => setPublishModalOpen(false)}>✕</button>
            </div>
            <div className="promo-publish-modal-body">
              <p className="promo-publish-modal-desc">选择要发布的平台：</p>
              <div className="promo-publish-modal-channels">
                {selectedChannelList.map((ch) => (
                  <label key={ch.id} className={`promo-publish-modal-ch ${publishChannels.has(ch.id) ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={publishChannels.has(ch.id)}
                      onChange={() => togglePublishChannel(ch.id)}
                    />
                    <div className="promo-publish-modal-ch-info">
                      <strong>{ch.name}</strong>
                      <span>{ch.type}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="promo-publish-modal-footer">
              <button className="start-btn promo-nav-arrow" onClick={confirmPublish} disabled={publishChannels.size === 0}>
                确认发布（{publishChannels.size}）
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== Asset Graph Fullscreen Modal ====== */}
      {graphFullscreen && (
        <div className="promo-graph-fs-overlay" onClick={() => setGraphFullscreen(false)}>
          <div className="promo-graph-fs-modal" onClick={(e) => e.stopPropagation()}
            onWheel={handleFsWheel}
            onMouseDown={handleFsMouseDown}
            onMouseMove={handleFsMouseMove}
            onMouseUp={handleFsMouseUp}
            onMouseLeave={handleFsMouseUp}
          >
            <div className="promo-graph-fs-header">
              <strong>资产图谱 · 《{dramaName}》</strong>
              <div className="promo-graph-fs-controls">
                <button onClick={() => handleFsZoomBtn(1)} title="放大">+</button>
                <span>{Math.round(fsZoom * 100)}%</span>
                <button onClick={() => handleFsZoomBtn(-1)} title="缩小">−</button>
                <button onClick={handleFsReset} title="重置">⤢</button>
                <button onClick={() => setGraphFullscreen(false)} title="关闭">✕</button>
              </div>
            </div>
            <div className="promo-graph-fs-canvas">
              <div className="promo-spider-viewport"
                style={{ transform: `translate(${fsPan.x}px, ${fsPan.y}px) scale(${fsZoom})` }}
              >
                <div className="promo-spider promo-spider-fs">
                  <svg className="promo-spider-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {SPIDER_CATEGORIES.map((cat, i) => {
                      const pos = polar(SPIDER_ANGLES[i], 20);
                      return (
                        <line key={cat.id} x1="50" y1="50" x2={pos.x} y2={pos.y}
                          stroke={cat.color} strokeWidth={0.3} strokeOpacity={0.4} />
                      );
                    })}
                    {SPIDER_CATEGORIES.map((cat, ci) =>
                      cat.items.map((item, ii) => {
                        const catPos = polar(SPIDER_ANGLES[ci], 20);
                        const chPos = polar(childAngle(ci, ii, cat.items.length), 40);
                        return (
                          <line key={item.name} x1={catPos.x} y1={catPos.y} x2={chPos.x} y2={chPos.y}
                            stroke={cat.color} strokeWidth={0.25} strokeOpacity={0.3} strokeDasharray="0.6,0.5" />
                        );
                      })
                    )}
                  </svg>
                  <div className="promo-spider-center">
                    <span className="promo-spider-center-name">《{dramaName}》</span>
                    <span className="promo-spider-center-sub">{dramaEp}</span>
                  </div>
                  {SPIDER_CATEGORIES.map((cat, i) => {
                    const pos = polar(SPIDER_ANGLES[i], 20);
                    return (
                      <div key={cat.id}
                        className="promo-spider-cat"
                        style={{ left: `${pos.x}%`, top: `${pos.y}%`, "--cat-color": cat.color } as React.CSSProperties}
                      >
                        <span className="promo-spider-cat-icon" style={{ background: `${cat.color}22`, color: cat.color }}>{cat.icon}</span>
                        <strong>{cat.label}</strong>
                        <em className="promo-spider-cat-count" style={{ color: cat.color }}>{cat.items.length}</em>
                      </div>
                    );
                  })}
                  {SPIDER_CATEGORIES.map((cat, ci) =>
                    cat.items.map((item, ii) => {
                      const chPos = polar(childAngle(ci, ii, cat.items.length), 40);
                      const hasMedia = item.img || item.video;
                      return (
                        <div key={item.name}
                          className={`promo-spider-child ${hasMedia ? "clickable" : ""}`}
                          style={{ left: `${chPos.x}%`, top: `${chPos.y}%`, "--cat-color": cat.color } as React.CSSProperties}
                          onClick={hasMedia ? () => setFsPreview({ name: item.name, img: item.img, video: item.video, videoTime: item.videoTime, catColor: cat.color, catLabel: cat.label, desc: item.desc }) : undefined}
                        >
                          {item.img ? (
                            <img className="promo-spider-child-img" src={item.img} alt={item.name} draggable={false} />
                          ) : item.video ? (
                            <video className="promo-spider-child-img promo-spider-child-video" src={`${item.video}#t=${item.videoTime || 1}`} muted playsInline preload="metadata" />
                          ) : (
                            <span className="promo-spider-child-thumb" style={{ background: `${cat.color}22`, color: cat.color }}>{item.thumb}</span>
                          )}
                          <strong>{item.name}</strong>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <div className="promo-spider-hint">滚轮缩放 · 拖拽平移</div>
            </div>

            {/* Image/Video preview overlay */}
            {fsPreview && (
              <div className="promo-fs-preview" onClick={() => setFsPreview(null)}>
                <div className="promo-fs-preview-content" onClick={(e) => e.stopPropagation()}>
                  <button className="promo-fs-preview-close" onClick={() => setFsPreview(null)}>✕</button>
                  {fsPreview.img ? (
                    <img src={fsPreview.img} alt={fsPreview.name} />
                  ) : fsPreview.video ? (
                    <video src={`${fsPreview.video}#t=${fsPreview.videoTime || 1}`} controls autoPlay muted playsInline />
                  ) : null}
                  <div className="promo-fs-preview-info">
                    <span className="promo-fs-preview-tag" style={{ background: `${fsPreview.catColor}22`, color: fsPreview.catColor }}>{fsPreview.catLabel}</span>
                    <strong>{fsPreview.name}</strong>
                    <p>{fsPreview.desc}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
