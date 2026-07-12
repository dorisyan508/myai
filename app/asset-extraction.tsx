"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";

type WorkflowStep = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    name: "剧本解析",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M14 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8H13M9 12H13M9 16H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17.5" cy="16.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M19.4 18.4L21 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "资产提取",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L21 8V16L12 21L3 16V8L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 8L12 13L21 8M12 13V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "分镜脚本",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 9H21M3 14H21M9 4V20M15 4V20" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "分镜视频",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 9L15 12L10 15V9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "成片",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M3 4l18 0M3 4v3l3 2.5V20a1 1 0 001 1h10a1 1 0 001-1V9.5l3-2.5V4M7 4l1.5-2h7L17 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M9.5 13.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// 当前页处于第二步「资产提取」
const CURRENT_STEP = 2;

type AssetCategory = {
  key: string;
  label: string;
  items: AssetItem[];
};

type AssetItem = {
  id: string;
  name: string;
  image: string | null;
  source: "none" | "uploaded" | "generated";
};

// ====== 本地图片映射（对应 public 下的实际文件） ======

// 人物生成后的图片路径
const CHARACTER_IMAGES: Record<string, string> = {
  c1: "/人物/1_阿离_30515.png",
  c2: "/人物/2_老周头_30516.png",
  c3: "/人物/3_柳大娘_30517.png",
  c4: "/人物/4_小豆子_30518.png",
  c5: "/人物/5_黑袍人_30519.png",
  c6: "/人物/6_黑袍人(摘下面具形态（与阿离相似、脸颊旧疤）)_30520.png",
  c7: "/人物/7_师父_30521.png",
};

// 场景生成后的图片路径（每处取全景图作为代表）
const SCENE_IMAGES: Record<string, string> = {
  s1: "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(全景)_30525.png",
  s2: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png",
  s3: "/场景/天机匣_场景资产_江南古道驿道_外景(全景)_30531.png",
  s4: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png",
  s5: "/场景/天机匣_场景资产_顺风客栈·二楼客房_内景(全景)_30538.png",
  s6: "/场景/天机匣_场景资产_顺风客栈·后院_外景(全景)_30541.png",
  s7: "/场景/天机匣_场景资产_顺风客栈·后院连大堂走廊_外景(全景)_30544.png",
  s8: "/场景/天机匣_场景资产_顺风客栈·二楼客房（回防）_内景(全景)_30522.png",
};

// 道具生成后的图片路径
const PROP_IMAGES: Record<string, string> = {
  p1: "/道具/天机匣_道具资产_铜锣_30547.png",
  p2: "/道具/天机匣_道具资产_钥匙_30548.png",
  p3: "/道具/天机匣_道具资产_木匣_30549.png",
  p4: "/道具/天机匣_道具资产_木匣(开启发光)_30550.png",
  p5: "/道具/天机匣_道具资产_包袱_30551.png",
  p6: "/道具/天机匣_道具资产_荷包_30552.png",
  p7: "/道具/天机匣_道具资产_短剑_30553.png",
  p8: "/道具/天机匣_道具资产_算盘_30554.png",
  p9: "/道具/天机匣_道具资产_透骨钉_30555.png",
  p10: "/道具/天机匣_道具资产_货箱_30556.png",
  p11: "/道具/天机匣_道具资产_青铜面具_30557.png",
};

const GENERATED_IMAGE_MAPS: Record<string, Record<string, string>> = {
  character: CHARACTER_IMAGES,
  scene: SCENE_IMAGES,
  prop: PROP_IMAGES,
};

