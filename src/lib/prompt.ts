import {
  ANGLE_OPTIONS,
  ARTIFACT_OPTIONS,
  CHARACTER_OPTIONS,
  COLOR_OPTIONS,
  ACCIDENTAL_FRAMING_PROSE,
  ACTION_FIRST_PROSE,
  CONSTRAINTS,
  CROPPING_OPTIONS,
  DEPTH_OPTIONS,
  EXPOSURE_OPTIONS,
  EXTREME_FRAGMENT_PROSE,
  FILM_OPTIONS,
  FRAMING_OPTIONS,
  GRAIN_STEPS,
  LIGHTING_OPTIONS,
  NATURALNESS_PROSE,
  OCCLUSION_OPTIONS,
  SHARPNESS_OPTIONS,
  SHOT_SCALE_OPTIONS,
  TILT_STEPS,
  VISIBILITY_OPTIONS,
} from "../config/options";
import type { DepthId, ShotScaleId } from "../config/options";
import type { PromptDescription, PromptMode, Settings, TiltLevel } from "../types";
import { clampIndex, proseList, sentence, uniqueStrings } from "./text";

function byId<T extends { id: string }>(options: readonly T[], id: string): T {
  const found = options.find((option) => option.id === id);
  if (!found) {
    throw new Error(`Unknown option: ${id}`);
  }
  return found;
}

function effectiveTilt(settings: Settings): TiltLevel {
  if (settings.artifacts.subtleTilt.enabled && settings.tilt === 0) return 1;
  return settings.tilt;
}

function sceneParagraph(settings: Settings): string {
  const parts = [
    settings.scene.trim() ? sentence(settings.scene) : "",
    settings.characters.trim() ? sentence(`Main characters: ${settings.characters.trim()}`) : "",
    settings.action.trim() ? sentence(`Action: ${settings.action.trim()}`) : "",
    settings.location.trim() ? sentence(`Location: ${settings.location.trim()}`) : "",
  ].filter(Boolean);
  return parts.join(" ");
}

function proseTag(id: string, tag: string): string {
  if (id === "lofi") return "a lo-fi analog snapshot";
  if (id === "spontaneous") return "a spontaneous candid moment";
  if (id === "midAction") return "a moment caught mid-action";
  if (id === "memory") return "a personal memory aesthetic";
  if (id === "youth") return "a youth photography aesthetic";
  return tag;
}

function characterParagraph(settings: Settings): string {
  const selected = (cluster: "style" | "feeling" | "extra") =>
    CHARACTER_OPTIONS.filter((option) => option.cluster === cluster && settings.character[option.id]).map(
      (option) => proseTag(option.id, option.tag),
    );

  const style = selected("style");
  const feeling = selected("feeling");
  const extra = selected("extra");
  const parts = [
    style.length > 0 ? sentence(`Shot as ${proseList(style)}`) : "",
    feeling.length > 0 ? sentence(`It holds ${proseList(feeling)}`) : "",
    extra.length > 0 ? sentence(`The mood leans toward ${proseList(extra)}`) : "",
  ].filter(Boolean);
  return parts.join(" ");
}

function extremeFragment(settings: Settings): boolean {
  return settings.shotScale === "extreme" && settings.cropping === "extreme" && settings.visibility === "fragment";
}

function depthKept(settings: Settings, id: DepthId): boolean {
  const scale: ShotScaleId = settings.shotScale;
  if (settings.occlusion !== "none" && id === "occlusion") return false;
  if (scale === "wide" && id === "close") return false;
  if ((scale === "tight" || scale === "extreme") && id === "layered") return false;
  if (scale === "extreme" && id === "close") return false;
  return true;
}

function labeledLine(prefix: string, value: string): string {
  const text = value.trim();
  if (!text) return "";
  return sentence(`${prefix}: ${text}`);
}

