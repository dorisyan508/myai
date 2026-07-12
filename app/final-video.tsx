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

const CURRENT_STEP = 5;

const FINAL_VIDEO = "/视频/combined-video-1783406098199.mp4";

type Platform = {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  category: "short-video" | "drama";
};

const PLATFORMS: Platform[] = [
  // 短视频平台
  {
    id: "douyin",
    name: "抖音",
    color: "#000000",
    category: "short-video",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .59.04.87.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 005.37 20.1a6.34 6.34 0 0010.49-4.78v-7a8.16 8.16 0 004.78 1.52v-3.4a4.85 4.85 0 01-1.05-.75z" />
      </svg>
    ),
  },
  {
    id: "kuaishou",
    name: "快手",
    color: "#FF4906",
    category: "short-video",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 2h-3.2l1.2 4.5-2.3 1L9.2 2H6l3.4 7.1-2.8 1.2L2 2v6.5l4.8 10.8L9.6 22l2.2-4.8 4.8 4.8h3.4l-2.6-5.6L22 14.8V8.3l-4.5-6.3z" />
      </svg>
    ),
  },
  {
    id: "bilibili",
    name: "哔哩哔哩",
    color: "#FB7299",
    category: "short-video",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.77-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 01.16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zm2.347 3.293c.356 0 .658.124.907.373l.027.027c.267.249.391.551.391.907v1.173c0 .356-.124.658-.373.907-.249.267-.551.391-.907.391-.355 0-.666-.124-.933-.373-.249-.249-.373-.56-.373-.925V11.84c0-.356.124-.658.373-.907.249-.249.56-.373.933-.373zm8.64 0c.356 0 .658.124.907.373.249.249.373.551.373.907v1.173c0 .356-.124.658-.373.907-.249.249-.56.373-.925.373-.356 0-.667-.124-.916-.373-.249-.249-.373-.56-.373-.925V11.84c0-.356.124-.658.373-.907.249-.249.56-.373.933-.373z" />
      </svg>
    ),
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    color: "#FE2C55",
    category: "short-video",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm9.5 4.5c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8v6.8c0 .3.1.6.3.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8V8.6c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.8-.3zm-4.2 0c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8v6.8c0 .3.1.6.3.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8V8.6c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.8-.3zm8.4 0c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8v6.8c0 .3.1.6.3.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.3-.5.3-.8V8.6c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.8-.3z" />
      </svg>
    ),
  },
  {
    id: "weishi",
    name: "微视",
    color: "#1296DB",
    category: "short-video",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
  // 短剧分发平台
  {
    id: "dianzhongdian",
    name: "点众短剧",
    color: "#FF6B35",
    category: "drama",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "jiuqu",
    name: "九州短剧",
    color: "#7C3AED",
    category: "drama",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "fengyu",
    name: "枫叶短剧",
    color: "#DC2626",
    category: "drama",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "haishu",
    name: "海视短剧",
    color: "#059669",
    category: "drama",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M7 10h10M7 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "tianguang",
    name: "天光剧场",
    color: "#D97706",
    category: "drama",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M9 8v8M15 8v8M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "mengxing",
    name: "梦星短剧",
    color: "#4F46E5",
    category: "drama",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function FinalVideoPage({
  onBack,
  onHome,
  onAssetLibrary,
  onAssetLayer,
}: {
  onBack?: () => void;
  onHome?: () => void;
  onAssetLibrary?: () => void;
  onAssetLayer?: (key: string) => void;
}) {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [publishedPlatforms, setPublishedPlatforms] = useState<Set<string>>(new Set());
  const [publishing, setPublishing] = useState(false);

  const shortVideoPlatforms = PLATFORMS.filter((p) => p.category === "short-video");
  const dramaPlatforms = PLATFORMS.filter((p) => p.category === "drama");

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePublish = () => {
    if (selectedPlatforms.size === 0 || publishing) return;
    setPublishing(true);
    setTimeout(() => {
      setPublishedPlatforms((prev) => {
        const merged = new Set(prev);
        selectedPlatforms.forEach((id) => merged.add(id));
        return merged;
      });
      setPublishing(false);
      setShowPublishModal(false);
    }, 2500);
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
      <div className="analysis-page final-video-page">
        {/* Top Row */}
        <div className="analysis-top-row">
          <button className="analysis-back" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Workflow Stepper */}
          <div className="workflow-stepper">
            {WORKFLOW_STEPS.map((step, index) => {
              const status = step.id < CURRENT_STEP ? "done" : step.id === CURRENT_STEP ? "active" : "pending";
              return (
                <div key={step.id} className="wf-step-wrap">
                  <div className={`workflow-step ${status}`}>
                    <div className="workflow-step-circle">
                      {status === "done" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
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

          <div className="info-toggles">
            <button className="info-toggle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 7h18M3 12h18M3 17h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              详情
            </button>
          </div>
        </div>

        {/* Main Content: Video centered + action buttons */}
        <div className="final-video-main">
          <div className="final-video-card">
            <div className="final-video-header">
              <span className="final-video-title">天机匣 · 第1集 · 合成成片</span>
              <span className="final-video-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                </svg>
                合成完成
              </span>
            </div>
            <div className="final-video-player">
              {/* eslint-disable-next-line @next/next/no-html-element-for-videos */}
              <video src={FINAL_VIDEO} controls loop playsInline />
            </div>
            <div className="final-video-info">
              <div className="final-video-info-item">
                <span className="final-info-label">分辨率</span>
                <span className="final-info-value">1080P</span>
              </div>
              <div className="final-video-info-item">
                <span className="final-info-label">时长</span>
                <span className="final-info-value">01:32</span>
              </div>
              <div className="final-video-info-item">
                <span className="final-info-label">合成模型</span>
                <span className="final-info-value">Seedance2.0</span>
              </div>
              <div className="final-video-info-item">
                <span className="final-info-label">文件大小</span>
                <span className="final-info-value">48.6 MB</span>
              </div>
              <div className="final-video-info-item">
                <span className="final-info-label">发布状态</span>
                <span className="final-info-value final-info-published">
                  {publishedPlatforms.size > 0 ? `已分发 ${publishedPlatforms.size} 个平台` : "未分发"}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="final-action-row">
            <a className="final-action-btn final-action-download" href={FINAL_VIDEO} download>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              下载视频
            </a>
            <button className="final-action-btn final-action-publish" onClick={() => setShowPublishModal(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V7l-9-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              一键分发
              {publishedPlatforms.size > 0 && (
                <span className="final-publish-badge">{publishedPlatforms.size}</span>
              )}
            </button>
          </div>
        </div>

      {/* 一键分发弹框 */}
      {showPublishModal && (
        <div className="modal-overlay" onClick={() => !publishing && setShowPublishModal(false)}>
          <div className="modal-dialog publish-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">一键分发</span>
              <button className="modal-close" onClick={() => !publishing && setShowPublishModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="publish-modal-body">
              {/* 短视频平台 */}
              <div className="publish-section">
                <div className="publish-section-title">短视频平台</div>
                <div className="publish-grid">
                  {shortVideoPlatforms.map((p) => {
                    const isSelected = selectedPlatforms.has(p.id);
                    const isPublished = publishedPlatforms.has(p.id);
                    return (
                      <button
                        key={p.id}
                        className={`publish-platform-item ${isSelected ? "selected" : ""} ${isPublished ? "published" : ""}`}
                        onClick={() => togglePlatform(p.id)}
                      >
                        <span className="publish-platform-icon" style={{ color: p.color }}>
                          {p.icon}
                        </span>
                        <span className="publish-platform-name">{p.name}</span>
                        {isPublished && <span className="publish-platform-tag">已发布</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 短剧分发平台 */}
              <div className="publish-section">
                <div className="publish-section-title">短剧分发平台</div>
                <div className="publish-grid">
                  {dramaPlatforms.map((p) => {
                    const isSelected = selectedPlatforms.has(p.id);
                    const isPublished = publishedPlatforms.has(p.id);
                    return (
                      <button
                        key={p.id}
                        className={`publish-platform-item ${isSelected ? "selected" : ""} ${isPublished ? "published" : ""}`}
                        onClick={() => togglePlatform(p.id)}
                      >
                        <span className="publish-platform-icon" style={{ color: p.color }}>
                          {p.icon}
                        </span>
                        <span className="publish-platform-name">{p.name}</span>
                        {isPublished && <span className="publish-platform-tag">已发布</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="publish-modal-footer">
              <span className="publish-selected-count">
                已选 {selectedPlatforms.size} 个平台
              </span>
              <button
                className={`publish-confirm-btn ${publishing ? "loading" : ""}`}
                onClick={handlePublish}
                disabled={selectedPlatforms.size === 0 || publishing}
              >
                {publishing ? (
                  <>
                    <span className="parse-spinner" />
                    分发中…
                  </>
                ) : (
                  <>确认分发</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
