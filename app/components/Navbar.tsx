"use client";

import { useState, useRef, useEffect } from "react";

const ASSET_LAYERS = [
  { key: "L1", label: "创作素材资产", desc: "角色、场景、配音、分镜模板" },
  { key: "L3", label: "数字人资产", desc: "300+演员数字人分身" },
  { key: "L4", label: "商业与信用资产", desc: "版权确权、生态信用、结算数据" },
  { key: "L5", label: "舞美与服化道参考库", desc: "舞美效果、服装、妆容、道具" },
  { key: "L6", label: "本土演艺元素库", desc: "赣剧脸谱、采茶戏、景德镇配色" },
];

export default function Navbar({
  onHome,
  onAgent,
  onAssetLibrary,
  onAssetLayer,
  activeNav,
}: {
  onHome?: () => void;
  onAgent?: (type: "drama" | "promo") => void;
  onAssetLibrary?: () => void;
  onAssetLayer?: (layerKey: string) => void;
  activeNav?: "home" | "agent" | "asset-library";
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const handleItemClick = (key: string) => {
    setDropdownOpen(false);
    onAssetLayer?.(key);
  };

  return (
    <nav className="navbar">
      <span className="nav-logo" onClick={onHome} style={{ cursor: onHome ? "pointer" : "default" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo-img" src="/logo.png" alt="文演集团" />
      </span>

      <div className="nav-right">
        <span
          className={`nav-link ${activeNav === "home" ? "nav-active" : ""}`}
          onClick={onHome}
          style={{ cursor: onHome ? "pointer" : "default" }}
        >首页</span>
        <div className="nav-asset-wrapper">
          <span
            className={`nav-link ${activeNav === "agent" ? "nav-active" : ""}`}
            style={{ cursor: onAgent ? "pointer" : "default", userSelect: "none" }}
          >
            Agent
            <svg className="nav-asset-caret" width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="nav-asset-dropdown nav-agent-dropdown">
            <div
              className="nav-asset-item"
              onClick={() => { onAgent?.("drama"); }}
            >
              <span className="nav-asset-item-label">短剧 Agent</span>
              <span className="nav-asset-item-desc">剧本解析、分镜创作、视频合成</span>
            </div>
            <div
              className="nav-asset-item"
              onClick={() => { onAgent?.("promo"); }}
            >
              <span className="nav-asset-item-label">宣发 Agent</span>
              <span className="nav-asset-item-desc">多渠道内容生成与一键发布</span>
            </div>
          </div>
        </div>

        {/* 数字资产库 with hover + click dropdown */}
        <div
          className={`nav-asset-wrapper ${dropdownOpen ? "dropdown-open" : ""}`}
          ref={wrapperRef}
        >
          <span
            className={`nav-link ${activeNav === "asset-library" ? "nav-active" : ""}`}
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((v) => !v);
            }}
          >
            数字资产库
            <svg className="nav-asset-caret" width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="nav-asset-dropdown">
            {ASSET_LAYERS.map((layer) => (
              <div
                key={layer.key}
                className="nav-asset-item"
                onClick={() => handleItemClick(layer.key)}
              >
                <span className="nav-asset-item-label">{layer.label}</span>
                <span className="nav-asset-item-desc">{layer.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="login-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="currentColor"
            />
          </svg>
          登录 / 注册
        </button>
      </div>
    </nav>
  );
}
