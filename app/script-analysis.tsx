"use client";

import { useState, useMemo, useEffect } from "react";
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
        <path
          d="M14 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 8H13M9 12H13M9 16H11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="17.5" cy="16.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M19.4 18.4L21 20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "资产提取",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3L21 8V16L12 21L3 16V8L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M3 8L12 13L21 8M12 13V21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
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
        <path
          d="M10 9L15 12L10 15V9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: "成片",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 4l18 0M3 4v3l3 2.5V20a1 1 0 001 1h10a1 1 0 001-1V9.5l3-2.5V4M7 4l1.5-2h7L17 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M9.5 13.5l2 2 3.5-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// 当前页处于第一步「剧本解析」
const CURRENT_STEP = 1;

const SCRIPT_TEXT = `《天机匣》第1集：雨夜惊变
场景一：古道黄昏 · 雨中行
暮色四合，远山如墨，一条青石板古驿道蜿蜒入云雾。秋雨绵绵，雨丝斜织，道旁枯黄的芦苇在风中摇曳。远处隐约可见古镇的轮廓，几点灯火在雨幕中晕开暖黄的光。
镜头从高空仰瞰，缓缓推近。石板路上，一个青色身影独自行走——阿离背着包袱，怀里紧紧抱着一个方形物件（木匣），用身体护着不让雨淋到。他脚步轻快但透着疲惫，时不时抬头看前方的灯火。
字幕："江南古镇 · 秋雨黄昏"
场景二：客栈大堂 · 初遇
"顺风客栈"——一块老旧的木招牌，油漆斑驳。推开门，暖气和食物香气扑面而来。大堂不大，摆着四张八仙桌，墙角堆着柳大娘的巨型货箱。炉子上坐着铜壶，咕嘟作响。老周头坐在柜台后，手指翻飞地拨弄算盘。
阿离推门而入，带进一股冷风。他抖了抖身上的雨水，警惕地扫视大堂——角落里柳大娘正叉腰清点货箱，小豆子端着盘子旋风般穿过。阿离的目光在柳大娘的货箱上停了半秒，然后走向柜台。
阿离（将包袱放上柜台，故意用身体挡住）："掌柜的，住店。一晚。"
老周头缓缓抬头，眯缝眼从阿离的脸扫到腰间的荷包，再扫到他怀里护着的包袱，最后落在阿离那双快靴上——那是习武之人才穿的鞋子。
老周头（打算盘的手没停，嘴角一扬）："二楼拐角，最里头那间。房钱三十文，烫酒另算。"
他递出钥匙时，那根缺了小指的手翘起一个奇怪的弧度。阿离接过钥匙，指尖碰到老周头的掌心——粗糙，有老茧，是握过兵器的手。
经过柳大娘身边时，柳大娘"不经意"地侧了侧身，货箱上露出一个奇怪的符号——和师父教过他的某种标记惊人地相似。
柳大娘（大噪门，但眼睛没看阿离）："小兄弟，这鬼天气，夜里关好窗！最近镇上……不太平。"
小豆子（擦着桌子，却竖着耳朵）："掌柜的，那位客官包袱里装的啥？方方正正的……"
老周头（一算盘敲在小豆子头上）："擦你的桌子！嘴碎！"
场景三：二楼客房 · 警觉
客房简朴但干净，一张木床、一个方桌、一盏油灯。窗外雨势渐大，树枝在风雨中狂舞。
阿离进屋，反锁房门，又推了推窗户确认闩好。他将包袱放在桌上，小心翼翼地打开——里面露出了一个手掌大小的古旧木匣，铜锁已经锈蚀，匣身刻着细密的云纹。
阿离轻抚木匣，眼神复杂。
阿离（低声）："师父……您说这东西能改变江湖格局。可我连它怎么打开都不知道。"
突然——窗外一道闪电劈过，瞬间照亮了房间。阿离猛地回头，在那一瞬的光亮中，他隐约看到窗外对面的屋顶上，立着一个黑色的身影。
阿离（瞳孔收缩，吹灭油灯）："……有人！"
场景四：客栈后院 · 追踪
客栈后院，堆着柴火、水桶、杂物。雨更大了，地面泥泞。一盏马灯在廊下摇晃，投下诡异的阴影。
黑袍人像一道影子，从屋顶无声滑下，落地时竟然没有溅起泥水。他站在院中，青铜面具在闪电中泛着冷光，灰白的盲眼缓缓"扫视"四周。
阿离从二楼轻跃而下，落地时本能地猫身缓冲。他躲在磨盘后面，透过雨帘窥视。
黑袍人（电子合成般的沙哑声）："出来。你身上的……匣气，瞒不过我。"
阿离浑身一紧，手按在短剑柄上——剑未出鞘。
场景五：大堂突变 · 同盟显现
后院传来一声闷响——阿离被黑袍人一掌震退，踉跄着跌入后院与大堂相通的走廊。
黑袍人飘然而至，灰白的眼睛锁定阿离怀中的木匣："小娃娃……给我。那不是你能守的东西。"
阿离咬牙："我师父给我的，凭什么给你？"
柳大娘（一声暴喝，货箱盖弹开）："欺负孩子？问过姑奶奶没有！"
三枚透骨钉呈品字形射向黑袍人！老周头手中算盘一抖，算珠竟如暗器般飞射而出！
老周头（声音不再苍老）："阁下好大的胆子，顺风客栈的客人，你也敢动？"
小豆子使劲敲响铜锣："走水啦——！走水啦——！"
黑袍人身形一闪，如墨溶于水，消失在雨幕中。
场景六：客房回防 · 匣中异动
阿离回到客房，老周头、柳大娘跟了进来。
柳大娘（叉腰）："小子，你师父……是不是姓顾？"
老周头将荷包递给阿离："三十年前，我这条小指，就是欠你师父一条命还的。今日，算是两清了。"
突然，木匣上的云纹开始微微发光！铜锁发出咔哒一声轻响，匣盖掀开一条缝，里面是一团……流动的金色光芒。光芒中隐约可见三个古篆小字——"天机匣"。
阿离（震惊）："师父……这到底是什么？"
场景七：幻境/回忆 · 师父的嘱托
金色光芒吞没了房间。阿离站在云端，前方一个白袍老人的背影负手而立。
师父（画外音）："阿离……为师将此匣托付于你，非因你是天选之人……而是因你心中有光。天机匣，匣中有天机，亦有浩劫。守住它。"
阿离："师父！那些黑袍人——他们是谁？"
师父："……小心'匣中人'。"
光芒骤灭。
场景八：竹林对峙 · 悬念结尾
阿离追出客栈，来到后山竹林。雨更大了，竹叶在风雨中狂舞。黑袍人缓缓转身，两人隔着风雨对视。
黑袍人："你师父……选了个好徒弟。"
阿离："你到底是谁？"
黑袍人摘下青铜面具——露出的竟是一张和阿离有七分相似的脸。
黑袍人："我是……你本该死在二十年前的师兄。"
画面定格。字幕："第1集完 · 下集预告：匣中人与师兄之谜"
`;

