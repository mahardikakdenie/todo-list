import type { Metadata, Viewport } from "next";
import { Providers } from "@/src/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskMaster | Advanced Task Management",
  description: "A professional, responsive task management application built with Next.js 15, TypeScript, and React Query.",
  keywords: ["todo list", "task management", "next.js", "typescript", "react query", "productivity"],
  authors: [{ name: "Developer Candidate" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f43f5e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
