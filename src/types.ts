import type {
  AngleId,
  ArtifactId,
  CharacterId,
  ColorId,
  DepthId,
  ExposureId,
  FilmId,
  CroppingId,
  FramingId,
  LightingId,
  OcclusionId,
  SharpnessId,
  ShotScaleId,
  VisibilityId,
} from "./config/options";

export type Intensity = 0 | 1 | 2;
export type TiltLevel = 0 | 1 | 2 | 3;
export type GrainLevel = 0 | 1 | 2 | 3;
export type PromptMode = "full" | "compact";

export type ArtifactState = {
  enabled: boolean;
  intensity: Intensity;
};

export type Settings = {
  scene: string;
  characters: string;
  action: string;
  location: string;
  perspectiveNote: string;
  visibleInFrame: string;
  outsideFrame: string;
  character: Record<CharacterId, boolean>;
  framing: Record<FramingId, boolean>;
  shotScale: ShotScaleId;
  cropping: CroppingId;
  visibility: VisibilityId;
  actionFirst: boolean;
  accidentalFraming: boolean;
  occlusion: OcclusionId;
  naturalness: boolean;
  angle: AngleId | null;
  depth: Record<DepthId, boolean>;
  tilt: TiltLevel;
  filmType: FilmId;
  grainEnabled: boolean;
  grain: GrainLevel;
  colors: Record<ColorId, boolean>;
  exposure: ExposureId;
  sharpness: SharpnessId;
  lighting: LightingId;
  noFlash: boolean;
  artifacts: Record<ArtifactId, ArtifactState>;
};

export type StyleSettings = Omit<
  Settings,
  "scene" | "characters" | "action" | "location" | "perspectiveNote" | "visibleInFrame" | "outsideFrame"
>;

export type SceneSettings = Pick<
  Settings,
  "scene" | "characters" | "action" | "location" | "perspectiveNote" | "visibleInFrame" | "outsideFrame"
>;

export type PresetDraft = {
  character?: Partial<Record<CharacterId, boolean>>;
  framing?: Partial<Record<FramingId, boolean>>;
  shotScale?: ShotScaleId;
  cropping?: CroppingId;
  visibility?: VisibilityId;
  actionFirst?: boolean;
  accidentalFraming?: boolean;
  occlusion?: OcclusionId;
  naturalness?: boolean;
  angle?: AngleId | null;
  depth?: Partial<Record<DepthId, boolean>>;
  tilt?: TiltLevel;
  filmType?: FilmId;
  grainEnabled?: boolean;
  grain?: GrainLevel;
  colors?: Partial<Record<ColorId, boolean>>;
  exposure?: ExposureId;
  sharpness?: SharpnessId;
  lighting?: LightingId;
  noFlash?: boolean;
  artifacts?: Partial<Record<ArtifactId, Partial<ArtifactState>>>;
};

export type CustomPreset = {
  id: string;
  name: string;
  style: StyleSettings;
};

export type PromptDescription = {
  full: string;
  compact: string;
  chips: string[];
  foundationActive: string[];
  optionalArtifactCount: number;
  rareArtifactCount: number;
};
