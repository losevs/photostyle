import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { focusClass, panelClass } from "./ui";

type SettingsSectionProps = {
  title: string;
  description?: string;
  meta?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function SettingsSection({
  title,
  description,
  meta,
  defaultOpen = true,
  children,
}: SettingsSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section className={panelClass}>
      <button
        type="button"
        className={`flex w-full items-start gap-3 rounded-[32px] px-6 py-5 text-left ${focusClass}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-base font-semibold leading-6 text-ink">{title}</span>
            {meta ? <span className="text-xs text-muted">{meta}</span> : null}
          </span>
          {description ? (
            <span className="mt-0.5 block text-xs leading-relaxed text-muted">{description}</span>
          ) : null}
        </span>
        <ChevronDown className={`mt-0.5 size-4 shrink-0 text-muted ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div id={panelId} className="border-t border-line px-6 py-5">
          {children}
        </div>
      ) : null}
    </section>
  );
}
