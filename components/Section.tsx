export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}