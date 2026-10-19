import {
  ANGLE_OPTIONS,
  ARTIFACT_OPTIONS,
  CHARACTER_OPTIONS,
  COLOR_OPTIONS,
  CROPPING_OPTIONS,
  DEPTH_OPTIONS,
  EXPOSURE_OPTIONS,
  FILM_OPTIONS,
  FRAMING_OPTIONS,
  LIGHTING_OPTIONS,
  OCCLUSION_OPTIONS,
  SHARPNESS_OPTIONS,
  SHOT_SCALE_OPTIONS,
  VISIBILITY_OPTIONS,
  type AngleId,
  type ArtifactId,
  type CharacterId,
  type ColorId,
  type CroppingId,
  type DepthId,
  type ExposureId,
  type FilmId,
  type FramingId,
  type LightingId,
  type OcclusionId,
  type SharpnessId,
  type ShotScaleId,
  type VisibilityId,
} from "../config/options";
import { toGrain, toIntensity, toTilt } from "../lib/text";
import type { ArtifactState, GrainLevel, SceneSettings, Settings, StyleSettings, TiltLevel } from "../types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function flags<T extends string>(
  options: readonly { id: T; defaultOn: boolean }[],
  input: unknown,
): Record<T, boolean> {
  const source = isRecord(input) ? input : {};
  return Object.fromEntries(
    options.map((option) => [option.id, toBoolean(source[option.id], option.defaultOn)]),
  ) as Record<T, boolean>;
}

function oneOf<T extends string>(
  value: unknown,
  options: readonly { id: T }[],
  fallback: T,
): T {
  if (typeof value !== "string") return fallback;
  return options.some((option) => option.id === value) ? (value as T) : fallback;
}

function normalizeArtifacts(input: unknown): Record<ArtifactId, ArtifactState> {
  const source = isRecord(input) ? input : {};
  return Object.fromEntries(
    ARTIFACT_OPTIONS.map((option) => {
      const raw = source[option.id];
      const state = isRecord(raw) ? raw : {};
      return [
        option.id,
        {
          enabled: toBoolean(state.enabled, option.defaultOn),
          intensity: toIntensity(state.intensity),
        },
      ];
    }),
  ) as Record<ArtifactId, ArtifactState>;
}

function migrateCropping(source: Record<string, unknown>, recommended: CroppingId): CroppingId {
  if (typeof source.cropping === "string") return oneOf<CroppingId>(source.cropping, CROPPING_OPTIONS, recommended);
  if (source.allowCrop === false && (recommended === "extreme" || recommended === "strong")) return "natural";
  if (source.allowCrop === true && (recommended === "none" || recommended === "natural")) return "strong";
  return recommended;
}

function migrateVisibility(source: Record<string, unknown>, recommended: VisibilityId): VisibilityId {
  if (typeof source.visibility === "string") {
    return oneOf<VisibilityId>(source.visibility, VISIBILITY_OPTIONS, recommended);
  }
  if (source.fillFrame === true) return "fragment";
  if (source.fillFrame === false && recommended === "fragment") return "partial";
  return recommended;
}

export function normalizeSettings(input: unknown): Settings {
  const source = isRecord(input) ? input : {};
  const angleValue = source.angle;
  const angle: AngleId | null =
    angleValue == null
      ? null
      : ANGLE_OPTIONS.some((option) => option.id === angleValue)
        ? (angleValue as AngleId)
        : null;
  const lighting = oneOf<LightingId>(source.lighting, LIGHTING_OPTIONS, "daylight");
  const shotScale = oneOf<ShotScaleId>(source.shotScale, SHOT_SCALE_OPTIONS, "medium");
  const scaleDefaults = SHOT_SCALE_OPTIONS.find((option) => option.id === shotScale);
  const cropping = migrateCropping(source, scaleDefaults?.cropping ?? "natural");
  const visibility = migrateVisibility(source, scaleDefaults?.visibility ?? "mostly");

  return {
    scene: toText(source.scene),
    characters: toText(source.characters),
    action: toText(source.action),
    location: toText(source.location),
    perspectiveNote: toText(source.perspectiveNote),
    visibleInFrame: toText(source.visibleInFrame),
    outsideFrame: toText(source.outsideFrame),
    character: flags<CharacterId>(CHARACTER_OPTIONS, source.character),
    framing: flags<FramingId>(FRAMING_OPTIONS, source.framing),
    shotScale,
    cropping,
    visibility,
    actionFirst: toBoolean(source.actionFirst, scaleDefaults?.actionFirst ?? false),
    accidentalFraming: toBoolean(source.accidentalFraming, false),
    occlusion: oneOf<OcclusionId>(source.occlusion, OCCLUSION_OPTIONS, "none"),
    naturalness: toBoolean(source.naturalness, true),
    angle,
    depth: flags<DepthId>(DEPTH_OPTIONS, source.depth),
    tilt: toTilt(source.tilt) as TiltLevel,
    filmType: oneOf<FilmId>(source.filmType, FILM_OPTIONS, "colorNegative"),
    grainEnabled: toBoolean(source.grainEnabled, true),
    grain: toGrain(source.grain) as GrainLevel,
    colors: flags<ColorId>(COLOR_OPTIONS, source.colors),
    exposure: oneOf<ExposureId>(source.exposure, EXPOSURE_OPTIONS, "natural"),
    sharpness: oneOf<SharpnessId>(source.sharpness, SHARPNESS_OPTIONS, "softness"),
    lighting,
    noFlash: lighting === "flash" ? false : toBoolean(source.noFlash, false),
    artifacts: normalizeArtifacts(source.artifacts),
  };
}

export const defaultSettings: Settings = normalizeSettings({});

export function sceneOf(settings: Settings): SceneSettings {
  return {
    scene: settings.scene,
    characters: settings.characters,
    action: settings.action,
    location: settings.location,
    perspectiveNote: settings.perspectiveNote,
    visibleInFrame: settings.visibleInFrame,
    outsideFrame: settings.outsideFrame,
  };
}

export function extractStyle(settings: Settings): StyleSettings {
  return {
    character: settings.character,
    framing: settings.framing,
    shotScale: settings.shotScale,
    cropping: settings.cropping,
    visibility: settings.visibility,
    actionFirst: settings.actionFirst,
    accidentalFraming: settings.accidentalFraming,
    occlusion: settings.occlusion,
    naturalness: settings.naturalness,
    angle: settings.angle,
    depth: settings.depth,
    tilt: settings.tilt,
    filmType: settings.filmType,
    grainEnabled: settings.grainEnabled,
    grain: settings.grain,
    colors: settings.colors,
    exposure: settings.exposure,
    sharpness: settings.sharpness,
    lighting: settings.lighting,
    noFlash: settings.noFlash,
    artifacts: settings.artifacts,
  };
}

export function applyStyle(current: Settings, style: StyleSettings): Settings {
  return {
    ...sceneOf(current),
    ...style,
  };
}

export function stylesEqual(left: StyleSettings, right: StyleSettings): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}