// Auto-extract project name and episode from script title line
function parseProjectInfo(text: string): { name: string; episode: string } {
  const firstLine = text.trim().split("\n")[0];
  // Extract title from 《...》
  const titleMatch = firstLine.match(/《([^》]+)》/);
  const name = titleMatch ? titleMatch[1] : "未命名项目";
  // Extract episode from 第X集
  const epMatch = firstLine.match(/第(\d+|[零一二三四五六七八九十百]+)集/);
  const episode = epMatch ? epMatch[1] : "1";
  return { name, episode };
}

export default function ScriptAnalysisPage({ homeInput, onBack, onNext, onHome, onAssetLibrary, onAssetLayer }: { homeInput?: string; onBack?: () => void; onNext?: () => void; onHome?: () => void; onAssetLibrary?: () => void; onAssetLayer?: (key: string) => void }) {
  const [parsing, setParsing] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [scriptText, setScriptText] = useState(SCRIPT_TEXT);
  const [showReplaceConfirm, setShowReplaceConfirm] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [replaceText, setReplaceText] = useState("");
  const [selectedModel, setSelectedModel] = useState("DeepSeek-V4");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // Auto-extract project name and episode from script
  const autoParsed = useMemo(() => parseProjectInfo(scriptText), [scriptText]);
  const [projectName, setProjectName] = useState(autoParsed.name);
  const [episode, setEpisode] = useState(autoParsed.episode);
  // Sync state when auto-parsed value changes (e.g. script replaced)
  useEffect(() => {
    setProjectName(autoParsed.name);
    setEpisode(autoParsed.episode);
  }, [autoParsed.name, autoParsed.episode]);

  const scriptWordCount = useMemo(
    () => scriptText.replace(/\s/g, "").length.toLocaleString(),
    [scriptText]
  );
  const scriptTitle = useMemo(
    () => scriptText.trim().split("\n")[0],
    [scriptText]
  );

  const projectInfo = useMemo(() => [
    { label: "项目名称", value: projectName + "·短剧创作" },
    { label: "项目类型", value: "古风武侠短剧" },
    { label: "集数", value: `第 ${episode} 集` },
    { label: "画幅比例", value: "竖屏 9:16" },
    { label: "创建时间", value: "2026-07-08" },
  ], [projectName, episode]);

  const scriptInfo = useMemo(() => [
    { label: "剧本名称", value: scriptTitle },
    { label: "剧本类型", value: "古风武侠 / 奇幻冒险" },
    { label: "总字数", value: `${scriptWordCount} 字`, highlight: true },
    { label: "预计分镜", value: "8 场", highlight: true },
    { label: "作者", value: "文演 AI" },
  ], [scriptTitle, scriptWordCount]);

  const models = ["DeepSeek-V4", "GLM-5.2", "豆包-Pro", "Kimi-K2", "Qwen-Max"];

  const handleReuploadClick = () => {
    setShowReplaceConfirm(true);
  };

  const handleConfirmReplace = () => {
    setShowReplaceConfirm(false);
    setReplaceText(homeInput || "");
    setShowReplaceModal(true);
  };

  const [replaceError, setReplaceError] = useState("");

  const handleModalConfirm = () => {
    if (!replaceText.trim()) {
      setReplaceError("请输入剧本内容");
      return;
    }
    setScriptText(replaceText);
    setShowReplaceModal(false);
    setReplaceError("");
  };

  const handleParse = () => {
    if (parsing) return;
    setParsing(true);
    setTimeout(() => {
      setParsing(false);
      onNext?.();
    }, 2200);
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
      <div className="analysis-page">
        {/* Top Row —— 返回 + 流程指示器 + 详情切换 */}
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

          {/* Workflow Stepper —— 创作全流程 */}
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
                    <div className={`wf-arrow ${status === "done" ? "active" : ""}`}>›</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 可折叠的信息面板触发器 */}
          <div className="info-toggles">
            <button
              className={`info-toggle ${infoOpen ? "open" : ""}`}
              onClick={() => setInfoOpen((prev) => !prev)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 7h18M3 12h18M3 17h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              详情
              <svg
                className="info-chevron"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 展开的信息面板（项目 + 剧本信息） */}
        {infoOpen && (
          <div className="info-dropdown">
            <div className="info-dropdown-card">
              <div className="info-dropdown-grid">
                <div className="info-dropdown-section">
                  <div className="info-dropdown-title">项目信息</div>
                  {projectInfo.map((item) => (
                    <div key={item.label} className="info-row">
                      <span className="info-label">{item.label}</span>
                      <span className="info-value">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="info-dropdown-section">
                  <div className="info-dropdown-title">剧本信息</div>
                  {scriptInfo.map((item) => (
                    <div key={item.label} className="info-row">
                      <span className="info-label">{item.label}</span>
                      <span
                        className={`info-value ${item.highlight ? "highlight" : ""}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 项目信息条 —— 放在剧本内容上方，可编辑 */}
        <div className="script-project-bar">
          <div className="script-project-field">
            <label className="script-project-label">项目名称</label>
            <input
              className="script-project-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="请输入项目名称"
            />
          </div>
          <div className="script-project-field script-project-field-ep">
            <label className="script-project-label">集数</label>
            <div className="script-project-ep-wrap">
              <span className="script-project-ep-prefix">第</span>
              <input
                className="script-project-input script-project-ep-input"
                value={episode}
                onChange={(e) => setEpisode(e.target.value)}
                placeholder="1"
              />
              <span className="script-project-ep-suffix">集</span>
            </div>
          </div>
        </div>

        {/* 剧本内容预览 —— 全宽，可编辑 */}
        <div className="script-card">
          <div className="script-card-header">
            <span className="script-card-title">剧本内容</span>
            <div className="script-card-right">
              <button className="reupload-btn" onClick={handleReuploadClick}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 14.97 20 13.54 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 9.03 4 10.46 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                    fill="currentColor"
                  />
                </svg>
                更换剧本
              </button>
            </div>
          </div>
          <textarea
            className="script-content"
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* 底部固定按钮 —— 解析 */}
      <div className="bottom-action-bar">
        <div className="model-selector-group">
          <span className="model-label">{selectedModel === "DeepSeek-V4" ? "智能推荐" : "自定义"}</span>
          <span className="model-divider">|</span>
          <div className="model-dropdown">
            <button
              className="model-dropdown-trigger"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
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
            {modelDropdownOpen && (
              <div className="model-dropdown-menu">
                {models.map((model) => (
                  <div
                    key={model}
                    className={`model-dropdown-item ${
                      selectedModel === model ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedModel(model);
                      setModelDropdownOpen(false);
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
          className={`bottom-next-btn ${parsing ? "loading" : ""}`}
          onClick={handleParse}
          disabled={parsing}
        >
          {parsing ? (
            <>
              <span className="parse-spinner" />
              解析中…
            </>
          ) : (
            <>
              <span>剧本解析</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </div>

      {/* 确认更换剧本弹框 */}
      {showReplaceConfirm && (
        <div className="modal-overlay" onClick={() => setShowReplaceConfirm(false)}>
          <div className="modal-dialog confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <p className="modal-confirm-text">现有剧本将会被覆盖，确认是否要更换剧本？</p>
            <div className="modal-btn-row">
              <button className="modal-btn modal-cancel" onClick={() => setShowReplaceConfirm(false)}>取消</button>
              <button className="modal-btn modal-confirm" onClick={handleConfirmReplace}>确认</button>
            </div>
          </div>
        </div>
      )}

      {/* 更换剧本弹框 */}
      {showReplaceModal && (
        <div className="modal-overlay" onClick={() => setShowReplaceModal(false)}>
          <div className="modal-dialog replace-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">更换剧本</span>
              <button className="modal-close" onClick={() => setShowReplaceModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="modal-replace-body">
              <div className="modal-upload-area">
                <div className="modal-upload-plus">+</div>
                <div className="modal-upload-text">
                  <div className="modal-upload-main">上传剧本</div>
                  <div className="modal-upload-sub">支持 .txt / .pdf</div>
                </div>
              </div>
              <textarea
                className="modal-replace-textarea"
                value={replaceText}
                onChange={(e) => {
                  setReplaceText(e.target.value);
                  if (replaceError) setReplaceError("");
                }}
                spellCheck={false}
                placeholder="开始创作"
              />
            </div>
            {replaceError && (
              <div className="modal-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 8V13M12 16V16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {replaceError}
              </div>
            )}
            <div className="modal-btn-row">
              <button className="modal-btn modal-cancel" onClick={() => setShowReplaceModal(false)}>取消</button>
              <button className="modal-btn modal-confirm" onClick={handleModalConfirm}>确认</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
