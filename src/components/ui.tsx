import type { ButtonHTMLAttributes, ReactNode } from "react";

export const fieldClass =
  "w-full min-h-12 rounded-[16px] border border-line bg-white px-4 pt-3.5 pb-4 text-sm leading-6 text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-muted focus:border-blue focus:ring-2 focus:ring-blue/30";

export const panelClass = "rounded-[32px] bg-white shadow-card";

export const noteClass = "rounded-[8px] bg-canvas px-4 py-3 text-xs leading-relaxed text-ink";

export const focusClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

type ChoiceProps = {
  label: string;
  description?: string;
  tag?: string;
  checked: boolean;
  onChange: () => void;
  name?: string;
  type?: "checkbox" | "radio";
  disabled?: boolean;
};

export function ChoiceOption({
  label,
  description,
  tag,
  checked,
  onChange,
  name,
  type = "checkbox",
  disabled = false,
}: ChoiceProps) {
  return (
    <label
      className={`flex gap-3 rounded-[16px] border px-3 py-2.5 transition-colors duration-200 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${checked ? "border-blue bg-white" : "border-transparent hover:bg-canvas"}`}
    >
      <input
        className="mt-0.5 size-4 shrink-0 accent-blue"
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium leading-snug text-ink">{label}</span>
        {description ? <span className="mt-0.5 block text-xs leading-snug text-muted">{description}</span> : null}
        {tag ? <span className="mt-1 block text-[11px] leading-snug text-muted">{tag}</span> : null}
      </span>
    </label>
  );
}

export function Subhead({ children }: { children: ReactNode }) {
  return <h3 className="label-caps mb-2 mt-5 text-muted first:mt-0">{children}</h3>;
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-xs leading-relaxed text-muted">{children}</p>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "secondary" | "ghost";
  size?: "m" | "s";
};

export function Button({
  variant = "secondary",
  size = "m",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const styles = {
    accent: "border-transparent bg-accent text-white shadow-button hover:bg-accent-hover active:bg-accent-active",
    primary: "border-transparent bg-fill text-white shadow-button hover:bg-fill-hover active:bg-fill-active",
    secondary: "border-transparent bg-white text-ink shadow-button hover:bg-canvas",
    ghost: "border-transparent bg-transparent text-ink shadow-none hover:bg-canvas",
  }[variant];

  const sizing =
    size === "s"
      ? "min-h-10 rounded-[24px] px-3.5 pt-2 pb-2.5"
      : "min-h-[52px] rounded-[24px] px-[18px] pt-[14px] pb-4";

  return (
    <button
      type={type}
      className={`inline-flex origin-center items-center justify-center gap-1.5 border text-sm font-medium transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.5,0,0.25,1)] hover:scale-[0.98] active:scale-[0.92] active:duration-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${focusClass} ${sizing} ${styles} ${className}`}
      {...props}
    />
  );
}