// 每个角色/场景/道具的 AI 生成描述（模拟模型输出）
const ITEM_DESCRIPTIONS: Record<string, string> = {
  c1: "阿离，男，20岁左右，面容清秀俊朗，剑眉星目，黑色长发半束于顶，着玄色劲装，腰佩短剑，气质冷峻中带着书卷气，眼神坚定而深邃。",
  c2: "老周头，男，约60岁，面容沧桑，花白胡须，深陷的眼窝透着精明，着深灰色粗布长袍，手持灯笼，身形略佝偻但步伐稳健，老江湖的气息。",
  c3: "柳大娘，女，约50岁，面容慈祥但眼神坚毅，发髻整洁，着靛蓝色布衣，背着一个大包袱，牵着孙子的手，农村妇女的朴实与韧性。",
  c4: "小豆子，男，8岁左右，圆脸大眼，虎头虎脑，梳着双丫髻，穿浅褐色短打，背着小包袱，眼神中带着孩子的好奇与不安。",
  c5: "黑袍人，性别不明，全身笼罩在黑色斗篷中，佩戴青铜面具，面具造型狰狞，仅露出一双凌厉的眼睛，身形高大修长，神秘而危险。",
  c6: "黑袍人(摘下面具)，男，约25岁，面容与阿离相似但更为冷峻，左脸颊有一道陈旧剑疤，短发微乱，眼神复杂，带着恨意与不甘。",
  c7: "师父，男，约55岁，仙风道骨，白发白须，面容清瘦，着月白色道袍，手持拂尘，神情淡然超脱，隐世高人的气度。",
  s1: "天机匣幻境·金色空间，一片无边无际的金色虚空，云雾缭绕，悬浮着古籍与兵器残影，光芒从中心的天机匣中迸射而出，充满神秘与恢弘。",
  s2: "客栈后山·竹林小径，雨夜，翠竹成林，竹叶被雨水压弯，石板小径蜿蜒其中，两旁竹影婆娑，灯笼的微光在雨幕中摇曳，幽静而紧张。",
  s3: "江南古道·驿道，黄昏细雨，青石板驿道延伸向远方，两旁是低矮的白墙黛瓦，远处山峦在烟雨中朦胧，古意盎然又带着离愁。",
  s4: "顺风客栈·大堂，室内，油灯昏黄，木质结构，八仙桌椅错落，柜台上摆着算盘与酒坛，墙上挂着江湖告示，烟火气十足。",
  s5: "顺风客栈·二楼客房，室内，简约古朴，木床木桌，窗棂透进月光，桌上放着茶盏与烛台，安静而私密的空间。",
  s6: "顺风客栈·后院，室外，青砖围墙，院中有古井与枯树，地面铺着碎石，角落堆着杂物与柴火，月光洒下，安静中透着一丝不安。",
  s7: "顺风客栈·后院连大堂走廊，半室外，木质回廊连接后院与大堂，廊柱斑驳，檐下挂着灯笼，地面的青石板被岁月磨得发亮。",
  s8: "顺风客栈·二楼客房(回防)，室内，与二楼客房相似但更显凌乱，桌椅被推倒，窗户半开，月光与火光交映，紧张的对峙氛围。",
  p1: "铜锣，圆形铜制，直径约30厘米，边缘略有磨损，表面氧化发青，中央有敲击留下的凹痕，带着岁月的痕迹。",
  p2: "钥匙，铜制古钥匙，齿纹复杂，柄部刻有八卦纹饰，表面泛着暗金色光泽，精致而神秘。",
  p3: "木匣，长方形红木匣子，表面雕刻云纹，四角包铜，锁扣精致，木质温润，年代感十足。",
  p4: "木匣(开启发光)，与木匣相同造型，但盖子半开，内部迸发出柔和的金色光芒，光芒中隐约可见符文流转。",
  p5: "包袱，蓝灰色粗布包袱，四角打结，布料陈旧但干净，鼓鼓囊囊，是江湖人随身携带行囊的模样。",
  p6: "荷包，绣花荷包，朱红色缎面，绣着蝙蝠纹，金线勾边，系着明黄色丝绦，精致小巧。",
  p7: "短剑，长约40厘米，剑身寒光凛凛，剑柄缠着黑色丝线，护手为铜制兽面纹，剑鞘黑漆描金，锋利而致命。",
  p8: "算盘，木质算盘，13档，珠子被摩挲得发亮，框沿有包浆，是经验丰富的掌柜常年使用的工具。",
  p9: "透骨钉，细长铁钉，长约10厘米，通体漆黑，尖端泛着蓝光，尾部刻有微小符文，淬毒暗器的质感。",
  p10: "货箱，粗糙木板拼接，外裹铁皮加固，表面有水渍和刮痕，普通的运输箱，但隐约透出内部散发的微光。",
  p11: "青铜面具，半脸面具，造型狰狞似鬼面，铜锈斑驳，眼部镂空，边缘有系带孔，佩戴后只露出一双眼睛，阴森诡异。",
};

