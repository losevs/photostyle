import { Check, Copy, Download, RotateCcw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { countWords } from "../lib/text";
import type { PromptMode } from "../types";
import { TagChip } from "./TagChip";
import { Button } from "./ui";

type PromptPreviewProps = {
  text: string;
  chips: string[];
  mode: PromptMode;
  sceneEmpty: boolean;
  russianInScene: boolean;
  foundationActive: string[];
  optionalArtifactCount: number;
  onMode: (mode: PromptMode) => void;
  onReset: () => void;
  onSave: () => void;
};

const visibleChips = 14;

function foundationSummary(labels: string[]): string {
  if (labels.length === 0) return "База выключена";
  const shorts = labels.map((label) => {
    if (label.includes("зерно")) return "зерно";
    if (label.includes("наклон")) return "наклон";
    return label;
  });
  return `База: ${shorts.join(", ")}`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "true");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      return copied;
    } catch {
      return false;
    }
  }
}

function exportText(text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "35mm-prompt.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function PromptPreview({
  text,
  chips,
  mode,
  sceneEmpty,
  russianInScene,
  foundationActive,
  optionalArtifactCount,
  onMode,
  onReset,
  onSave,
}: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const words = countWords(text);
  const shown = chips.slice(0, visibleChips);
  const hidden = Math.max(0, chips.length - shown.length);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <aside className="flex max-h-[40vh] flex-col overflow-hidden rounded-[32px] bg-white shadow-sheet lg:max-h-[calc(100vh-2rem)] lg:shadow-card">
      <div className="shrink-0 border-b border-line px-4 py-2.5 lg:px-6 lg:py-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-base font-semibold leading-6 text-ink">Готовый промпт</h2>
          <p className="text-xs text-muted">
            {new Intl.NumberFormat("ru-RU").format(text.length)} симв. · {words} сл.
          </p>
        </div>
        <div className="mt-2 grid grid-cols-2 rounded-[16px] bg-canvas p-1" role="tablist" aria-label="Вид промпта">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "full"}
            className={`rounded-[8px] px-2 py-1.5 text-sm ${mode === "full" ? "bg-white font-medium text-ink shadow-button" : "text-muted"}`}
            onClick={() => onMode("full")}
          >
            Полный промпт
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "compact"}
            className={`rounded-[8px] px-2 py-1.5 text-sm ${mode === "compact" ? "bg-white font-medium text-ink shadow-button" : "text-muted"}`}
            onClick={() => onMode("compact")}
          >
            Теги
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
        {sceneEmpty ? (
          <p className="mb-3 text-xs leading-relaxed text-muted">Сцена пока пустая — в промпте только стиль и ограничения.</p>
        ) : null}
        <p className="text-sm leading-6 whitespace-pre-wrap text-ink lg:text-base">{text}</p>
        {shown.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {shown.map((chip) => (
              <TagChip key={chip} label={chip} />
            ))}
            {hidden > 0 ? <TagChip label={`+${hidden}`} /> : null}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 space-y-2 border-t border-line px-3 py-2.5 lg:space-y-3 lg:px-4 lg:py-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] leading-snug text-muted">
          <span>{foundationSummary(foundationActive)}</span>
          <span>Артефакты: {optionalArtifactCount}</span>
          {russianInScene ? <span className="text-ink">Русский текст без перевода</span> : null}
        </div>
        <p className="hidden text-[11px] leading-snug text-muted lg:block">
          Ограничения против коллажа и рекламного вида всегда стоят в конце.
        </p>
        {copyFailed ? <p className="text-xs font-medium text-ink">Не удалось скопировать. Выделите текст вручную.</p> : null}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="accent"
            size="s"
            onClick={() => {
              void copyText(text).then((ok) => {
                setCopyFailed(!ok);
                setCopied(ok);
              });
            }}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Скопировано" : "Копировать"}
          </Button>
          <Button size="s" onClick={onSave}>
            <Save className="size-4" />
            Пресет
          </Button>
          <Button size="s" onClick={onReset}>
            <RotateCcw className="size-4" />
            Сбросить
          </Button>
          <Button size="s" onClick={() => exportText(text)}>
            <Download className="size-4" />
            TXT
          </Button>
        </div>
      </div>
    </aside>
  );
}
