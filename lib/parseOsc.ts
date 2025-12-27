// Parse dạng: x(t)=2cos(5t+pi/3) ; 2*cos(5*t+pi/3) ; -3sin(4t-0.2)
// Hỗ trợ pi, số thập phân, phân số, + - * / ngoặc

export type ParsedOsc = {
  A: number;
  omega: number;
  phi: number;
  func: "cos" | "sin";
};

function safeEval(expr: string): number | null {
  // chỉ cho phép: digits, ., + - * / ( ), pi, whitespace
  const ok = /^[0-9+\-*/().\spiPI]+$/.test(expr);
  if (!ok) return null;
  const cleaned = expr.replace(/PI|Pi|pI/g, "pi").replace(/\bpi\b/g, String(Math.PI));
  try {
    // eslint-disable-next-line no-new-func
    const v = Function(`"use strict"; return (${cleaned});`)();
    return typeof v === "number" && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

export function parseOsc(input: string): { ok: true; data: ParsedOsc } | { ok: false; error: string } {
  let s = input.trim();

  // bỏ x(t)= hoặc y=
  s = s.replace(/^x\s*\(\s*t\s*\)\s*=\s*/i, "");
  s = s.replace(/^y\s*=\s*/i, "");
  s = s.replace(/\s+/g, "");
  s = s.replace(/·/g, "*");

  // tìm cos(...) hoặc sin(...)
  const m = s.match(/(cos|sin)\((.+)\)$/i);
  if (!m) return { ok: false, error: "Chưa thấy dạng cos(...) hoặc sin(...). Ví dụ: x(t)=2cos(5t+pi/3)" };

  const func = m[1].toLowerCase() as "cos" | "sin";
  const inside = m[2]; // ωt+φ

  // phần trước cos/sin là biên độ
  const idx = s.toLowerCase().indexOf(func);
  let Aexpr = s.slice(0, idx);
  Aexpr = Aexpr.replace(/\*$/, "");
  if (Aexpr === "") Aexpr = "1";
  if (Aexpr === "-") Aexpr = "-1";

  const A = safeEval(Aexpr);
  if (A === null) return { ok: false, error: "Không đọc được biên độ A. Hãy nhập A là số, ví dụ: 2cos(...)" };

  // inside phải có 't'
  const tPos = inside.indexOf("t");
  if (tPos < 0) return { ok: false, error: "Trong ngoặc cần có 't', ví dụ: cos(5t+pi/3)" };

  let omegaExpr = inside.slice(0, tPos);
  omegaExpr = omegaExpr.replace(/\*$/, "");
  if (omegaExpr === "") omegaExpr = "1";
  if (omegaExpr === "-") omegaExpr = "-1";

  const omega = safeEval(omegaExpr);
  if (omega === null || omega === 0) return { ok: false, error: "Không đọc được ω (hoặc ω=0). Ví dụ: cos(5t+...)" };

  const phiExpr = inside.slice(tPos + 1); // phần sau t
  let phi = 0;
  if (phiExpr && phiExpr.length > 0) {
    const v = safeEval(phiExpr);
    if (v === null) return { ok: false, error: "Không đọc được pha φ. Ví dụ: cos(5t+pi/3) hoặc cos(5t-0.2)" };
    phi = v;
  }

  return { ok: true, data: { A, omega, phi, func } };
}