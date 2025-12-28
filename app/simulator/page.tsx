"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LS_KEY_PARAMS } from "@/lib/keys";
import { getJSON, setJSON } from "@/lib/storage";

type Params = { A: number; omega: number; phi: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fmt(n: number) {
  return (Math.round(n * 1000) / 1000).toString();
}

function Chart({
  title,
  data,
  yLabel,
}: {
  title: string;
  data: { t: number; y: number }[];
  yLabel: string;
}) {
  const w = 460;
  const h = 160;
  const pad = 24;

  const ys = data.map((d) => d.y);
  const minY = ys.length ? Math.min(...ys) : -1;
  const maxY = ys.length ? Math.max(...ys) : 1;
  const span = maxY - minY || 1;

  const points = data
    .map((d, i) => {
      const x = pad + (i / Math.max(1, data.length - 1)) * (w - 2 * pad);
      const y = pad + (1 - (d.y - minY) / span) * (h - 2 * pad);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-slate-500">{yLabel}</div>
      </div>

      <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="mt-2">
        <rect x="0" y="0" width={w} height={h} rx="16" fill="#f8fafc" />
        <line x1={pad} y1={h / 2} x2={w - pad} y2={h / 2} stroke="#cbd5e1" strokeWidth="2" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#cbd5e1" strokeWidth="2" />
        <polyline points={points} fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinejoin="round" />
      </svg>

      <div className="mt-1 text-xs text-slate-500">
        min={fmt(minY)} • max={fmt(maxY)}
      </div>
    </div>
  );
}

// dùng useSearchParams ở component con (để bọc Suspense bên ngoài)
function SimulatorContent() {
  const sp = useSearchParams();

  const [A, setA] = useState(2);
  const [omega, setOmega] = useState(5);
  const [phi, setPhi] = useState(Math.PI / 3);

  const [running, setRunning] = useState(true);
  const t0Ref = useRef<number>(0);
  const tRef = useRef<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [seriesX, setSeriesX] = useState<{ t: number; y: number }[]>([]);
  const [seriesV, setSeriesV] = useState<{ t: number; y: number }[]>([]);
  const [seriesAcc, setSeriesAcc] = useState<{ t: number; y: number }[]>([]);

  // load init from query params or localStorage
  useEffect(() => {
    const saved = getJSON<Params>(LS_KEY_PARAMS, { A: 2, omega: 5, phi: Math.PI / 3 });

    const qA = sp.get("A");
    const qW = sp.get("w");
    const qP = sp.get("phi");

    const initA = qA ? Number(qA) : saved.A;
    const initW = qW ? Number(qW) : saved.omega;
    const initP = qP ? Number(qP) : saved.phi;

    if (Number.isFinite(initA)) setA(clamp(initA, 0.5, 10));
    if (Number.isFinite(initW)) setOmega(clamp(initW, 0.5, 20));
    if (Number.isFinite(initP)) setPhi(clamp(initP, -Math.PI, Math.PI));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist params
  useEffect(() => {
    setJSON<Params>(LS_KEY_PARAMS, { A, omega, phi });
  }, [A, omega, phi]);

  const derived = useMemo(() => {
    const wAbs = Math.max(1e-6, Math.abs(omega));
    const T = (2 * Math.PI) / wAbs;
    const f = wAbs / (2 * Math.PI);
    const vmax = Math.abs(A * omega);
    const amax = Math.abs(A * omega * omega);
    return { T, f, vmax, amax };
  }, [A, omega]);

  // animation loop
  useEffect(() => {
    let raf = 0;

    const draw = (tMs: number) => {
      if (!t0Ref.current) t0Ref.current = tMs;
      const dt = (tMs - t0Ref.current) / 1000;

      if (running) tRef.current = dt;
      const t = tRef.current;

      const x = A * Math.cos(omega * t + phi);
      const v = -A * omega * Math.sin(omega * t + phi);
      const acc = -A * omega * omega * Math.cos(omega * t + phi);

      // update series only when running (tránh spam điểm khi pause)
      if (running) {
        const push = (arr: { t: number; y: number }[], y: number) => {
          const next = [...arr, { t, y }].filter((p) => t - p.t <= 4);
          return next.slice(-240);
        };
        setSeriesX((s) => push(s, x));
        setSeriesV((s) => push(s, v));
        setSeriesAcc((s) => push(s, acc));
      }

      // draw spring-mass
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const W = canvas.width;
          const H = canvas.height;
          ctx.clearRect(0, 0, W, H);

          // background
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(0, 0, W, H);

          // equilibrium line
          const midX = W * 0.55;
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(midX, 20);
          ctx.lineTo(midX, H - 20);
          ctx.stroke();

          // wall
          ctx.fillStyle = "#e2e8f0";
          ctx.fillRect(30, 20, 18, H - 40);

          // map x to pixels
          const scale = (W * 0.30) / 10; // 10 units -> 30% width
          const massX = midX + x * scale;
          const massY = H / 2;

          // spring (zigzag)
          ctx.strokeStyle = "#0ea5e9";
          ctx.lineWidth = 3;
          const startX = 48;
          const endX = massX - 30;
          const coils = 10;
          const amp = 14;
          ctx.beginPath();
          ctx.moveTo(startX, massY);
          for (let i = 1; i < coils; i++) {
            const px = startX + (i / coils) * (endX - startX);
            const py = massY + (i % 2 === 0 ? -amp : amp);
            ctx.lineTo(px, py);
          }
          ctx.lineTo(endX, massY);
          ctx.stroke();

          // mass
          ctx.fillStyle = "#f59e0b";
          ctx.strokeStyle = "#b45309";
          ctx.lineWidth = 3;

          const rr = (ctx as any).roundRect as undefined | ((x: number, y: number, w: number, h: number, r: number) => void);
          ctx.beginPath();
          if (typeof rr === "function") {
            rr(massX - 30, massY - 22, 60, 44, 12);
          } else {
            // fallback: rect thường
            ctx.rect(massX - 30, massY - 22, 60, 44);
          }
          ctx.fill();
          ctx.stroke();

          // label
          ctx.fillStyle = "#0f172a";
          ctx.font = "16px sans-serif";
          ctx.fillText(`t = ${fmt(t)} s`, 12, 20);
          ctx.fillText(`x(t) = ${fmt(x)}`, 12, 42);
          ctx.fillText(`v(t) = ${fmt(v)}`, 12, 64);
          ctx.fillText(`a(t) = ${fmt(acc)}`, 12, 86);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [A, omega, phi, running]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-slate-600">Module 1</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Mô phỏng Dao động điều hòa</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Kéo các thanh trượt để quan sát đồng thời mô phỏng và đồ thị x(t), v(t), a(t).
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
            onClick={() => setRunning((r) => !r)}
          >
            {running ? "Tạm dừng" : "Chạy tiếp"}
          </button>

          <button
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            onClick={() => {
              t0Ref.current = 0;
              tRef.current = 0;
              setSeriesX([]);
              setSeriesV([]);
              setSeriesAcc([]);
            }}
          >
            Reset
          </button>

          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/decoder">
            Module 2: Giải mã
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/tutor">
            Module 4: Trợ giảng
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/challenge">
            Module 5: Thử thách
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/progress">
            Xem tiến độ
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold">Mô phỏng (Con lắc lò xo)</div>
          <canvas ref={canvasRef} width={720} height={260} className="mt-3 w-full rounded-2xl border border-slate-200" />

          <div className="mt-5 grid gap-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Biên độ A</span>
                <span className="text-slate-600">{fmt(A)}</span>
              </div>
              <input type="range" min={0.5} max={10} step={0.1} value={A} onChange={(e) => setA(Number(e.target.value))} className="mt-2 w-full" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Tần số góc ω</span>
                <span className="text-slate-600">{fmt(omega)}</span>
              </div>
              <input type="range" min={0.5} max={20} step={0.1} value={omega} onChange={(e) => setOmega(Number(e.target.value))} className="mt-2 w-full" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Pha ban đầu φ</span>
                <span className="text-slate-600">{fmt(phi)}</span>
              </div>
              <input type="range" min={-Math.PI} max={Math.PI} step={0.01} value={phi} onChange={(e) => setPhi(Number(e.target.value))} className="mt-2 w-full" />
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="font-bold">Góc Toán–Lý</div>
              <div className="mt-2">
                T = {fmt(derived.T)} s • f = {fmt(derived.f)} Hz • v_max = {fmt(derived.vmax)} • a_max = {fmt(derived.amax)}
              </div>
              <div className="mt-1 text-amber-900/90">
                Công thức: x(t)=A·cos(ωt+φ), v(t)=-Aω·sin(ωt+φ), a(t)=-Aω²·cos(ωt+φ)
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <Chart title="x(t) – Li độ" data={seriesX} yLabel="x" />
          <Chart title="v(t) – Vận tốc" data={seriesV} yLabel="v" />
          <Chart title="a(t) – Gia tốc" data={seriesAcc} yLabel="a" />
        </div>
      </div>
    </main>
  );
}

export default function SimulatorPage() {
  return (
    <Suspense fallback={<div className="p-4">Đang tải...</div>}>
      <SimulatorContent />
    </Suspense>
  );
}
