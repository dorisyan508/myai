import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "文演集团 · 短剧智能创作平台",
  description: "AI Agent 重新定义漫剧创作全链路",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
