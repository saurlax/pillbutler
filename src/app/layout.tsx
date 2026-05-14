import type { Metadata } from "next";
import "../base.css";

export const metadata: Metadata = {
  title: "药管管 / Pillbutler",
  description: "药管管，视障人群患者口服药物伴侣。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
