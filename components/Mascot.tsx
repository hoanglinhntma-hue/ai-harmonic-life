export function Mascot() {
  // Mascot SVG đơn giản (màu xanh + vàng đồng)
  return (
    <div className="w-24 select-none rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg viewBox="0 0 120 120" role="img" aria-label="Mascot" className="h-full w-full">
        <defs>
          <linearGradient id="sky" x1="0" x2="1">
            <stop offset="0" stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* head */}
        <circle cx="60" cy="55" r="35" fill="url(#sky)" opacity="0.95" />
        {/* cheeks */}
        <circle cx="44" cy="62" r="6" fill="#f59e0b" opacity="0.9" />
        <circle cx="76" cy="62" r="6" fill="#f59e0b" opacity="0.9" />
        {/* eyes */}
        <circle cx="48" cy="52" r="5" fill="#0f172a" />
        <circle cx="72" cy="52" r="5" fill="#0f172a" />
        {/* smile */}
        <path
          d="M48 70 C55 78, 65 78, 72 70"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* body */}
        <rect x="30" y="88" width="60" height="20" rx="10" fill="#f59e0b" opacity="0.9" />
      </svg>
    </div>
  );
}