export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header>
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#A85A18]">{eyebrow}</p>
      <h2 className="text-5xl leading-tight">{title}</h2>
    </header>
  );
}
