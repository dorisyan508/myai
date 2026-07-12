"use client";

import { useState } from "react";
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

// 当前页处于第三步「分镜脚本」
const CURRENT_STEP = 3;

type StoryboardShot = {
  id: number;
  scene: string;
  shot: string;
  description: string;
  dialogue: string;
  camera: string;
  duration: string;
};

// 初始分镜数据（可编辑）
const INITIAL_SHOTS: StoryboardShot[] = [
  {
    id: 1,
    scene: "第一幕 · 天机匣幻境",
    shot: "镜1-1",
    description: "金色空间全景，云雾缭绕，光芒从天机匣中迸发，阿离悬浮于半空，衣袂飘飞。",
    dialogue: "阿离（旁白）：这便是……天机匣中的世界？",
    camera: "广角 / 俯拍",
    duration: "5s",
  },
  {
    id: 2,
    scene: "第一幕 · 天机匣幻境",
    shot: "镜1-2",
    description: "云端近景，阿离缓缓睁开双眼，瞳孔映出金色光芒，表情从迷茫转为震撼。",
    dialogue: "阿离：师父留下的东西，竟然……",
    camera: "特写 / 正面",
    duration: "4s",
  },
  {
    id: 3,
    scene: "第一幕 · 天机匣幻境",
    shot: "镜1-3",
    description: "远处山峦剪影方向，一道黑影急速掠过，阿离猛然回头，目光警觉。",
    dialogue: "阿离：谁？！",
    camera: "中景 / 侧逆光",
    duration: "3s",
  },
  {
    id: 4,
    scene: "第二幕 · 客栈后山竹林",
    shot: "镜2-1",
    description: "雨夜竹林全景，竹叶被雨水打得低垂。老周头提着灯笼，沿着小径缓步前行。",
    dialogue: "老周头（自语）：这雨下得邪性……",
    camera: "全景 / 低角度跟拍",
    duration: "5s",
  },
  {
    id: 5,
    scene: "第二幕 · 客栈后山竹林",
    shot: "镜2-2",
    description: "竹林小径对峙区，黑袍人从暗处闪出，挡住老周头去路，雨水沿着面具滑落。",
    dialogue: "黑袍人：东西交出来，饶你不死。",
    camera: "中近景 / 正反打",
    duration: "4s",
  },
  {
    id: 6,
    scene: "第二幕 · 客栈后山竹林",
    shot: "镜2-3",
    description: "特写：老周头的手缓缓伸入包袱，指尖触碰到短剑的剑柄，雨水滴落在剑刃上。",
    dialogue: "老周头：年轻人，好大的口气。",
    camera: "大特写 / 手部",
    duration: "3s",
  },
  {
    id: 7,
    scene: "第三幕 · 江南古道",
    shot: "镜3-1",
    description: "黄昏雨中，驿道全景。柳大娘背着包袱，牵着小豆子，踩着青石板匆忙赶路。",
    dialogue: "柳大娘：快走，天黑前必须到客栈！",
    camera: "全景 / 平移",
    duration: "5s",
  },
  {
    id: 8,
    scene: "第三幕 · 江南古道",
    shot: "镜3-2",
    description: "小豆子回头望向身后，古镇方向火光冲天，浓烟在雨中弥漫。小豆子眼眶泛红。",
    dialogue: "小豆子：奶奶，我们的家……回不去了吗？",
    camera: "中景 / 过肩",
    duration: "4s",
  },
  {
    id: 9,
    scene: "第四幕 · 顺风客栈大堂",
    shot: "镜4-1",
    description: "客栈大堂全景，油灯昏黄。阿离坐在八仙桌旁，面前摆着木匣和铜锣，众人围坐。",
    dialogue: "阿离：天机匣已开，各位的秘密，也该说清楚了。",
    camera: "全景 / 缓慢推进",
    duration: "6s",
  },
  {
    id: 10,
    scene: "第四幕 · 顺风客栈大堂",
    shot: "镜4-2",
    description: "北侧柜台特写，算盘珠子被一只手缓缓拨动。镜头上摇，露出师父淡然的面容。",
    dialogue: "师父：你终究还是走到了这一步。",
    camera: "特写转中景 / 上摇",
    duration: "4s",
  },
  {
    id: 11,
    scene: "第五幕 · 二楼客房",
    shot: "镜5-1",
    description: "靠窗位置，阿离透过窗户望向后院方向。月光下，木匣开启发出柔和光芒。",
    dialogue: "阿离（内心）：原来……钥匙一直在你身上。",
    camera: "中景 / 侧逆光",
    duration: "5s",
  },
  {
    id: 12,
    scene: "第五幕 · 二楼客房",
    shot: "镜5-2",
    description: "黑袍人摘下青铜面具，露出与阿离相似的面容，脸颊上有一道旧疤。两人对视。",
    dialogue: "黑袍人（摘下面具）：好久不见……弟弟。",
    camera: "正反打 / 大特写",
    duration: "4s",
  },
];

