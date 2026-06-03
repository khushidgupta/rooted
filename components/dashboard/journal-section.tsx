import { cn } from "@/lib/cn";

type JournalSectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export function JournalSection({
  title,
  subtitle,
  children,
  className,
}: JournalSectionProps) {
  return (
    <section className={cn("mb-8", className)}>
      <div className="mb-5">
        <h2 className="font-serif text-2xl text-moss-900">{title}</h2>
        {subtitle && (
          <p className="text-sm text-text-muted mt-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
