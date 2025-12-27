"use client";

import { useEffect, useMemo, useState } from "react";
import { Pill } from "@/components/Pill";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ButtonLink";
import { DEMO_ATTEMPTS, DEMO_CLASS, DEMO_TASKS, LS_KEY_ATTEMPTS } from "@/lib/demo";
import { clearDemo, getSession, setDemoSession } from "@/lib/demoSession";

type Role = "student" | "teacher";

export default function DemoPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [attemptCount, setAttemptCount] = useState<number>(0);

  useEffect(() => {
    const s = getSession();
    if (s) {
      setRole(s.role);
      setNickname(s.nickname);
    }
    const raw = localStorage.getItem(LS_KEY_ATTEMPTS);
    if (raw) {
      try {
        const arr = JSON.parse(raw) as typeof DEMO_ATTEMPTS;
        setAttemptCount(arr.length);
      } catch {
        setAttemptCount(0);
      }
    } else {
      setAttemptCount(0);
    }
  }, []);

  const stats = useMemo(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(LS_KEY_ATTEMPTS) : null;
    const attempts = raw ? (JSON.parse(raw) as typeof DEMO_ATTEMPTS) : DEMO_ATTEMPTS;
    const avg =
      attempts.length === 0 ? 0 : attempts.reduce((s, a) => s + a.score, 0) / attempts.length;
    return { avg: Math.round(avg * 10) / 10, attempts: attempts.length };
  }, [attemptCount]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <Pill>2) Chế độ Demo</Pill>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          3 cú click là trải nghiệm đủ 5 module
        </h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Demo giúp BGK dùng ngay không cần tạo tài khoản phức tạp. Có sẵn dữ liệu mẫu để
          minh chứng “lưu kết quả – báo cáo”.
        </p>
      </header>

      <div className="mt-6 grid gap-6">
        <Section title="Chọn vai trò Demo" subtitle="Có nút tự động đăng nhập để BGK khỏi phải gõ.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-bold">Demo HS (Student Demo)</div>
              <div className="mt-2 text-sm text-slate-700">
                Vào lớp: <b>DEMO11</b> <br />
                Nickname: <b>HS_Demo</b>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
                  onClick={() => {
                    const s = setDemoSession("student");
                    setRole(s.role);
                    setNickname(s.nickname);
                    setAttemptCount((c) => c + 1);
                  }}
                >
                  Tự động vào demo HS
                </button>
                <ButtonLink href="/bgk" variant="secondary">
                  Xem Trang BGK
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-bold">Demo GV (Teacher Demo)</div>
              <div className="mt-2 text-sm text-slate-700">
                Tài khoản: <b>GV_Demo</b> <br />
                Mật khẩu demo: <b>demo@2026</b>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  onClick={() => {
                    const s = setDemoSession("teacher");
                    setRole(s.role);
                    setNickname(s.nickname);
                    setAttemptCount((c) => c + 1);
                  }}
                >
                  Tự động vào demo GV
                </button>
                <button
                  className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
                  onClick={() => {
                    clearDemo();
                    setRole(null);
                    setNickname("");
                    setAttemptCount(0);
                  }}
                >
                  Xóa phiên demo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <b>Trạng thái hiện tại:</b>{" "}
            {role ? (
              <span>
                Đang ở chế độ <b>{role === "student" ? "HS" : "GV"}</b> — lớp{" "}
                <b>{DEMO_CLASS.code}</b> — nickname <b>{nickname}</b>.
              </span>
            ) : (
              <span>Chưa chọn vai trò demo.</span>
            )}
          </div>
        </Section>

        <Section title="Dữ liệu mẫu có sẵn" subtitle="Để trang thống kê có dữ liệu đẹp khi demo.">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>
              01 lớp: <b>{DEMO_CLASS.name}</b> (mã lớp <b>{DEMO_CLASS.code}</b>)
            </li>
            <li>
              05 nhiệm vụ mẫu tương ứng 5 module (để trải nghiệm đủ nhanh)
            </li>
            <li>
              10 lượt làm bài mẫu (điểm TB hiện tại: <b>{stats.avg}</b>)
            </li>
          </ul>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {DEMO_TASKS.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">
                  Module {t.module} • Mức {t.level}
                </div>
                <div className="mt-1 text-sm font-bold">{t.title}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Lộ trình demo 90 giây" subtitle="Kịch bản 'ăn điểm' – bám đúng 5 module.">
          <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
            <li>
              Vào <b>Module 1</b> → kéo A, ω, φ → nhìn đồ thị x(t), v(t), a(t).
            </li>
            <li>
              Sang <b>Module 2</b> → nhập x(t)=2cos(5t+π/3) → AI tách tham số và
              giải thích.
            </li>
            <li>
              Mở <b>Module 4</b> → hỏi “Khi nào v cực đại?” → AI gợi mở theo pha.
            </li>
            <li>
              Làm 1 nhiệm vụ <b>Module 5</b> → nhận điểm + nhận xét lỗi sai.
            </li>
            <li>
              Vào <b>Tiến độ</b> → thấy kết quả đã được lưu.
            </li>
          </ol>

          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/simulator">Đi tới Module 1 (placeholder)</ButtonLink>
            <ButtonLink href="/tutor" variant="secondary">
              Đi tới Trợ giảng AI (placeholder)
            </ButtonLink>
            <ButtonLink href="/progress" variant="secondary">
              Xem Tiến độ (placeholder)
            </ButtonLink>
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Ghi chú: hiện tại các module mô phỏng/trợ giảng/tiến độ là trang placeholder để bạn
            lắp dần chức năng. Chế độ demo & dữ liệu mẫu đã chạy độc lập.
          </div>
        </Section>
      </div>
    </main>
  );
}