function framingPriority(settings: Settings): string {
  const scale = byId(SHOT_SCALE_OPTIONS, settings.shotScale);
  const cropping = byId(CROPPING_OPTIONS, settings.cropping);
  const visibility = byId(VISIBILITY_OPTIONS, settings.visibility);
  const parts = extremeFragment(settings)
    ? [sentence(EXTREME_FRAGMENT_PROSE)]
    : [sentence(scale.prose), cropping.prose ? sentence(cropping.prose) : "", visibility.prose ? sentence(visibility.prose) : ""];
  if (settings.actionFirst) parts.push(sentence(ACTION_FIRST_PROSE));
  if (settings.accidentalFraming) parts.push(sentence(ACCIDENTAL_FRAMING_PROSE));
  return parts.filter(Boolean).join(" ");
}

function occlusionParagraph(settings: Settings): string {
  const option = byId(OCCLUSION_OPTIONS, settings.occlusion);
  return option.prose ? sentence(option.prose) : "";
}

function angleKept(settings: Settings): boolean {
  if (!settings.angle || settings.perspectiveNote.trim()) return false;
  if (settings.shotScale === "wide" && settings.angle === "immersive") return false;
  if (settings.shotScale !== "wide" && settings.shotScale !== "medium" && settings.angle === "environmental") {
    return false;
  }
  return true;
}

function compositionParagraph(settings: Settings, tilt: TiltLevel): string {
  const framing = FRAMING_OPTIONS.filter((option) => settings.framing[option.id]).map((option) => option.tag);
  const depth = DEPTH_OPTIONS.filter((option) => settings.depth[option.id] && depthKept(settings, option.id)).map(
    (option) => option.tag,
  );
  const parts = [
    framing.length > 0 ? sentence(`The framing uses ${proseList(framing)}`) : "",
    depth.length > 0 ? sentence(`Depth comes from ${proseList(depth)}`) : "",
    sentence(TILT_STEPS[tilt].prose),
  ].filter(Boolean);
  return parts.join(" ");
}

function perspectiveParagraph(settings: Settings): string {
  if (settings.perspectiveNote.trim()) {
    return sentence(`Camera perspective: ${settings.perspectiveNote.trim()}`);
  }
  if (!angleKept(settings) || !settings.angle) return "";
  return sentence(byId(ANGLE_OPTIONS, settings.angle).prose);
}

function grainChoice(settings: Settings): (typeof GRAIN_STEPS)[number] | null {
  if (settings.grainEnabled) return GRAIN_STEPS[settings.grain];
  if (settings.artifacts.organicGrain.enabled) return GRAIN_STEPS[1];
  return null;
}

function colorTags(settings: Settings): string[] {
  return COLOR_OPTIONS.filter((option) => settings.colors[option.id])
    .filter((option) => !(option.id === "faded" && settings.artifacts.fadedColors.enabled))
    .map((option) => option.tag);
}

function filmParagraph(settings: Settings): string {
  const film = byId(FILM_OPTIONS, settings.filmType);
  const exposure = byId(EXPOSURE_OPTIONS, settings.exposure);
  const sharpness = byId(SHARPNESS_OPTIONS, settings.sharpness);
  const grain = grainChoice(settings);
  const colors = colorTags(settings);
  return [
    sentence(film.prose),
    grain ? sentence(grain.prose) : "",
    colors.length > 0 ? sentence(`The palette carries ${proseList(colors)}`) : "",
    sentence(`${exposure.lead}, ${sharpness.tail}`),
  ]
    .filter(Boolean)
    .join(" ");
}

function lightingParagraph(settings: Settings): string {
  const lighting = byId(LIGHTING_OPTIONS, settings.lighting);
  const parts = [sentence(lighting.prose)];
  if (settings.lighting !== "flash" && settings.noFlash) {
    parts.push("No on-camera flash.");
  }
  return parts.join(" ");
}

function artifactParagraph(settings: Settings): string {
  const traces = ARTIFACT_OPTIONS.filter(
    (option) => option.group !== "foundation" && settings.artifacts[option.id].enabled,
  ).map((option) => {
    const index = clampIndex(settings.artifacts[option.id].intensity, option.levels.length);
    return option.levels[index].prose;
  });
  if (traces.length === 0) return "";
  return sentence(`Additional film traces, used sparingly: ${proseList(traces)}`);
}

