import Link from "next/link";

type Variant = "primary" | "secondary";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-300";
  const styles =
    variant === "primary"
      ? "bg-sky-500 text-white hover:bg-sky-600"
      : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}