export default function StoryboardPage({
  onBack,
  onNext,
  onHome,
  onAssetLibrary,
  onAssetLayer,
}: {
  onBack?: () => void;
  onNext?: (selectedShots: StoryboardShot[]) => void;
  onHome?: () => void;
  onAssetLibrary?: () => void;
  onAssetLayer?: (key: string) => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [shots, setShots] = useState<StoryboardShot[]>(INITIAL_SHOTS);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(INITIAL_SHOTS.map((s) => s.id))
  );
  const [selectedModel, setSelectedModel] = useState("Seedance2.0");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  const models = ["Seedance2.0", "可灵2.0", "通义万相-视频", "Runway-Gen3", "Pika2.0"];

  const toggleShot = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === shots.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(shots.map((s) => s.id)));
    }
  };

  const updateShot = (id: number, field: keyof StoryboardShot, value: string) => {
    setShots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // 视频文件列表（循环分配给每个镜头）
  const VIDEO_FILES = [
    "/视频/第1集-1-189033-天机匣-多图-user_15170076640.mp4",
    "/视频/第1集-2-189058-天机匣-多图-user_15170076640.mp4",
    "/视频/combined-video-1783406098199.mp4",
  ];

  const handleGenerateVideo = () => {
    if (generating || selectedIds.size === 0) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const selectedShots = shots.filter((s) => selectedIds.has(s.id));
      onNext?.(selectedShots);
    }, 3000);
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
      <div className="analysis-page storyboard-page">
        {/* Top Row */}
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

        {/* Storyboard Header */}
        <div className="storyboard-header">
          <label className="sb-select-all" onClick={toggleAll}>
            <div className={`sb-check ${selectedIds.size === shots.length ? "checked" : ""}`}>
              {selectedIds.size === shots.length && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                </svg>
              )}
            </div>
          </label>
          <span className="storyboard-meta">共 {shots.length} 个镜头</span>
        </div>

        {/* Storyboard List */}
        <div className="storyboard-list">
          {shots.map((shot) => {
            const isSelected = selectedIds.has(shot.id);
            return (
            <div
              key={shot.id}
              className={`storyboard-item ${isSelected ? "selected" : ""}`}
              onClick={() => toggleShot(shot.id)}
            >
              {/* Checkbox */}
              <div className={`sb-check ${isSelected ? "checked" : ""}`}>
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                  </svg>
                )}
              </div>

              {/* Shot number */}
              <div className="sb-shot-number">{shot.shot}</div>

              {/* Shot info */}
              <div className="sb-shot-body">
                <input
                  className="sb-edit-scene"
                  value={shot.scene}
                  onChange={(e) => updateShot(shot.id, "scene", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <textarea
                  className="sb-edit-desc"
                  value={shot.description}
                  onChange={(e) => updateShot(shot.id, "description", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  rows={2}
                />
                <textarea
                  className="sb-edit-dialogue"
                  value={shot.dialogue}
                  onChange={(e) => updateShot(shot.id, "dialogue", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  rows={1}
                />
              </div>

              {/* Shot meta */}
              <div className="sb-shot-meta">
                <input
                  className="sb-edit-cam"
                  value={shot.camera}
                  onChange={(e) => updateShot(shot.id, "camera", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <input
                  className="sb-edit-dur"
                  value={shot.duration}
                  onChange={(e) => updateShot(shot.id, "duration", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* 底部固定按钮 —— 下一步，生成分镜视频 */}
      <div className="bottom-action-bar">
        <div className="model-selector-group">
          <span className="model-label">{selectedModel === "Seedance2.0" ? "智能推荐" : "自定义"}</span>
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
          className={`bottom-next-btn ${generating ? "loading" : ""}`}
          onClick={handleGenerateVideo}
          disabled={generating || selectedIds.size === 0}
        >
          {generating ? (
            <>
              <span className="parse-spinner" />
              生成中…
            </>
          ) : (
            <>
              <span>{selectedIds.size > 0 ? `生成分镜视频（${selectedIds.size}/${shots.length}）` : "请选择镜头"}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
