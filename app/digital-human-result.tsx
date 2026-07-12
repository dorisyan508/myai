"use client";

import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import Navbar from "./components/Navbar";

interface DigitalHumanResultPageProps {
  prompt: string;
  videoName: string | null;
  model: string;
  onBack: () => void;
  onHome: () => void;
  onAssetLibrary: () => void;
  onAssetLayer: (key: string) => void;
}

export default function DigitalHumanResultPage({
  prompt,
  videoName,
  model,
  onBack,
  onHome,
  onAssetLibrary,
  onAssetLayer,
}: DigitalHumanResultPageProps) {
  const [voiceOption, setVoiceOption] = useState<"my-voice" | "clone-voice">("my-voice");
  const [dhTypes, setDhTypes] = useState<Set<string>>(new Set(["4k"]));
  const [generating, setGenerating] = useState(false);
  const [genCount, setGenCount] = useState(1);
  const [saved, setSaved] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState(model);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const dhModels = ["Seedance 2.0", "Kling 3.0 Turbo", "Kling 3.0", "Kling 3.0 Omni", "Kling O1"];
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("/视频/combined-video-1783406098199.mp4");
  const [currentVideoName, setCurrentVideoName] = useState(videoName ?? "人物参考视频.mp4");
  const [dotsOpenIdx, setDotsOpenIdx] = useState<number | null>(null);

  const toggleDhType = (type: string) => {
    setDhTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const handleReupload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentVideoSrc(url);
      setCurrentVideoName(file.name);
    }
  };

  const dhPortraitPool = ["/数字人/真人.jpg", "/数字人/真人2.jpg"];

  const handleGenerate = () => {
    setGenerating(true);
    setSaved(false);
    setShowResult(true);
    setTimeout(() => {
      setGenerating(false);
      const img = dhPortraitPool[genCount % dhPortraitPool.length];
      setResultImages((prev) => [...prev, img]);
      setGenCount((c) => c + 1);
    }, 2500);
  };

  const handleSave = () => {
    setSaved(true);
  };

  const handleRegenerate = () => {
    setGenerating(true);
    setSaved(false);
    setTimeout(() => {
      setGenerating(false);
      const img = dhPortraitPool[genCount % dhPortraitPool.length];
      setResultImages((prev) => [...prev, img]);
      setGenCount((c) => c + 1);
    }, 2500);
  };

  return (
    <div className="page dh-result-page">
      {/* Dark solid background */}
      <div className="dh-result-bg" />

      <Navbar onAssetLibrary={onAssetLibrary} onAssetLayer={onAssetLayer} activeNav="home" />

      <div className="dh-result-container">
        {/* Breadcrumb */}
        <div className="dh-result-breadcrumb">
          <span className="dh-result-crumb" onClick={onHome}>首页</span>
          <span className="dh-result-crumb-sep">/</span>
          <span className="dh-result-crumb-current">数字人生成</span>
        </div>

        {/* Main two-column layout: left = video + settings, right = results */}
        <div className="dh-result-split">
          {/* Left column: video + settings */}
          <div className="dh-result-left">
            {/* Reference video */}
            <div className="dh-result-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
              </svg>
              参考视频
              <button className="dh-result-reupload-btn" onClick={() => fileInputRef.current?.click()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                重新上传
              </button>
              <input ref={fileInputRef} type="file" accept="video/*" onChange={handleReupload} style={{ display: "none" }} />
            </div>
            <div className="dh-result-video-player">
              <video
                ref={videoRef}
                className="dh-result-video-el"
                controls
                playsInline
                poster="/数字人/真人.jpg"
              >
                <source src={currentVideoSrc} type="video/mp4" />
              </video>
              <div className="dh-result-video-file">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span>{currentVideoName}</span>
              </div>
            </div>

            {/* Voice settings */}
            <div className="dh-result-settings-group">
              <div className="dh-result-section-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                声音设置
              </div>
              <div className="dh-result-options">
                <div
                  className={`dh-result-option ${voiceOption === "my-voice" ? "active" : ""}`}
                  onClick={() => setVoiceOption("my-voice")}
                >
                  <div className="dh-result-option-radio">
                    <div className={`dh-result-option-radio-dot ${voiceOption === "my-voice" ? "checked" : ""}`} />
                  </div>
                  <div className="dh-result-option-body">
                    <div className="dh-result-option-title">用我的声音</div>
                    <div className="dh-result-option-desc">使用您本人的声音进行配音</div>
                  </div>
                </div>
                <div
                  className={`dh-result-option ${voiceOption === "clone-voice" ? "active" : ""}`}
                  onClick={() => setVoiceOption("clone-voice")}
                >
                  <div className="dh-result-option-radio">
                    <div className={`dh-result-option-radio-dot ${voiceOption === "clone-voice" ? "checked" : ""}`} />
                  </div>
                  <div className="dh-result-option-body">
                    <div className="dh-result-option-title">克隆视频的声音</div>
                    <div className="dh-result-option-desc">AI自动提取并克隆参考视频中的声音特征</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital human type */}
            <div className="dh-result-settings-group">
              <div className="dh-result-section-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19a4 4 0 00-4-4H8a4 4 0 00-4 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2v8M8 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                数字人设置
              </div>
              <div className="dh-result-type-grid">
                <div
                  className={`dh-result-type-card ${dhTypes.has("4k") ? "active" : ""}`}
                  onClick={() => toggleDhType("4k")}
                >
                  <div className="dh-result-type-checkbox">
                    {dhTypes.has("4k") && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="dh-result-type-badge">4K</div>
                  <div className="dh-result-type-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 10v4M7 12h3M10 10v4M14 10v4l2-2m0 2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="dh-result-type-name">4K数字人</div>
                  <div className="dh-result-type-desc">超高清画质，细节更丰富</div>
                </div>
                <div
                  className={`dh-result-type-card ${dhTypes.has("bg-change") ? "active" : ""}`}
                  onClick={() => toggleDhType("bg-change")}
                >
                  <div className="dh-result-type-checkbox">
                    {dhTypes.has("bg-change") && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="dh-result-type-badge">BG</div>
                  <div className="dh-result-type-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M2 7l10 5 10-5M12 12v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="dh-result-type-name">可换背景数字人</div>
                  <div className="dh-result-type-desc">自由替换场景背景</div>
                </div>
              </div>
            </div>

            {/* Model selector + generate button */}
            <div className="dh-result-bottom-row">
              <div className="model-selector-group">
                <span className="model-label">{selectedModel === "Seedance 2.0" ? "智能推荐" : "自定义"}</span>
                <span className="model-divider">|</span>
                <div className="model-dropdown">
                  <button
                    className="model-dropdown-trigger"
                    onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  >
                    {selectedModel}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {modelDropdownOpen && (
                    <div className="model-dropdown-menu">
                      {dhModels.map((m) => (
                        <div
                          key={m}
                          className={`model-dropdown-item ${selectedModel === m ? "selected" : ""}`}
                          onClick={() => {
                            setSelectedModel(m);
                            setModelDropdownOpen(false);
                          }}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button className="dh-result-btn dh-result-btn-primary" onClick={handleGenerate} disabled={generating}>
                {generating ? (
                  <>
                    <div className="dh-result-btn-spinner" />
                    生成中...
                  </>
                ) : (
                  "生成数字人"
                )}
              </button>
            </div>
          </div>

          {/* Right column: generation results (inline, no overlay) */}
          <div className="dh-result-right">
            <div className="dh-result-gen-header">
              <div className="dh-result-gen-header-left">
                生成结果
                {resultImages.length > 0 && <span className="dh-gen-count">共 {resultImages.length} 个</span>}
              </div>
            </div>

            <div className="dh-result-gen-area">
              {resultImages.length === 0 && !generating ? (
                <div className="dh-result-gen-empty">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.2 }}>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M10 9l5 3-5 3V9z" fill="currentColor" opacity="0.3" />
                  </svg>
                  <div className="dh-result-gen-empty-text">点击「生成数字人」按钮</div>
                  <div className="dh-result-gen-empty-sub">生成的数字人将显示在这里</div>
                </div>
              ) : (
                <div className="dh-gen-result-grid">
                  {resultImages.map((img, idx) => (
                    <div key={idx} className={`dh-gen-result-card ${idx === resultImages.length - 1 && !generating ? "latest" : ""}`}>
                      <div className="dh-gen-result-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`数字人 ${idx + 1}`} />
                        <div className="dh-gen-result-tag">v{idx + 1}</div>
                        {idx === resultImages.length - 1 && !generating && <div className="dh-gen-result-latest-badge">最新</div>}
                        <div className="dh-gen-result-dots" onClick={(e) => { e.stopPropagation(); setDotsOpenIdx(dotsOpenIdx === idx ? null : idx); }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="19" r="2" />
                          </svg>
                          {dotsOpenIdx === idx && (
                            <div className="dh-gen-dots-menu" onClick={(e) => e.stopPropagation()}>
                              <button className="dh-gen-dots-item" onClick={() => { handleSave(); setDotsOpenIdx(null); }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 3H19V21L12 17L5 21V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                                保存
                              </button>
                              <button className="dh-gen-dots-item" onClick={() => setDotsOpenIdx(null)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 3V15M12 15L7 10M12 15L17 10M5 21H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                下载
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Generating placeholder card */}
                  {generating && (
                    <div className="dh-gen-result-card dh-gen-result-card-loading">
                      <div className="dh-gen-loading-placeholder">
                        <div className="dh-gen-loading-spinner" />
                        <div className="dh-gen-loading-text">正在生成数字人...</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
