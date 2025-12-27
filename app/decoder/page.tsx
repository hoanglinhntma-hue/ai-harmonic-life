"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { parseOsc } from "@/lib/parseOsc";
import { LS_KEY_PARAMS, LS_KEY_ATTEMPTS } from "@/lib/keys";
import { getJSON, setJSON } from "@/lib/storage";

type Params = { A: number; omega: number; phi: number };
type Attempt = { id: string; taskId?: string; score: number; note: string; submittedAtISO: string };

function fmt(n: number) {
  return (Math.round(n * 1000) / 1000).toString();
}

export default function DecoderPage() {
  const [input, setInput] = useState("x(t)=2cos(5t+pi/3)");
  const [msg, setMsg] = useState<string | null>(null);

  const result = useMemo(() => parseOsc(input), [input]);

  const derived = useMemo(() => {
    if (!result.ok) return null;
    const { A, omega, phi, func } = result.data;
    const T = (2 * Math.PI) / Math.abs(omega);
    const f = Math.abs(omega) / (2 * Math.PI);
    const vmax = Math.abs(A * omega);
    const amax = Math.abs(A * omega * omega);
    return { A, omega, phi, func, T, f, vmax, amax };
  }, [result]);

  function saveToSimulator() {
    if (!derived) return;
    setJSON<Params>(LS_KEY_PARAMS, { A: derived.A, omega: derived.omega, phi: derived.phi });
    setMsg("Đã lưu tham số sang Module 1 (mô phỏng). Bạn bấm 'Mở mô phỏng' để xem.");
  }

  function addAttempt(score: number, note: string) {
    const arr = getJSON<Attempt[]>(LS_KEY_ATTEMPTS, []);
    arr.push({ id: `d_${Date.now()}`, score, note, submittedAtISO: new Date().toISOString() });
    setJSON(LS_KEY_ATTEMPTS, arr);
  }

  function quickCheck() {
    if (!derived) return;
    // chấm đơn giản: nếu parse thành công -> 9 điểm, có đủ A, ω, φ -> 10
    const score = 10;
    addAttempt(score, "Module 2: Giải mã phương trình — Parse đúng tham số A, ω, φ.");
    setMsg("Đã lưu 1 kết quả vào Tiến độ (Progress).");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-slate-600">Module 2</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">AI “Giải mã” hàm số dao động</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Nhập dạng x(t)=Acos(ωt+φ) hoặc x(t)=Asin(ωt+φ). Hỗ trợ pi, phân số.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600" href="/simulator">
            Mở mô phỏng (Module 1)
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/tutor">
            Trợ giảng (Module 4)
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/progress">
            Xem tiến độ
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="text-sm font-semibold">Nhập phương trình</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-sky-200"
          />

          <div className="mt-3 text-xs text-slate-500">
            Ví dụ: <span className="font-mono">x(t)=2cos(5t+pi/3)</span>,{" "}
            <span className="font-mono">-3sin(4t-0.2)</span>,{" "}
            <span className="font-mono">cos(2t)</span>
          </div>

          {msg ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              {msg}
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold">Kết quả phân tích</div>

          {!result.ok ? (
            <div className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
              {result.error}
            </div>
          ) : (
            <>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <div className="font-semibold">Tham số</div>
                  <div className="mt-2 text-slate-700">
                    A = <b>{fmt(derived!.A)}</b> <br />
                    ω = <b>{fmt(derived!.omega)}</b> <br />
                    φ = <b>{fmt(derived!.phi)}</b> <br />
                    Dạng: <b>{derived!.func}(…)</b>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <div className="font-semibold">Suy ra đại lượng</div>
                  <div className="mt-2 text-slate-700">
                    T = 2π/|ω| = <b>{fmt(derived!.T)}</b> s <br />
                    f = |ω|/(2π) = <b>{fmt(derived!.f)}</b> Hz <br />
                    v_max = |Aω| = <b>{fmt(derived!.vmax)}</b> <br />
                    a_max = |Aω²| = <b>{fmt(derived!.amax)}</b>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <div className="font-semibold">Giải thích “ngôn ngữ học sinh”</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>A càng lớn → vật dao động càng “mạnh” (biên độ lớn hơn).</li>
                  <li>ω càng lớn → dao động càng nhanh (chu kỳ T nhỏ).</li>
                  <li>φ quyết định trạng thái ban đầu (vị trí/chiều chuyển động lúc t=0).</li>
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
                  onClick={saveToSimulator}
                >
                  Lưu tham số sang Module 1
                </button>
                <button
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  onClick={quickCheck}
                >
                  Lưu kết quả vào Tiến độ
                </button>
                <Link
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  href="/simulator"
                >
                  Mở mô phỏng ngay
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}