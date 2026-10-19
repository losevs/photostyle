import { extractStyle, normalizeSettings } from "../state/defaults";
import type { PresetDraft, StyleSettings } from "../types";

export type BuiltinPreset = {
  id: string;
  name: string;
  englishName: string;
  description: string;
  style: StyleSettings;
};

function makeStyle(draft: PresetDraft): StyleSettings {
  return extractStyle(normalizeSettings(draft));
}

export const builtinPresets: readonly BuiltinPreset[] = [
  {
    id: "everyday",
    name: "Повседневный снимок",
    englishName: "Everyday Snapshot",
    description: "Дневной свет, живое зерно, спонтанная рамка и лёгкий наклон.",
    style: makeStyle({
      lighting: "daylight",
      grainEnabled: true,
      grain: 1,
      tilt: 1,
      filmType: "colorNegative",
      exposure: "natural",
      sharpness: "softness",
      framing: { imperfectFrame: true, offCenter: true },
      colors: { rich: true, naturalSkin: true, softContrast: true, faded: false, liftedBlacks: false },
      character: { nostalgic: false },
    }),
  },
  {
    id: "flash",
    name: "Снимок со вспышкой",
    englishName: "Direct Flash Snapshot",
    description: "Вспышка в лоб, плотные тени, близкая дистанция и живое кадрирование.",
    style: makeStyle({
      lighting: "flash",
      noFlash: false,
      grainEnabled: true,
      grain: 1,
      tilt: 1,
      filmType: "colorNegative",
      exposure: "natural",
      sharpness: "softness",
      framing: { imperfectFrame: true, boldCrop: true, offCenter: true },
      depth: { close: true },
      shotScale: "close",
      character: { nostalgic: false },
    }),
  },
  {
    id: "nostalgic",
    name: "Ностальгическая плёнка",
    englishName: "Nostalgic Film",
    description: "Выцветший цвет, приподнятые чёрные, мягкость и лёгкое гало.",
    style: makeStyle({
      lighting: "daylight",
      filmType: "vintage",
      grainEnabled: true,
      grain: 1,
      tilt: 1,
      exposure: "natural",
      sharpness: "softness",
      colors: {
        rich: false,
        faded: true,
        liftedBlacks: true,
        naturalSkin: true,
        softContrast: true,
      },
      character: { nostalgic: true },
      artifacts: { halation: { enabled: true, intensity: 0 } },
    }),
  },
  {
    id: "imperfect",
    name: "Неидеальная аналоговая",
    englishName: "Imperfect Analog",
    description: "Крупное зерно, смаз, наклон и редкая оптическая неточность.",
    style: makeStyle({
      lighting: "daylight",
      filmType: "colorNegative",
      grainEnabled: true,
      grain: 2,
      tilt: 1,
      exposure: "natural",
      sharpness: "imperfect",
      framing: { imperfectFrame: true },
      character: { nostalgic: false },
      artifacts: {
        motionBlur: { enabled: true, intensity: 1 },
        chromatic: { enabled: true, intensity: 0 },
      },
    }),
  },
  {
    id: "extremeClose",
    name: "Случайный крупный план",
    englishName: "Accidental Extreme Close-Up",
    description: "Камера вплотную к жесту: фрагмент лица, сильное перекрытие, без лишних артефактов.",
    style: makeStyle({
      shotScale: "extreme",
      cropping: "extreme",
      visibility: "fragment",
      actionFirst: true,
      accidentalFraming: true,
      occlusion: "strong",
      tilt: 1,
      lighting: "daylight",
      noFlash: false,
      filmType: "colorNegative",
      grainEnabled: true,
      grain: 1,
      exposure: "natural",
      sharpness: "softness",
      naturalness: true,
      character: { nostalgic: false },
    }),
  },
];
