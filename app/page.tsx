"use client";

import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import Navbar from "./components/Navbar";
import ScriptAnalysisPage from "./script-analysis";
import AssetExtractionPage from "./asset-extraction";
import StoryboardPage from "./storyboard";
import StoryboardVideoPage from "./storyboard-video";
import FinalVideoPage from "./final-video";
import DigitalAssetLibraryPage from "./digital-asset-library";
import DigitalHumanResultPage from "./digital-human-result";
import PromoAgentPage from "./promo-agent";

type AgentTab = {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("drama");
  const [inputValue, setInputValue] = useState("");
  const [dhInputValue, setDhInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState("DeepSeek-V4");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [dhSelectedModel, setDhSelectedModel] = useState("Seedance 2.0");
  const [dhModelDropdownOpen, setDhModelDropdownOpen] = useState(false);
  const [dhVideoName, setDhVideoName] = useState<string | null>(null);
  const [view, setView] = useState<"home" | "script-analysis" | "asset-extraction" | "storyboard" | "storyboard-video" | "final-video" | "asset-library" | "dh-result" | "promo-agent">("home");
  const [promoProject, setPromoProject] = useState("");
  const [promoEpisode, setPromoEpisode] = useState("");
  const [promoTempProject, setPromoTempProject] = useState("");
  const [promoDropdownStep, setPromoDropdownStep] = useState<"project" | "episode">("project");
  const [promoDropdownOpen, setPromoDropdownOpen] = useState(false);
  const [videoShots, setVideoShots] = useState<any[]>([]);
  const [assetCategories, setAssetCategories] = useState<any[] | null>(null);
  const [assetLayer, setAssetLayer] = useState<string | null>(null);
  const [promoFromNav, setPromoFromNav] = useState(false);

  const models = ["DeepSeek-V4", "GLM-5.2", "豆包-Pro", "Kimi-K2", "Qwen-Max"];
  const dhModels = ["Seedance 2.0", "Kling 3.0 Turbo", "Kling 3.0", "Kling 3.0 Omni", "Kling O1"];
  const promoProjects = [
    { project: "天机匣", episodes: ["第1集：雨夜惊变", "第2集：客栈风云"] },
    { project: "剑来", episodes: ["第1集：少年持剑", "第2集：剑气长城"] },
    { project: "长安十二时辰", episodes: ["第3集：暗夜追凶", "第5集：上元灯会"] },
  ];
  const dhDefaultPrompt = "基于上传的参考视频，生成一名通用型数字人形象。要求：面部特征与视频中人物保持一致，表情自然生动，支持多角度展示。请根据提示词描述设定人物的外貌、服装、气质及适用场景，生成适合短剧拍摄使用的数字人形象。";

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 45 });

  useEffect(() => {
    const updateOrigin = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setOrigin({
          x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
          y: (rect.top / window.innerHeight) * 100,
        });
      }
    };
    updateOrigin();
    window.addEventListener("resize", updateOrigin);
    return () => window.removeEventListener("resize", updateOrigin);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        xEnd: (Math.random() - 0.5) * 200,
        yEnd: -(Math.random() * 500 + 200),
        size: Math.random() * 2 + 1,
        duration: Math.random() * 6 + 5,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.15,
      })),
    []
  );

  const smoke = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        xEnd: (Math.random() - 0.5) * 150,
        yEnd: -(Math.random() * 400 + 300),
        size: Math.random() * 40 + 20,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 15,
        opacity: Math.random() * 0.06 + 0.03,
      })),
    []
  );

  const handleToggle = () => {
    setModelDropdownOpen(false);
  };

  const tabs: AgentTab[] = [
    {
      id: "drama",
      label: "短剧 Agent",
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {active && (
            <defs>
              <linearGradient id="iconDrama" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#F49169" />
                <stop offset="100%" stopColor="#F4BE79" />
              </linearGradient>
            </defs>
          )}
          {/* Clapperboard top stripes */}
          <path
            d="M3 7L5 3L8.5 4.2L6.5 8H3V7Z"
            fill={active ? "url(#iconDrama)" : "none"}
            stroke={active ? "url(#iconDrama)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 8L10 4L13.5 5.2L11.5 8H8Z"
            fill={active ? "url(#iconDrama)" : "none"}
            stroke={active ? "url(#iconDrama)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M13 8L15 4L18.5 5.2L16.5 8H13Z"
            fill={active ? "url(#iconDrama)" : "none"}
            stroke={active ? "url(#iconDrama)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Clapperboard body */}
          <rect
            x="3"
            y="8.5"
            width="18"
            height="12.5"
            rx="1.5"
            fill={active ? "url(#iconDrama)" : "none"}
            fillOpacity={active ? 0.25 : 0}
            stroke={active ? "url(#iconDrama)" : "#E8DABC"}
            strokeWidth="1.5"
          />
          {/* Play button */}
          <path
            d="M10 13L15 16L10 19V13Z"
            fill={active ? "url(#iconDrama)" : "none"}
            stroke={active ? "url(#iconDrama)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "promo",
      label: "宣发 Agent",
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {active && (
            <defs>
              <linearGradient id="iconPromo" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#F49169" />
                <stop offset="100%" stopColor="#F4BE79" />
              </linearGradient>
            </defs>
          )}
          {/* Megaphone body */}
          <path
            d="M3 10V14C3 14.5 3.4 15 4 15H6L14 19V5L6 9H4C3.4 9 3 9.4 3 10Z"
            fill={active ? "url(#iconPromo)" : "none"}
            fillOpacity={active ? 0.25 : 0}
            stroke={active ? "url(#iconPromo)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Sound waves */}
          <path
            d="M17 9C18 10 18 14 17 15"
            stroke={active ? "url(#iconPromo)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M19.5 7C21.5 9.5 21.5 14.5 19.5 17"
            stroke={active ? "url(#iconPromo)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      id: "digital",
      label: "数字人",
      icon: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {active && (
            <defs>
              <linearGradient id="iconDigital" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#F49169" />
                <stop offset="100%" stopColor="#F4BE79" />
              </linearGradient>
            </defs>
          )}
          {/* Hexagonal head (closed) */}
          <path
            d="M12 2 L17 5 V10 L12 13 L7 10 V5 Z"
            fill={active ? "url(#iconDigital)" : "none"}
            fillOpacity={active ? 0.25 : 0}
            stroke={active ? "url(#iconDigital)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Face/screen bar (closed) */}
          <rect
            x="9.5"
            y="6"
            width="5"
            height="2"
            rx="1"
            fill={active ? "url(#iconDigital)" : "none"}
            stroke={active ? "url(#iconDigital)" : "#E8DABC"}
            strokeWidth="1"
          />
          {/* Body — closed shoulders/torso */}
          <path
            d="M4 22 C4 17 7 14.5 12 14.5 C17 14.5 20 17 20 22 Z"
            fill={active ? "url(#iconDigital)" : "none"}
            fillOpacity={active ? 0.25 : 0}
            stroke={active ? "url(#iconDigital)" : "#E8DABC"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const homePage = (
    <div className="page">
      {/* Background */}
      <div className="bg-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg-image" src="/bg.png" alt="" />
        <div className="bg-overlay" />
      </div>

      {/* Stars animation */}
      <div
        className="stars-container"
        style={{ top: `${origin.y}%` }}
      >
        {smoke.map((s) => (
          <div
            key={`smoke-${s.id}`}
            className="smoke"
            style={
              {
                left: `${s.left}%`,
                "--x-end": `${s.xEnd}px`,
                "--y-end": `${s.yEnd}px`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
                opacity: s.opacity,
              } as React.CSSProperties
            }
          />
        ))}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={
              {
                left: `${star.left}%`,
                "--x-end": `${star.xEnd}px`,
                "--y-end": `${star.yEnd}px`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
                opacity: star.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Robot Character */}
      <div className="robot-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="robot-image" src="/machine.png" alt="AI Director" />
      </div>

      {/* Navigation Bar */}
      <Navbar onHome={() => setView("home")} onAgent={(type) => { if (type === "promo") { setPromoFromNav(true); setView("promo-agent"); } else setView("script-analysis"); }} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} activeNav="home" />

      {/* Hero Section */}
      <section className="hero">
        {/* Headline */}
        <div className="headline">
          <span className="headline-line1">天工开物</span>
          <span className="headline-line2">短剧智能创作平台</span>
        </div>

        {/* Agent Tabs */}
        <div className="agent-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`agent-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon(activeTab === tab.id)}</span>
              {tab.label}
            </div>
          ))}
        </div>

        {/* Creation Card */}
        <div className="creation-card">
          {activeTab === "digital" ? (
            <Fragment key="tab-digital">
              {/* Video Upload Area */}
              <div className="upload-area" onClick={() => setDhVideoName("人物参考视频.mp4")} style={{ cursor: "pointer" }}>
                <div className="upload-plus">+</div>
                <div className="upload-text">
                  <div className="main">上传视频</div>
                  <div className="sub">{dhVideoName ?? "支持 .mp4 / .mov"}</div>
                </div>
              </div>
        
              {/* Input Area — Digital Human */}
              <div className="input-area">
                <textarea
                  ref={inputRef}
                  className="input-field"
                  placeholder={dhDefaultPrompt}
                  value={dhInputValue}
                  onChange={(e) => setDhInputValue(e.target.value)}
                />
        
                {/* Right Panel */}
                <div className="right-panel">
                  <div className="model-selector-group">
                    <span className="model-label">{dhSelectedModel === "Seedance 2.0" ? "智能推荐" : "自定义"}</span>
                    <span className="model-divider">|</span>
                    <div className="model-dropdown">
                      <button
                        className="model-dropdown-trigger"
                        onClick={() => setDhModelDropdownOpen(!dhModelDropdownOpen)}
                      >
                        {dhSelectedModel}
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
                      {dhModelDropdownOpen && (
                        <div className="model-dropdown-menu">
                          {dhModels.map((model) => (
                            <div
                              key={model}
                              className={`model-dropdown-item ${dhSelectedModel === model ? "selected" : ""}`}
                              onClick={() => {
                                setDhSelectedModel(model);
                                setDhModelDropdownOpen(false);
                              }}
                            >
                              {model}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
        
                  <button className="start-btn" onClick={() => setView("dh-result")}>生成数字人</button>
                </div>
              </div>
            </Fragment>
          ) : activeTab === "promo" ? (
            <Fragment key="tab-promo">
              <div className="input-area promo-home-input-area">
                <div className="promo-home-field">
                  <div
                    className="promo-home-select-box"
                    onClick={() => {
                      if (!promoDropdownOpen) setPromoDropdownStep("project");
                      setPromoDropdownOpen(!promoDropdownOpen);
                    }}
                  >
                    {promoProject ? (
                      <span className="promo-home-selected-text">《{promoProject}》{promoEpisode || ""}</span>
                    ) : (
                      <span className="promo-home-placeholder">选择项目/剧集</span>
                    )}
                    <svg className="promo-home-caret" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {promoDropdownOpen && (
                    <div className="promo-home-dropdown">
                      {promoDropdownStep === "project" ? (
                        <>
                          <div className="promo-home-dropdown-head">
                            <span>选择项目</span>
                          </div>
                          {promoProjects.map((p, idx) => (
                            <button
                              key={idx}
                              className={`promo-home-dropdown-item promo-home-dropdown-single ${promoTempProject === p.project ? "selected" : ""}`}
                              onClick={() => {
                                setPromoTempProject(p.project);
                                setPromoDropdownStep("episode");
                              }}
                            >
                              <span>{p.project}</span>
                            </button>
                          ))}
                        </>
                      ) : (
                        <>
                          <div className="promo-home-dropdown-head">
                            <button
                              className="promo-home-back-btn"
                              onClick={() => setPromoDropdownStep("project")}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              返回项目
                            </button>
                            <span>《{promoTempProject}》选择剧集</span>
                          </div>
                          <button
                            className={`promo-home-dropdown-item promo-home-dropdown-single ${promoProject === promoTempProject && !promoEpisode ? "selected" : ""}`}
                            onClick={() => {
                              setPromoProject(promoTempProject);
                              setPromoEpisode("");
                              setPromoDropdownOpen(false);
                            }}
                          >
                            <span>整部剧集（不选具体集数）</span>
                          </button>
                          {promoProjects.find((p) => p.project === promoTempProject)?.episodes.map((ep, eidx) => (
                            <button
                              key={eidx}
                              className={`promo-home-dropdown-item promo-home-dropdown-single ${promoProject === promoTempProject && promoEpisode === ep ? "selected" : ""}`}
                              onClick={() => {
                                setPromoProject(promoTempProject);
                                setPromoEpisode(ep);
                                setPromoDropdownOpen(false);
                              }}
                            >
                              <span>{ep}</span>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="right-panel" style={{ justifyContent: "flex-end" }}>
                  <button
                    className="start-btn"
                    onClick={() => setView("promo-agent")}
                    disabled={!promoProject}
                  >
                    开启创作
                  </button>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment key="tab-drama">
              {/* Upload Area */}
              <div className="upload-area">
                <div className="upload-plus">+</div>
                <div className="upload-text">
                  <div className="main">上传剧本</div>
                  <div className="sub">支持 .txt / .pdf</div>
                </div>
              </div>
        
              {/* Input Area */}
              <div className="input-area">
                <textarea
                  ref={inputRef}
                  className="input-field"
                  placeholder="描述你的创作需求，开启智能短剧创作之旅..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
        
                {/* Right Panel */}
                <div className="right-panel">
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
        
                  <button className="start-btn" onClick={() => setView("script-analysis")}>开启创作</button>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </section>
    </div>
  );

  if (view === "script-analysis") {
    return <ScriptAnalysisPage homeInput={inputValue} onBack={() => setView("home")} onNext={() => setView("asset-extraction")} onHome={() => setView("home")} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} />;
  }

  if (view === "asset-extraction") {
    return <AssetExtractionPage savedCategories={assetCategories} onCategoriesChange={setAssetCategories} onBack={() => setView("script-analysis")} onNext={() => setView("storyboard")} onHome={() => setView("home")} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} />;
  }

  if (view === "storyboard") {
    return <StoryboardPage onBack={() => setView("asset-extraction")} onNext={(shots) => { setVideoShots(shots); setView("storyboard-video"); }} onHome={() => setView("home")} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} />;
  }

  if (view === "storyboard-video") {
    return <StoryboardVideoPage shots={videoShots} onBack={() => setView("storyboard")} onNext={() => setView("final-video")} onHome={() => setView("home")} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} />;
  }

  if (view === "final-video") {
    return <FinalVideoPage onBack={() => setView("storyboard-video")} onHome={() => setView("home")} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} />;
  }

  if (view === "asset-library") {
    return <DigitalAssetLibraryPage onHome={() => setView("home")} layerKey={assetLayer} onClearLayer={() => setAssetLayer(null)} onAssetLibrary={() => { setAssetLayer(null); }} onAssetLayer={(key) => { setAssetLayer(key); }} />;
  }

  if (view === "dh-result") {
    return <DigitalHumanResultPage prompt={dhInputValue || dhDefaultPrompt} videoName={dhVideoName} model={dhSelectedModel} onBack={() => setView("home")} onHome={() => setView("home")} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} />;
  }

  if (view === "promo-agent") {
    return <PromoAgentPage key={promoFromNav ? "nav" : "home"} project={promoProject} episode={promoEpisode} initialStep={promoFromNav ? "select" : "strategy"} onBack={() => { setPromoFromNav(false); setView("home"); }} onHome={() => { setPromoFromNav(false); setView("home"); }} onAssetLibrary={() => { setAssetLayer(null); setView("asset-library"); }} onAssetLayer={(key) => { setAssetLayer(key); setView("asset-library"); }} />;
  }

  return homePage;
}

