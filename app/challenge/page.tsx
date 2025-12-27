"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LS_KEY_PARAMS, LS_KEY_ATTEMPTS } from "@/lib/keys";
import { getJSON, setJSON } from "@/lib/storage";

type Params = { A: number; omega: number; phi: number };
type Attempt = { id: string; taskId?: string; score: number; note: string; submittedAtISO: string };

function fmt(n: number) {
  return (Math.round(n * 1000) / 1000).toString();
}
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function ChallengePage() {
  const saved = useMemo(() => getJSON<Params>(LS_KEY_PARAMS, { A: 2, omega: 5, phi: Math.PI / 3 }), []);
  const [A, setA] = useState(saved.A);
  const [omega, setOmega] = useState(saved.omega);
  const [phi, setPhi] = useState(saved.phi);

  const [msg, setMsg] = useState<string | null>(null);

  const T = (2 * Math.PI) / Math.abs(omega);
  const vmax = Math.abs(A * omega);

  function saveParams() {
    setJSON<Params>(LS_KEY_PARAMS, { A, omega, phi });
    setMsg("Đã lưu tham số. Bạn có thể qua Module 1 để xem mô phỏng với đúng tham số này.");
  }

  function addAttempt(score: number, note: string) {
    const arr = getJSON<Attempt[]>(LS_KEY_ATTEMPTS, []);
    arr.push({ id: `c_${Date.now()}`, score, note, submittedAtISO: new Date().toISOString() });
    setJSON(LS_KEY_ATTEMPTS, arr);
  }

  function checkTask1() {
    // Task 1: đặt chu kỳ T ≈ 2.0s (tolerance 0.1)
    const target = 2.0;
    const ok = Math.abs(T - target) <= 0.1;
    const score = ok ? 10 : 6;
    const note = ok
      ? "Module 5: Nhiệm vụ 1 — Đạt chu kỳ T≈2s."
      : `Module 5: Nhiệm vụ 1 — Chưa đạt. Hiện T=${fmt(T)}s. Gợi ý: T=2π/|ω|, muốn T=2 thì ω≈π.`;
    addAttempt(score, note);
    setMsg(note);
  }

  function checkTask2() {
    // Task 2: đặt vmax ≈ 10 (tolerance 0.5)
    const target = 10;
    const ok = Math.abs(vmax - target) <= 0.5;
    const score = ok ? 10 : 6;
    const note = ok
      ? "Module 5: Nhiệm vụ 2 — Đạt v_max≈10."
      : `Module 5: Nhiệm vụ 2 — Chưa đạt. Hiện v_max=${fmt(vmax)}. Gợi ý: v_max=|A·ω|, hãy tăng/giảm A hoặc ω.`;
    addAttempt(score, note);
    setMsg(note);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-slate-600">Module 5</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Thử thách & Game học tập</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Điều chỉnh A, ω, φ để đạt yêu cầu. Hệ thống chấm điểm và lưu vào Tiến độ.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600" href="/simulator">
            Về mô phỏng (Module 1)
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/progress">
            Xem tiến độ
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold">Bảng điều khiển</div>

          <div className="mt-4 grid gap-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">A</span>
                <span className="text-slate-600">{fmt(A)}</span>
              </div>
              <input type="range" min={0.5} max={10} step={0.1} value={A} onChange={(e) => setA(Number(e.target.value))} className="mt-2 w-full" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">ω</span>
                <span className="text-slate-600">{fmt(omega)}</span>
              </div>
              <input type="range" min={0.5} max={20} step={0.1} value={omega} onChange={(e) => setOmega(Number(e.target.value))} className="mt-2 w-full" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">φ</span>
                <span className="text-slate-600">{fmt(phi)}</span>
              </div>
              <input
                type="range"
                min={-Math.PI}
                max={Math.PI}
                step={0.01}
                value={phi}
                onChange={(e) => setPhi(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Hiện tại: T={fmt(T)} s • v_max={fmt(vmax)}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600" onClick={saveParams}>
                Lưu tham số
              </button>
            </div>

            {msg ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 whitespace-pre-line">{msg}</div>
            ) : null}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold">Nhiệm vụ</div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-bold">Nhiệm vụ 1: Đặt chu kỳ T ≈ 2.0 s</div>
              <div className="mt-1 text-sm text-slate-700">Gợi ý: T = 2π/|ω|</div>
              <button
                onClick={checkTask1}
                className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Chấm nhiệm vụ 1
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-bold">Nhiệm vụ 2: Đặt v_max ≈ 10</div>
              <div className="mt-1 text-sm text-slate-700">Gợi ý: v_max = |A·ω|</div>
              <button
                onClick={checkTask2}
                className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Chấm nhiệm vụ 2
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Điểm sẽ được lưu vào <b>Tiến độ</b>. BGK có thể xem ngay tính “dùng được thật”.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}