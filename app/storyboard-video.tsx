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

const CURRENT_STEP = 4;

type VideoShot = {
  id: number;
  scene: string;
  shot: string;
  description: string;
  dialogue: string;
  camera: string;
  duration: string;
};

const VIDEO_SHOTS: VideoShot[] = [
  { id: 1, scene: "第一幕 · 天机匣幻境", shot: "镜1-1", description: "金色空间全景，云雾缭绕，光芒从天机匣中迸发，阿离悬浮于半空，衣袂飘飞。", dialogue: "阿离（旁白）：这便是……天机匣中的世界？", camera: "广角 / 俯拍", duration: "5s" },
  { id: 2, scene: "第一幕 · 天机匣幻境", shot: "镜1-2", description: "云端近景，阿离缓缓睁开双眼，瞳孔映出金色光芒，表情从迷茫转为震撼。", dialogue: "阿离：师父留下的东西，竟然……", camera: "特写 / 正面", duration: "4s" },
  { id: 3, scene: "第一幕 · 天机匣幻境", shot: "镜1-3", description: "远处山峦剪影方向，一道黑影急速掠过，阿离猛然回头，目光警觉。", dialogue: "阿离：谁？！", camera: "中景 / 侧逆光", duration: "3s" },
  { id: 4, scene: "第二幕 · 客栈后山竹林", shot: "镜2-1", description: "雨夜竹林全景，竹叶被雨水打得低垂。老周头提着灯笼，沿着小径缓步前行。", dialogue: "老周头（自语）：这雨下得邪性……", camera: "全景 / 低角度跟拍", duration: "5s" },
  { id: 5, scene: "第二幕 · 客栈后山竹林", shot: "镜2-2", description: "竹林小径对峙区，黑袍人从暗处闪出，挡住老周头去路，雨水沿着面具滑落。", dialogue: "黑袍人：东西交出来，饶你不死。", camera: "中近景 / 正反打", duration: "4s" },
  { id: 6, scene: "第二幕 · 客栈后山竹林", shot: "镜2-3", description: "特写：老周头的手缓缓伸入包袱，指尖触碰到短剑的剑柄，雨水滴落在剑刃上。", dialogue: "老周头：年轻人，好大的口气。", camera: "大特写 / 手部", duration: "3s" },
  { id: 7, scene: "第三幕 · 江南古道", shot: "镜3-1", description: "黄昏雨中，驿道全景。柳大娘背着包袱，牵着小豆子，踩着青石板匆忙赶路。", dialogue: "柳大娘：快走，天黑前必须到客栈！", camera: "全景 / 平移", duration: "5s" },
  { id: 8, scene: "第三幕 · 江南古道", shot: "镜3-2", description: "小豆子回头望向身后，古镇方向火光冲天，浓烟在雨中弥漫。小豆子眼眶泛红。", dialogue: "小豆子：奶奶，我们的家……回不去了吗？", camera: "中景 / 过肩", duration: "4s" },
  { id: 9, scene: "第四幕 · 顺风客栈大堂", shot: "镜4-1", description: "客栈大堂全景，油灯昏黄。阿离坐在八仙桌旁，面前摆着木匣和铜锣，众人围坐。", dialogue: "阿离：天机匣已开，各位的秘密，也该说清楚了。", camera: "全景 / 缓慢推进", duration: "6s" },
  { id: 10, scene: "第四幕 · 顺风客栈大堂", shot: "镜4-2", description: "北侧柜台特写，算盘珠子被一只手缓缓拨动。镜头上摇，露出师父淡然的面容。", dialogue: "师父：你终究还是走到了这一步。", camera: "特写转中景 / 上摇", duration: "4s" },
  { id: 11, scene: "第五幕 · 二楼客房", shot: "镜5-1", description: "靠窗位置，阿离透过窗户望向后院方向。月光下，木匣开启发出柔和光芒。", dialogue: "阿离（内心）：原来……钥匙一直在你身上。", camera: "中景 / 侧逆光", duration: "5s" },
  { id: 12, scene: "第五幕 · 二楼客房", shot: "镜5-2", description: "黑袍人摘下青铜面具，露出与阿离相似的面容，脸颊上有一道旧疤。两人对视。", dialogue: "黑袍人（摘下面具）：好久不见……弟弟。", camera: "正反打 / 大特写", duration: "4s" },
];

