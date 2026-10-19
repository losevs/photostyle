import { useCallback, useEffect, useState } from "react";
import { ARTIFACT_OPTIONS } from "../config/options";
import { loadCustomPresets, loadStoredSettings, saveCustomPresets, saveStoredSettings } from "../lib/storage";
import { applyStyle, defaultSettings, extractStyle } from "./defaults";
import type { CustomPreset, Intensity, PromptMode, Settings, StyleSettings } from "../types";

function randomIntensity(): Intensity {
  const value = Math.floor(Math.random() * 3);
  if (value <= 0) return 0;
  if (value === 1) return 1;
  return 2;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => loadStoredSettings().settings);
  const [mode, setMode] = useState<PromptMode>(() => loadStoredSettings().mode);
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>(() => loadCustomPresets());

  useEffect(() => {
    saveStoredSettings(settings, mode);
  }, [settings, mode]);

  useEffect(() => {
    saveCustomPresets(customPresets);
  }, [customPresets]);

  const update = useCallback((recipe: (current: Settings) => Settings) => {
    setSettings((current) => recipe(current));
  }, []);

  const reset = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const applyStyleSettings = useCallback((style: StyleSettings) => {
    setSettings((current) => applyStyle(current, style));
  }, []);

  const savePreset = useCallback(
    (name: string) => {
      const trimmed = name.trim().slice(0, 48);
      if (!trimmed) return false;
      const preset: CustomPreset = {
        id: `custom-${crypto.randomUUID()}`,
        name: trimmed,
        style: extractStyle(settings),
      };
      setCustomPresets((presets) => [preset, ...presets]);
      return true;
    },
    [settings],
  );

  const deletePreset = useCallback((id: string) => {
    setCustomPresets((presets) => presets.filter((preset) => preset.id !== id));
  }, []);

  const randomizeArtifacts = useCallback(() => {
    setSettings((current) => {
      const pool = ARTIFACT_OPTIONS.filter((option) => option.group !== "foundation").map((option) => option.id);
      const shuffled = [...pool];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(Math.random() * (index + 1));
        const currentId = shuffled[index];
        shuffled[index] = shuffled[swap];
        shuffled[swap] = currentId;
      }
      const picked = new Set(shuffled.slice(0, 2));
      const artifacts = { ...current.artifacts };
      for (const id of pool) {
        artifacts[id] = {
          enabled: picked.has(id),
          intensity: picked.has(id) ? randomIntensity() : current.artifacts[id].intensity,
        };
      }
      return { ...current, artifacts };
    });
  }, []);

  return {
    settings,
    mode,
    setMode,
    customPresets,
    update,
    reset,
    applyStyleSettings,
    savePreset,
    deletePreset,
    randomizeArtifacts,
  };
}
