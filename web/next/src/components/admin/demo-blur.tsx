export function DemoBlur({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-label="Demo data hidden"
      className={`inline-block select-none rounded-sm bg-slate-200/70 text-transparent blur-[3px] ${className}`}
    >
      {children}
    </span>
  );
}