const VIDEO_FILES = [
  "/视频/第1集-1-189033-天机匣-多图-user_15170076640.mp4",
  "/视频/第1集-2-189058-天机匣-多图-user_15170076640.mp4",
  "/视频/combined-video-1783406098199.mp4",
];

export default function StoryboardVideoPage({
  shots,
  onBack,
  onNext,
  onHome,
  onAssetLibrary,
  onAssetLayer,
}: {
  shots?: VideoShot[];
  onBack?: () => void;
  onNext?: () => void;
  onHome?: () => void;
  onAssetLibrary?: () => void;
  onAssetLayer?: (key: string) => void;
}) {
  const displayShots = shots && shots.length > 0 ? shots : VIDEO_SHOTS;
  const [regeneratingIds, setRegeneratingIds] = useState<Set<number>>(new Set());
  const [selectedModel, setSelectedModel] = useState("Seedance2.0");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [synthesizing, setSynthesizing] = useState(false);
  const models = ["Seedance2.0", "可灵2.0", "通义万相-视频", "Runway-Gen3", "Pika2.0"];

  const handleRegenerate = (id: number) => {
    setRegeneratingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setRegeneratingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2000);
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

      {/* Content */}
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
          <span className="storyboard-meta">共 {displayShots.length} 个镜头</span>
        </div>

        {/* Video List */}
        <div className="storyboard-list">
          {displayShots.map((shot, idx) => {
            const videoSrc = VIDEO_FILES[idx % VIDEO_FILES.length];
            return (
              <div key={shot.id} className="storyboard-item sb-video-item">
                <div className="sb-shot-number">{shot.shot}</div>
                <div className="sb-shot-body">
                  <div className="sb-scene">{shot.scene}</div>
                  <div className="sb-label">画面描述</div>
                  <div className="sb-text">{shot.description}</div>
                  <div className="sb-label">台词 / 对白</div>
                  <div className="sb-dialogue">{shot.dialogue}</div>
                  <div className="sb-tags">
                    <span className="tag-cam">{shot.camera}</span>
                    <span className="tag-dur">{shot.duration}</span>
                  </div>
                </div>
                <div className="sb-shot-video">
                  {/* eslint-disable-next-line @next/next/no-html-element-for-videos */}
                  <video src={videoSrc} controls loop muted playsInline />
                  <div className="sb-video-actions">
                    <button
                      className="sb-video-action"
                      title="重新生成"
                      onClick={() => handleRegenerate(shot.id)}
                      disabled={regeneratingIds.has(shot.id)}
                    >
                      {regeneratingIds.has(shot.id) ? (
                        <span className="parse-spinner" />
                      ) : (
                        <svg width="22" height="22" viewBox="-1 0 22 20" fill="none">
                          <path d="M5 1L6.2 4.8L10 6L6.2 7.2L5 11L3.8 7.2L0 6L3.8 4.8Z" fill="currentColor" />
                          <path d="M15 2L15.8 4.2L18 5L15.8 5.8L15 8L14.2 5.8L12 5L14.2 4.2Z" fill="currentColor" />
                          <path d="M19 14L19.5 15.5L21 16L19.5 16.5L19 18L18.5 16.5L17 16L18.5 15.5Z" fill="currentColor" opacity="0.6" />
                        </svg>
                      )}
                    </button>
                    <a
                      className="sb-video-action"
                      title="下载视频"
                      href={videoSrc}
                      download
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部固定按钮 —— 合成视频 */}
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
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {modelDropdownOpen && (
              <div className="model-dropdown-menu">
                {models.map((model) => (
                  <div
                    key={model}
                    className={`model-dropdown-item ${selectedModel === model ? "selected" : ""}`}
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
          className={`bottom-next-btn ${synthesizing ? "loading" : ""}`}
          onClick={() => {
            if (synthesizing) return;
            setSynthesizing(true);
            setTimeout(() => {
              setSynthesizing(false);
              onNext?.();
            }, 3000);
          }}
          disabled={synthesizing}
        >
          {synthesizing ? (
            <>
              <span className="parse-spinner" />
              合成中…
            </>
          ) : (
            <>
              <span>合成视频</span>
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
