type Step = {
  label: string;
  short: string;
};

type IntensitySliderProps = {
  label: string;
  value: number;
  steps: readonly Step[];
  detail?: string;
  onChange: (value: number) => void;
};

export function IntensitySlider({ label, value, steps, detail, onChange }: IntensitySliderProps) {
  const current = steps[value] ?? steps[0];

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{current?.label}</span>
        {detail ? <span className="text-right text-[11px] leading-snug text-muted">{detail}</span> : null}
      </div>
      <input
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={steps.length - 1}
        aria-valuenow={value}
        aria-valuetext={current?.label}
        className="w-full"
        type="range"
        min={0}
        max={steps.length - 1}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div
        className="mt-1 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step, index) => (
          <span
            key={step.short}
            className={`text-center text-[10px] leading-tight ${index === value ? "font-semibold text-ink" : "text-muted"}`}
          >
            {step.short}
          </span>
        ))}
      </div>
    </div>
  );
}
