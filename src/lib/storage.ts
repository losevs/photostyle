import { extractStyle, normalizeSettings } from "../state/defaults";
import type { CustomPreset, PromptMode, Settings } from "../types";

const SETTINGS_KEY = "photostyle.v1";
const PRESETS_KEY = "photostyle.presets.v1";

type StoredSettings = {
  version: 1;
  settings: Settings;
  mode: PromptMode;
};

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function loadStoredSettings(): StoredSettings {
  const parsed = readJson(SETTINGS_KEY);
  if (!parsed || typeof parsed !== "object") {
    return { version: 1, settings: normalizeSettings({}), mode: "full" };
  }
  const record = parsed as { version?: unknown; settings?: unknown; mode?: unknown };
  if (record.version !== 1) {
    return { version: 1, settings: normalizeSettings({}), mode: "full" };
  }
  return {
    version: 1,
    settings: normalizeSettings(record.settings),
    mode: record.mode === "compact" ? "compact" : "full",
  };
}

export function saveStoredSettings(settings: Settings, mode: PromptMode): void {
  const payload: StoredSettings = { version: 1, settings, mode };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota and private-mode failures. The builder still works for the session.
  }
}

export function loadCustomPresets(): CustomPreset[] {
  const parsed = readJson(PRESETS_KEY);
  if (!parsed || typeof parsed !== "object") return [];
  const record = parsed as { version?: unknown; presets?: unknown };
  if (record.version !== 1 || !Array.isArray(record.presets)) return [];

  return record.presets.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const preset = item as { id?: unknown; name?: unknown; style?: unknown };
    if (typeof preset.id !== "string" || typeof preset.name !== "string") return [];
    const name = preset.name.trim().slice(0, 48);
    if (!name) return [];
    return [
      {
        id: preset.id,
        name,
        style: extractStyle(normalizeSettings(preset.style)),
      },
    ];
  });
}

export function saveCustomPresets(presets: CustomPreset[]): void {
  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify({ version: 1, presets }));
  } catch {
    // Ignore quota and private-mode failures.
  }
}
