import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Harmonic Life – Dao động quanh ta",
  description:
    "Học Dao động điều hòa (Vật lý 11) và Hàm lượng giác (Toán 11) bằng mô phỏng trực quan + trợ giảng AI dẫn dắt tư duy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-dvh bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}