// 从剧本中解析出的默认数据
const DEFAULT_CATEGORIES: AssetCategory[] = [
  {
    key: "character",
    label: "人物",
    items: [
      { id: "c1", name: "阿离", image: null, source: "none" },
      { id: "c2", name: "老周头", image: null, source: "none" },
      { id: "c3", name: "柳大娘", image: null, source: "none" },
      { id: "c4", name: "小豆子", image: null, source: "none" },
      { id: "c5", name: "黑袍人", image: null, source: "none" },
      { id: "c6", name: "黑袍人(摘下面具)", image: null, source: "none" },
      { id: "c7", name: "师父", image: null, source: "none" },
    ],
  },
  {
    key: "scene",
    label: "场景",
    items: [
      { id: "s1", name: "天机匣幻境·金色空间", image: null, source: "none" },
      { id: "s2", name: "客栈后山·竹林小径", image: null, source: "none" },
      { id: "s3", name: "江南古道·驿道", image: null, source: "none" },
      { id: "s4", name: "顺风客栈·大堂", image: null, source: "none" },
      { id: "s5", name: "顺风客栈·二楼客房", image: null, source: "none" },
      { id: "s6", name: "顺风客栈·后院", image: null, source: "none" },
      { id: "s7", name: "顺风客栈·后院连大堂走廊", image: null, source: "none" },
      { id: "s8", name: "顺风客栈·二楼客房(回防)", image: null, source: "none" },
    ],
  },
  {
    key: "prop",
    label: "道具",
    items: [
      { id: "p1", name: "铜锣", image: null, source: "none" },
      { id: "p2", name: "钥匙", image: null, source: "none" },
      { id: "p3", name: "木匣", image: null, source: "none" },
      { id: "p4", name: "木匣(开启发光)", image: null, source: "none" },
      { id: "p5", name: "包袱", image: null, source: "none" },
      { id: "p6", name: "荷包", image: null, source: "none" },
      { id: "p7", name: "短剑", image: null, source: "none" },
      { id: "p8", name: "算盘", image: null, source: "none" },
      { id: "p9", name: "透骨钉", image: null, source: "none" },
      { id: "p10", name: "货箱", image: null, source: "none" },
      { id: "p11", name: "青铜面具", image: null, source: "none" },
    ],
  },
];

