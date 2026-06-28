import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHARAVANAN R — Automation Architect",
  description: "Robotics & Automation Engineer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ background: "#050505", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
