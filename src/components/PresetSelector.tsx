import { Trash2 } from "lucide-react";
import { focusClass } from "./ui";
import { builtinPresets } from "../config/presets";
import { stylesEqual } from "../state/defaults";
import type { CustomPreset, StyleSettings } from "../types";

type PresetSelectorProps = {
  activeStyle: StyleSettings;
  customPresets: CustomPreset[];
  onApply: (style: StyleSettings) => void;
  onDelete: (id: string) => void;
};

export function PresetSelector({ activeStyle, customPresets, onApply, onDelete }: PresetSelectorProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="label-caps text-muted">Пресеты</h2>
        <p className="text-xs text-muted">Описание сцены сохранится</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {builtinPresets.map((preset) => {
          const active = stylesEqual(activeStyle, preset.style);
          return (
            <button
              key={preset.id}
              type="button"
              title={preset.description}
              aria-pressed={active}
              onClick={() => onApply(preset.style)}
              className={`w-44 shrink-0 rounded-[16px] border-2 px-3 py-2 text-left transition-colors ${focusClass} ${
                active ? "border-blue bg-white" : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <span className="block text-sm font-medium text-ink">{preset.name}</span>
              <span className="mt-0.5 block text-[11px] text-muted">{preset.englishName}</span>
            </button>
          );
        })}
        {customPresets.map((preset) => {
          const active = stylesEqual(activeStyle, preset.style);
          return (
            <div
              key={preset.id}
              className={`flex w-44 shrink-0 items-stretch overflow-hidden rounded-[16px] border-2 bg-white ${
                active ? "border-blue" : "border-line"
              }`}
            >
              <button
                type="button"
                aria-pressed={active}
                title="Сохранённый пресет"
                onClick={() => onApply(preset.style)}
                className={`min-w-0 flex-1 px-3 py-2 text-left ${focusClass}`}
              >
                <span className="block truncate text-sm font-medium text-ink">{preset.name}</span>
                <span className="mt-0.5 block text-[11px] text-muted">Свой пресет</span>
              </button>
              <button
                type="button"
                className={`px-2.5 text-muted hover:text-ink ${focusClass}`}
                aria-label={`Удалить пресет ${preset.name}`}
                onClick={() => onDelete(preset.id)}
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
