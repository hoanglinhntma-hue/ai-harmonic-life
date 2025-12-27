"use client";

import { useMemo } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { Pill } from "@/components/Pill";
import { DEMO_ATTEMPTS, LS_KEY_ATTEMPTS } from "@/lib/demo";

export default function ProgressPlaceholder() {
  const attempts = useMemo(() => {
    if (typeof window === "undefined") return DEMO_ATTEMPTS;
    const raw = localStorage.getItem(LS_KEY_ATTEMPTS);
    if (!raw) return DEMO_ATTEMPTS;
    try {
      return JSON.parse(raw) as typeof DEMO_ATTEMPTS;
    } catch {
      return DEMO_ATTEMPTS;
    }
  }, []);

  const avg =
    attempts.length === 0 ? 0 : attempts.reduce((s, a) => s + a.score, 0) / attempts.length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Pill>Placeholder</Pill>
      <h1 className="mt-3 text-2xl font-bold">Tiến độ & Kết quả</h1>
      <p className="mt-2 text-slate-700">
        Bản demo đang đọc dữ liệu mẫu từ localStorage để minh chứng “lưu kết quả”.
      </p>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <b>Số lượt làm bài:</b> {attempts.length} • <b>Điểm trung bình:</b>{" "}
        {Math.round(avg * 10) / 10}
      </div>

      <div className="mt-4 space-y-3">
        {attempts.slice(0, 6).map((a) => (
          <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold">Điểm: {a.score}/10</div>
            <div className="mt-1 text-sm text-slate-700">{a.note}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <ButtonLink href="/demo">Quay lại Demo</ButtonLink>
        <ButtonLink href="/bgk" variant="secondary">
          Xem Trang BGK
        </ButtonLink>
      </div>
    </main>
  );
}