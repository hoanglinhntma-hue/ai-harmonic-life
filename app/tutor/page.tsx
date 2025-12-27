"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LS_KEY_PARAMS } from "@/lib/keys";
import { getJSON } from "@/lib/storage";

type Params = { A: number; omega: number; phi: number };
type Msg = { role: "ai" | "user"; text: string };

function fmt(n: number) {
  return (Math.round(n * 1000) / 1000).toString();
}

function socratesReply(userText: string, p: Params): { answer: string; nextQ: string } {
  const t = userText.toLowerCase();
  const vmax = Math.abs(p.A * p.omega);
  const amax = Math.abs(p.A * p.omega * p.omega);

  if (t.includes("gia tốc") || t.includes("a(") || t.includes("a cực")) {
    return {
      answer:
        `Gợi ý: a(t) = -A·ω^2·cos(ωt+φ). Dấu “-” nói rằng gia tốc luôn hướng về vị trí cân bằng (VTCB).\n` +
        `Với tham số hiện tại: a_max = |A·ω^2| = ${fmt(amax)}.`,
      nextQ: "Em thử trả lời: Khi nào a(t)=0? Khi đó vật đang ở đâu?",
    };
  }

  if (t.includes("vận tốc") || t.includes("v(") || t.includes("v cực")) {
    return {
      answer:
        `Gợi ý: v(t) = -A·ω·sin(ωt+φ). Vận tốc cực đại khi |sin(ωt+φ)|=1.\n` +
        `Với tham số hiện tại: v_max = |A·ω| = ${fmt(vmax)}.`,
      nextQ: "Câu hỏi tiếp: Khi v đạt cực đại thì x(t) bằng bao nhiêu (gợi ý: cos=0)?",
    };
  }

  if (t.includes("pha") || t.includes("phi") || t.includes("φ")) {
    return {
      answer:
        `Pha ban đầu φ quyết định trạng thái tại t=0:\n` +
        `x(0)=A·cos(φ), v(0)=-A·ω·sin(φ).\n` +
        `Với tham số hiện tại: x(0)≈${fmt(p.A * Math.cos(p.phi))}, v(0)≈${fmt(-p.A * p.omega * Math.sin(p.phi))}.`,
      nextQ: "Em dự đoán: Nếu φ=0 thì vật bắt đầu ở đâu? Chuyển động theo chiều nào?",
    };
  }

  if (t.includes("chu kỳ") || t.includes("t=") || t.includes("tần số")) {
    const T = (2 * Math.PI) / Math.abs(p.omega);
    return {
      answer: `Chu kỳ T = 2π/|ω|. Với ω=${fmt(p.omega)} thì T≈${fmt(T)} s.`,
      nextQ: "Em thử trả lời: Nếu muốn T tăng gấp đôi thì em phải thay đổi ω thế nào?",
    };
  }

  return {
    answer:
      "Mình sẽ dẫn dắt theo kiểu Socrates nhé. Trước tiên, em đang quan tâm phần nào: x(t), v(t) hay a(t)? " +
      "Em có thể hỏi: 'Khi nào v cực đại?', 'Vì sao a luôn hướng về VTCB?', 'Ý nghĩa của φ là gì?'",
    nextQ: "Em chọn 1 câu hỏi (vận tốc / gia tốc / pha / chu kỳ) để bắt đầu nhé?",
  };
}

export default function TutorPage() {
  const p = useMemo(() => getJSON<Params>(LS_KEY_PARAMS, { A: 2, omega: 5, phi: Math.PI / 3 }), []);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Msg[]>([
    {
      role: "ai",
      text:
        "Chào em! Mình là Trợ giảng AI (chế độ Socrates).\n" +
        "Mình sẽ không làm hộ hoàn toàn, mà sẽ gợi mở từng bước.\n" +
        `Tham số hiện tại: A=${fmt(p.A)}, ω=${fmt(p.omega)}, φ=${fmt(p.phi)}.\n` +
        "Em muốn hỏi gì trước?",
    },
  ]);

  useEffect(() => {
    // nothing
  }, []);

  function send() {
    const text = input.trim();
    if (!text) return;
    setChat((c) => [...c, { role: "user", text }]);
    setInput("");

    const { answer, nextQ } = socratesReply(text, p);
    setTimeout(() => {
      setChat((c) => [...c, { role: "ai", text: `${answer}\n\n👉 Câu hỏi tiếp: ${nextQ}` }]);
    }, 200);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-slate-600">Module 4</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Trợ giảng AI kiểu Socrates</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Chế độ offline (rule-based): gợi mở theo ngữ cảnh tham số A, ω, φ đang dùng.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600" href="/simulator">
            Về mô phỏng (Module 1)
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/decoder">
            Giải mã (Module 2)
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/progress">
            Xem tiến độ
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold">Hộp chat</div>

        <div className="mt-4 space-y-3">
          {chat.map((m, i) => (
            <div
              key={i}
              className={
                "max-w-3xl rounded-2xl border p-4 text-sm whitespace-pre-line " +
                (m.role === "ai"
                  ? "border-slate-200 bg-slate-50 text-slate-800"
                  : "ml-auto border-sky-200 bg-sky-50 text-slate-900")
              }
            >
              <div className="text-xs font-semibold mb-1">{m.role === "ai" ? "Trợ giảng AI" : "Bạn"}</div>
              {m.text}
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Ví dụ: Khi nào vận tốc cực đại? / Vì sao gia tốc hướng về VTCB?"
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-200"
          />
          <button
            onClick={send}
            className="rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Gửi
          </button>
        </div>
      </div>
    </main>
  );
}