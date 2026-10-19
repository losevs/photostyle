export function TagChip({ label }: { label: string }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-[15px] bg-canvas px-4 py-1.5 text-xs leading-4 text-ink">
      <span className="truncate">{label}</span>
    </span>
  );
}
