export function proseList(items: readonly string[]): string {
  const clean = items.map((item) => item.trim()).filter(Boolean);
  if (clean.length === 0) return "";
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, and ${clean[clean.length - 1]}`;
}

export function sentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (/[.!?…]$/.test(trimmed)) return trimmed;
  return `${trimmed}.`;
}

export function uniqueStrings(items: readonly string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    const trimmed = item.trim();
    const key = trimmed.toLowerCase();
    if (!trimmed || seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
  }
  return result;
}

export function hasCyrillic(values: readonly string[]): boolean {
  return values.some((value) => /[\u0400-\u04FF]/.test(value));
}

export function countWords(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

export function toIntensity(value: unknown): 0 | 1 | 2 {
  const number = typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 0;
  if (number <= 0) return 0;
  if (number === 1) return 1;
  return 2;
}

export function toTilt(value: unknown): 0 | 1 | 2 | 3 {
  const number = typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 1;
  if (number <= 0) return 0;
  if (number === 1) return 1;
  if (number === 2) return 2;
  return 3;
}

export function toGrain(value: unknown): 0 | 1 | 2 | 3 {
  const number = typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 1;
  if (number <= 0) return 0;
  if (number === 1) return 1;
  if (number === 2) return 2;
  return 3;
}

export function clampIndex(value: number, length: number): number {
  if (!Number.isFinite(value) || length <= 0) return 0;
  return Math.min(length - 1, Math.max(0, Math.round(value)));
}
