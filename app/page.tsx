import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import { Pill } from "@/components/Pill";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <Pill>AI Harmonic Life</Pill>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Dao động quanh ta
            </h1>
            <p className="max-w-2xl text-slate-700">
              Học Dao động điều hòa (Vật lý 11) và Hàm lượng giác (Toán 11) bằng
              mô phỏng trực quan + trợ giảng AI dẫn dắt tư duy.
            </p>
          </div>
          <div className="hidden sm:block">
            <Mascot />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/about-ai"
            className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-slate-900">
              1) Thuyết minh AI
            </div>
            <div className="mt-1 text-sm text-slate-600">
              AI làm gì / không làm gì, đạo đức, giới hạn + CTA
            </div>
          </Link>

          <Link
            href="/demo"
            className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-slate-900">
              2) Chế độ Demo
            </div>
            <div className="mt-1 text-sm text-slate-600">
              1-click demo HS/GV + dữ liệu mẫu + lộ trình 90 giây
            </div>
          </Link>

          <Link
            href="/bgk"
            className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-slate-900">
              3) Trang BGK
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Tóm tắt mục tiêu – sáng tạo – hiệu quả – an toàn
            </div>
          </Link>
        </div>
      </header>

      <footer className="mt-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AI Harmonic Life — bản demo phục vụ dự thi
      </footer>
    </main>
  );
}