function collectTags(settings: Settings, tilt: TiltLevel): string[] {
  const character = CHARACTER_OPTIONS.filter((option) => settings.character[option.id]).map(
    (option) => option.tag,
  );
  const scale = byId(SHOT_SCALE_OPTIONS, settings.shotScale);
  const cropping = byId(CROPPING_OPTIONS, settings.cropping);
  const visibility = byId(VISIBILITY_OPTIONS, settings.visibility);
  const occlusion = byId(OCCLUSION_OPTIONS, settings.occlusion);
  const framing = FRAMING_OPTIONS.filter((option) => settings.framing[option.id]).map((option) => option.tag);
  const depth = DEPTH_OPTIONS.filter((option) => settings.depth[option.id] && depthKept(settings, option.id)).map(
    (option) => option.tag,
  );
  const angle = angleKept(settings) && settings.angle ? [byId(ANGLE_OPTIONS, settings.angle).tag] : [];
  const grain = grainChoice(settings);
  const lighting = byId(LIGHTING_OPTIONS, settings.lighting);
  const artifactTags = ARTIFACT_OPTIONS.filter(
    (option) => option.group !== "foundation" && settings.artifacts[option.id].enabled,
  ).flatMap((option) => {
    const index = clampIndex(settings.artifacts[option.id].intensity, option.levels.length);
    return option.levels[index].tags;
  });

  const priorityTags = extremeFragment(settings)
    ? [
        "extreme camera proximity",
        "extreme close-up photography",
        "extreme cropping",
        "fragment only",
        "partial face visible",
        "subject larger than the frame",
        "subject extending beyond frame",
      ]
    : [...scale.tags, ...cropping.tags, ...visibility.tags];

  return uniqueStrings([
    ...priorityTags,
    ...(settings.actionFirst ? ["action-first framing"] : []),
    ...(settings.accidentalFraming ? ["accidental framing"] : []),
    ...occlusion.tags,
    ...character,
    ...(settings.naturalness ? ["natural everyday photographic realism"] : []),
    ...framing,
    ...depth,
    ...angle,
    ...TILT_STEPS[tilt].tags,
    byId(FILM_OPTIONS, settings.filmType).tag,
    ...(grain ? grain.tags : []),
    ...colorTags(settings),
    byId(EXPOSURE_OPTIONS, settings.exposure).tag,
    byId(SHARPNESS_OPTIONS, settings.sharpness).tag,
    ...lighting.tags,
    ...(settings.lighting !== "flash" && settings.noFlash ? ["no on-camera flash"] : []),
    ...artifactTags,
  ]);
}

export function describePrompt(settings: Settings): PromptDescription {
  const tilt = effectiveTilt(settings);
  const scene = sceneParagraph(settings);
  const visible = labeledLine("Visible in the frame", settings.visibleInFrame);
  const outside = labeledLine("Outside the frame", settings.outsideFrame);
  const priority = framingPriority(settings);
  const occlusion = occlusionParagraph(settings);
  const character = characterParagraph(settings);
  const naturalness = settings.naturalness ? sentence(NATURALNESS_PROSE) : "";
  const sections = [
    scene,
    visible,
    outside,
    priority,
    occlusion,
    compositionParagraph(settings, tilt),
    perspectiveParagraph(settings),
    character,
    naturalness,
    filmParagraph(settings),
    lightingParagraph(settings),
    artifactParagraph(settings),
    CONSTRAINTS,
  ].filter(Boolean);

  const tags = collectTags(settings, tilt);
  const compactParts = [scene, visible, outside, priority, occlusion, naturalness, tags.join(", "), CONSTRAINTS].filter(
    Boolean,
  );
  const foundationActive = ARTIFACT_OPTIONS.filter(
    (option) => option.group === "foundation" && settings.artifacts[option.id].enabled,
  ).map((option) => option.label);
  const optional = ARTIFACT_OPTIONS.filter(
    (option) => option.group !== "foundation" && settings.artifacts[option.id].enabled,
  );

  return {
    full: sections.join("\n\n"),
    compact: compactParts.join("\n\n"),
    chips: tags,
    foundationActive,
    optionalArtifactCount: optional.length,
    rareArtifactCount: optional.filter((option) => option.group === "rare").length,
  };
}

export function generatePrompt(settings: Settings, mode: PromptMode): string {
  const description = describePrompt(settings);
  return mode === "full" ? description.full : description.compact;
}