export default function AssetExtractionPage({
  savedCategories,
  onCategoriesChange,
  onBack,
  onNext,
  onHome,
  onAssetLibrary,
  onAssetLayer,
}: {
  savedCategories?: AssetCategory[] | null;
  onCategoriesChange?: (cats: AssetCategory[]) => void;
  onBack?: () => void;
  onNext?: () => void;
  onHome?: () => void;
  onAssetLibrary?: () => void;
  onAssetLayer?: (key: string) => void;
}) {
  const [categories, setCategories] = useState<AssetCategory[]>(
    savedCategories && savedCategories.length > 0 ? savedCategories : DEFAULT_CATEGORIES
  );
  const [generating, setGenerating] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [selectedModel, setSelectedModel] = useState("即梦3.0");
  const [modelDropdownOpen, setModelDropdownOpen] = useState<string | null>(null);
  const [storyboardModel, setStoryboardModel] = useState("DeepSeek-V4");
  const [storyboardDropdownOpen, setStoryboardDropdownOpen] = useState(false);

  // 重新生成弹框相关状态
  const [regenModal, setRegenModal] = useState<{ catKey: string; itemId: string; name: string } | null>(null);
  const [regenDescription, setRegenDescription] = useState("");
  const [regenModel, setRegenModel] = useState("即梦3.0");
  const [regenDropdownOpen, setRegenDropdownOpen] = useState(false);
  const [regenLoading, setRegenLoading] = useState(false);
  const [regenHistory, setRegenHistory] = useState<{ id: number; image: string; description: string }[]>([]);
  const regenCounter = useRef(0);

  const models = ["即梦3.0", "可图2.0", "通义万相", "Midjourney-V6", "Stable Diffusion3"];
  const storyboardModels = ["DeepSeek-V4", "GLM-5.2", "豆包-Pro", "Kimi-K2", "Qwen-Max"];

  // 判断所有资产是否都已生成
  const allGenerated = categories.every((cat) =>
    cat.items.every((item) => item.source !== "none")
  );

  // 同步状态到父组件，返回时保留生成的图片
  useEffect(() => {
    onCategoriesChange?.(categories);
  }, [categories]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = (catKey: string, itemId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCategories((prev) =>
        prev.map((cat) =>
          cat.key === catKey
            ? {
                ...cat,
                items: cat.items.map((item) =>
                  item.id === itemId ? { ...item, image: dataUrl, source: "uploaded" as const } : item
                ),
              }
            : cat
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = (catKey: string) => {
    if (generating) return;
    setGenerating(catKey);
    const imageMap = GENERATED_IMAGE_MAPS[catKey] || {};
    setTimeout(() => {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.key === catKey
            ? {
                ...cat,
                items: cat.items.map((item) =>
                  item.source === "none"
                    ? { ...item, image: imageMap[item.id] || "", source: "generated" as const }
                    : item
                ),
              }
            : cat
        )
      );
      setGenerating(null);
    }, 2500);
  };

  // 打开重新生成弹框
  const handleRegenerate = (catKey: string, itemId: string, name: string) => {
    const desc = ITEM_DESCRIPTIONS[itemId] || "";
    const imageMap = GENERATED_IMAGE_MAPS[catKey] || {};
    const currentImage = imageMap[itemId] || "";
    setRegenModal({ catKey, itemId, name });
    setRegenDescription(desc);
    setRegenModel("即梦3.0");
    setRegenHistory(currentImage ? [{ id: 0, image: currentImage, description: desc }] : []);
    regenCounter.current = 1;
  };

  // 在弹框内执行一键生成
  const MAX_REGEN = 5;

  const handleRegenGenerate = () => {
    if (regenLoading || !regenModal) return;
    if (regenHistory.length >= MAX_REGEN) return;
    setRegenLoading(true);
    const imageMap = GENERATED_IMAGE_MAPS[regenModal.catKey] || {};
    const baseImage = imageMap[regenModal.itemId] || "";
    // 模拟生成不同版本：循环使用不同的可用图片作为不同结果
    const allImages = Object.values(imageMap);
    const newId = regenCounter.current++;
    const newImage = allImages[newId % allImages.length] || baseImage;
    const capturedDesc = regenDescription;
    setTimeout(() => {
      setRegenHistory((prev) => [...prev, { id: newId, image: newImage, description: capturedDesc }]);
      setRegenLoading(false);
    }, 2000);
  };

  // 删除某个生成结果
  const handleDeleteResult = (id: number) => {
    setRegenHistory((prev) => prev.filter((h) => h.id !== id));
  };

  // 确认选择某张图片作为最终结果
  const handleSelectImage = (image: string) => {
    if (!regenModal) return;
    setCategories((prev) =>
      prev.map((cat) =>
        cat.key === regenModal.catKey
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === regenModal.itemId ? { ...item, image, source: "generated" as const } : item
              ),
            }
          : cat
      )
    );
    setRegenModal(null);
  };

  return (
    <div className="page">
      {/* Background */}
      <div className="bg-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg-image" src="/bg.png" alt="" />
        <div className="bg-overlay" />
      </div>

      {/* Navigation Bar */}
      <Navbar onHome={onHome} onAssetLibrary={onAssetLibrary} onAssetLayer={onAssetLayer} activeNav="agent" />

      {/* Analysis Content */}
      <div className={`analysis-page ${allGenerated && onNext ? "has-bottom-bar" : ""}`}>
        {/* Top Row —— 返回 + 流程指示器 + 详情 */}
        <div className="analysis-top-row">
          <button className="analysis-back" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Workflow Stepper */}
          <div className="workflow-stepper">
            {WORKFLOW_STEPS.map((step, index) => {
              const status =
                step.id < CURRENT_STEP
                  ? "done"
                  : step.id === CURRENT_STEP
                  ? "active"
                  : "pending";
              return (
                <div key={step.id} className="wf-step-wrap">
                  <div className={`workflow-step ${status}`}>
                    <div className="workflow-step-circle">
                      {status === "done" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span className="workflow-step-num">{step.id}</span>
                    <span className="workflow-step-name">{step.name}</span>
                  </div>
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <div className={`wf-arrow ${status === "done" ? "active" : ""}`}>
                      ›
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="info-toggles">
            <button className="info-toggle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 7h18M3 12h18M3 17h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              详情
            </button>
          </div>
        </div>

        {/* Asset Categories —— 人物 / 场景 / 道具 */}
        <div className="asset-categories">
          {categories.map((cat) => (
            <div key={cat.key} className="asset-module">
              <div className="asset-module-header">
                <span className="asset-module-title">{cat.label}</span>
                <div className="asset-header-right">
                  <div className="model-selector-group">
                    <span className="model-label">{selectedModel === "即梦3.0" ? "智能推荐" : "自定义"}</span>
                    <span className="model-divider">|</span>
                    <div className="model-dropdown">
                      <button
                        className="model-dropdown-trigger"
                        onClick={() =>
                          setModelDropdownOpen(
                            modelDropdownOpen === cat.key ? null : cat.key
                          )
                        }
                      >
                        {selectedModel}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {modelDropdownOpen === cat.key && (
                        <div className="model-dropdown-menu">
                          {models.map((model) => (
                            <div
                              key={model}
                              className={`model-dropdown-item ${
                                selectedModel === model ? "selected" : ""
                              }`}
                              onClick={() => {
                                setSelectedModel(model);
                                setModelDropdownOpen(null);
                              }}
                            >
                              {model}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className={`asset-gen-btn ${generating === cat.key ? "loading" : ""}`}
                    onClick={() => handleGenerate(cat.key)}
                    disabled={generating !== null}
                  >
                    {generating === cat.key ? (
                      <>
                        <span className="parse-spinner" />
                        生成中…
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          {/* Large sparkle — top-left */}
                          <path
                            d="M5 1L6.2 4.8L10 6L6.2 7.2L5 11L3.8 7.2L0 6L3.8 4.8Z"
                            fill="currentColor"
                          />
                          {/* Small sparkle — top-right */}
                          <path
                            d="M15 2L15.8 4.2L18 5L15.8 5.8L15 8L14.2 5.8L12 5L14.2 4.2Z"
                            fill="currentColor"
                          />
                          {/* Wand tip glow at upper-right end */}
                          <circle cx="18" cy="10" r="2.5" fill="currentColor" opacity="0.25" />
                          {/* Wand body — thick diagonal, lower half only */}
                          <path
                            d="M18 10L6 22"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                        一键生成图片
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="asset-grid">
                {cat.items.map((item) => {
                  const refKey = `${cat.key}-${item.id}`;
                  const isGenerated = item.source === "generated";
                  const isUploaded = item.source === "uploaded";
                  return (
                    <div key={item.id} className="asset-card">
                      <div className="asset-image-area">
                        {(isGenerated || isUploaded) && item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="asset-image asset-image-clickable"
                            src={item.image}
                            alt={item.name}
                            onClick={() => setPreviewImage(item.image)}
                            onError={(e) => {
                              // 图片加载失败时显示占位图
                              (e.target as HTMLImageElement).style.display = "none";
                              (e.target as HTMLImageElement).nextElementSibling?.classList.add("show");
                            }}
                          />
                        ) : null}
                        {/* 图片加载失败时的占位 */}
                        {(isGenerated || isUploaded) && (
                          <div className="asset-image-fallback">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                              <rect x="3" y="5" width="18" height="14" rx="2" stroke="rgba(244,145,105,0.4)" strokeWidth="1.5" />
                              <path d="M8.5 12L11 14.5L15.5 9.5" stroke="rgba(244,145,105,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        {item.source === "none" && (
                          <label className="asset-upload-zone">
                            <input
                              ref={(el) => {
                                fileInputRefs.current[refKey] = el;
                              }}
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUpload(cat.key, item.id, file);
                              }}
                            />
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M12 5V19M5 12H19"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="asset-upload-text">上传图片</span>
                          </label>
                        )}
                      </div>
                      {/* 名称 + 重新生成按钮 */}
                      <div className="asset-info-row">
                        <span className="asset-name">{item.name}</span>
                        {isGenerated && (
                          <button
                            className="asset-regen-btn"
                            title="重新生成"
                            onClick={() => handleRegenerate(cat.key, item.id, item.name)}
                          >
                            <svg width="22" height="22" viewBox="-1 0 22 20" fill="none">
                              <path d="M5 1L6.2 4.8L10 6L6.2 7.2L5 11L3.8 7.2L0 6L3.8 4.8Z" fill="currentColor" />
                              <path d="M15 2L15.8 4.2L18 5L15.8 5.8L15 8L14.2 5.8L12 5L14.2 4.2Z" fill="currentColor" />
                              <path d="M19 14L19.5 15.5L21 16L19.5 16.5L19 18L18.5 16.5L17 16L18.5 15.5Z" fill="currentColor" opacity="0.6" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 所有图片生成后，底部显示「下一步」按钮 */}
      {allGenerated && onNext && (
        <div className="bottom-action-bar">
          <div className="model-selector-group">
            <span className="model-label">{storyboardModel === "DeepSeek-V4" ? "智能推荐" : "自定义"}</span>
            <span className="model-divider">|</span>
            <div className="model-dropdown">
              <button
                className="model-dropdown-trigger"
                onClick={() => setStoryboardDropdownOpen(!storyboardDropdownOpen)}
              >
                {storyboardModel}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {storyboardDropdownOpen && (
                <div className="model-dropdown-menu">
                  {storyboardModels.map((model) => (
                    <div
                      key={model}
                      className={`model-dropdown-item ${
                        storyboardModel === model ? "selected" : ""
                      }`}
                      onClick={() => {
                        setStoryboardModel(model);
                        setStoryboardDropdownOpen(false);
                      }}
                    >
                      {model}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="bottom-next-btn" onClick={onNext}>
            <span>下一步，生成分镜脚本</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* 图片预览弹层 */}
      {previewImage && (
        <div className="image-lightbox" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="预览" />
          <button className="lightbox-close" onClick={() => setPreviewImage(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* 重新生成弹框 */}
      {regenModal && (
        <div className="modal-overlay" onClick={() => !regenLoading && setRegenModal(null)}>
          <div className="modal-dialog regen-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">重新生成 — {regenModal.name}</span>
              <button className="modal-close" onClick={() => !regenLoading && setRegenModal(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="regen-body">
              {/* 顶部全宽：模型选择 */}
              <div className="regen-model-row">
                <label className="regen-label">生成模型</label>
                <div className="model-selector-group">
                  <span className="model-label">{regenModel === "即梦3.0" ? "智能推荐" : "自定义"}</span>
                  <span className="model-divider">|</span>
                  <div className="model-dropdown">
                    <button
                      className="model-dropdown-trigger"
                      onClick={() => setRegenDropdownOpen(!regenDropdownOpen)}
                    >
                      {regenModel}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {regenDropdownOpen && (
                      <div className="model-dropdown-menu">
                        {models.map((model) => (
                          <div
                            key={model}
                            className={`model-dropdown-item ${regenModel === model ? "selected" : ""}`}
                            onClick={() => {
                              setRegenModel(model);
                              setRegenDropdownOpen(false);
                            }}
                          >
                            {model}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 当前人物描述 + 生成按钮 */}
              <div className="regen-current">
                <label className="regen-label">人物描述</label>
                <textarea
                  className="regen-textarea"
                  value={regenDescription}
                  onChange={(e) => setRegenDescription(e.target.value)}
                  placeholder="输入描述内容…"
                />
                <button
                  className={`regen-gen-btn ${regenLoading ? "loading" : ""}`}
                  onClick={handleRegenGenerate}
                  disabled={regenLoading || regenHistory.length >= MAX_REGEN}
                >
                  {regenLoading ? (
                    <>
                      <span className="parse-spinner" />
                      生成中…
                    </>
                  ) : regenHistory.length >= MAX_REGEN ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      已达上限，请删除后再生成
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 1L6.2 4.8L10 6L6.2 7.2L5 11L3.8 7.2L0 6L3.8 4.8Z" fill="currentColor" />
                        <path d="M15 2L15.8 4.2L18 5L15.8 5.8L15 8L14.2 5.8L12 5L14.2 4.2Z" fill="currentColor" />
                        <path d="M18 10L6 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      一键生成图片
                    </>
                  )}
                </button>
              </div>

              {/* 生成历史：描述与结果一一对应 */}
              <div className="regen-history">
                <div className="regen-history-header">
                  生成结果
                  <span className="regen-count">{regenHistory.length} / {MAX_REGEN}</span>
                </div>
                <div className="regen-history-list">
                  {regenHistory.length === 0 && !regenLoading && (
                    <div className="regen-empty">点击「一键生成图片」开始生成</div>
                  )}
                  {regenHistory.map((h) => {
                    const currentImage = categories
                      .find((c) => c.key === regenModal.catKey)
                      ?.items.find((i) => i.id === regenModal.itemId)?.image;
                    const isSelected = currentImage === h.image;
                    return (
                      <div
                        key={h.id}
                        className={`regen-thumb-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSelectImage(h.image)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={h.image} alt={`生成结果 ${h.id + 1}`} />
                        <div className="regen-zoom-overlay" onClick={(e) => { e.stopPropagation(); setPreviewImage(h.image); }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
                            <path d="M20 20L15.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M10.5 8V13M8 10.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        {isSelected && (
                          <div className="regen-thumb-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                            </svg>
                          </div>
                        )}
                        <button
                          className="regen-delete-btn"
                          title="删除"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteResult(h.id);
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                  {regenLoading && (
                    <div className="regen-thumb-card regen-thumb-loading">
                      <span className="parse-spinner" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
