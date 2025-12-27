import Link from "next/link";

const items = [
  { title: "Dòng điện xoay chiều (AC)", desc: "Mô hình i(t)=I0·sin(ωt)", A: 3, w: 6, phi: 0 },
  { title: "Sóng âm", desc: "Biên độ nhỏ, tần số lớn", A: 1.2, w: 12, phi: 0.5 },
  { title: "Nhịp tim", desc: "Tuần hoàn theo thời gian", A: 2, w: 2.2, phi: 0 },
  { title: "Thủy triều", desc: "Chu kỳ dài, ω nhỏ", A: 5, w: 0.6, phi: 0 },
  { title: "Đu quay / xích đu", desc: "Dao động điều hòa gần đúng", A: 4, w: 3, phi: 0.2 },
];

export default function LifePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-slate-600">Module 3</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Hàm lượng giác trong đời sống</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Chọn 1 hiện tượng → mở mô phỏng với tham số gợi ý. (Bạn có thể chỉnh lại trong Module 1.)
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600" href="/simulator">
            Về mô phỏng (Module 1)
          </Link>
          <Link className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50" href="/decoder">
            Giải mã (Module 2)
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <div key={it.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">{it.title}</div>
            <div className="mt-1 text-sm text-slate-700">{it.desc}</div>
            <div className="mt-3 text-xs text-slate-500">
              Gợi ý: A={it.A}, ω={it.w}, φ={it.phi}
            </div>
            <div className="mt-4">
              <Link
                className="inline-flex rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
                href={`/simulator?A=${it.A}&w=${it.w}&phi=${it.phi}`}
              >
                Mở mô phỏng
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}