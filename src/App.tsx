import { useCallback, useMemo, useState } from "react";
import logo from "../brandbook-alice/assets/logo-color.svg";
import { ArtifactControls } from "./components/ArtifactControls";
import { CompositionControls } from "./components/CompositionControls";
import { FilmLookControls } from "./components/FilmLookControls";
import { LightingSelector } from "./components/LightingSelector";
import { PhotographyCharacter } from "./components/PhotographyCharacter";
import { PresetSelector } from "./components/PresetSelector";
import { PromptPreview } from "./components/PromptPreview";
import { SavePresetDialog } from "./components/SavePresetDialog";
import { SceneEditor } from "./components/SceneEditor";
import { describePrompt } from "./lib/prompt";
import { hasCyrillic } from "./lib/text";
import { extractStyle, sceneOf } from "./state/defaults";
import { useSettings } from "./state/useSettings";
import {
  SHOT_SCALE_OPTIONS,
  type AngleId,
  type ArtifactId,
  type CharacterId,
  type ColorId,
  type DepthId,
  type ExposureId,
  type FilmId,
  type CroppingId,
  type FramingId,
  type LightingId,
  type OcclusionId,
  type SharpnessId,
  type ShotScaleId,
  type VisibilityId,
} from "./config/options";
import type { GrainLevel, Intensity, TiltLevel } from "./types";

export default function App() {
  const {
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
  } = useSettings();
  const [saveOpen, setSaveOpen] = useState(false);
  const closeSave = useCallback(() => setSaveOpen(false), []);
  const description = useMemo(() => describePrompt(settings), [settings]);
  const text = mode === "full" ? description.full : description.compact;
  const scene = sceneOf(settings);
  const russianInScene = hasCyrillic([
    scene.scene,
    scene.characters,
    scene.action,
    scene.location,
    scene.perspectiveNote,
    scene.visibleInFrame,
    scene.outsideFrame,
  ]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="mx-auto w-full max-w-[1200px] px-4 pt-8 pb-2 lg:px-12">
        <img src={logo} alt="Алиса" className="h-7 w-auto" />
        <p className="label-caps mt-7 text-muted">35 мм</p>
        <h1 className="mt-2 text-[2rem] font-semibold leading-9 tracking-[-0.005em] text-ink">
          Спонтанно, как в детстве
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-6 text-muted">
          Конструктор промптов для любительской плёнки: обычный момент, живое чувство и неидеальный кадр. Интерфейс
          по-русски, готовый промпт — по-английски, в первую очередь для Nano Banana.
        </p>
        <div className="mt-6">
          <PresetSelector
            activeStyle={extractStyle(settings)}
            customPresets={customPresets}
            onApply={applyStyleSettings}
            onDelete={deletePreset}
          />
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1200px] items-start gap-4 px-4 pt-4 pb-[44vh] lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)] lg:gap-6 lg:px-12 lg:pb-12">
        <main className="min-w-0 space-y-4">
          <SceneEditor
            value={scene}
            onChange={(patch) => update((current) => ({ ...current, ...patch }))}
          />
          <PhotographyCharacter
            value={settings.character}
            naturalness={settings.naturalness}
            onToggle={(id: CharacterId, checked) =>
              update((current) => ({ ...current, character: { ...current.character, [id]: checked } }))
            }
            onNaturalness={(enabled) => update((current) => ({ ...current, naturalness: enabled }))}
          />
          <CompositionControls
            framing={settings.framing}
            shotScale={settings.shotScale}
            cropping={settings.cropping}
            visibility={settings.visibility}
            actionFirst={settings.actionFirst}
            accidentalFraming={settings.accidentalFraming}
            occlusion={settings.occlusion}
            angle={settings.angle}
            depth={settings.depth}
            tilt={settings.tilt}
            perspectiveNote={settings.perspectiveNote}
            onFraming={(id: FramingId, checked) =>
              update((current) => ({ ...current, framing: { ...current.framing, [id]: checked } }))
            }
            onShotScale={(id: ShotScaleId) =>
              update((current) => {
                const next = SHOT_SCALE_OPTIONS.find((option) => option.id === id);
                return {
                  ...current,
                  shotScale: id,
                  cropping: next?.cropping ?? current.cropping,
                  visibility: next?.visibility ?? current.visibility,
                  actionFirst: next?.actionFirst ?? current.actionFirst,
                };
              })
            }
            onCropping={(id: CroppingId) => update((current) => ({ ...current, cropping: id }))}
            onVisibility={(id: VisibilityId) => update((current) => ({ ...current, visibility: id }))}
            onActionFirst={(enabled) => update((current) => ({ ...current, actionFirst: enabled }))}
            onAccidentalFraming={(enabled) => update((current) => ({ ...current, accidentalFraming: enabled }))}
            onOcclusion={(id: OcclusionId) => update((current) => ({ ...current, occlusion: id }))}
            onAngle={(id: AngleId | null) => update((current) => ({ ...current, angle: id }))}
            onDepth={(id: DepthId, checked) =>
              update((current) => ({ ...current, depth: { ...current.depth, [id]: checked } }))
            }
            onTilt={(value: TiltLevel) => update((current) => ({ ...current, tilt: value }))}
          />
          <FilmLookControls
            filmType={settings.filmType}
            grainEnabled={settings.grainEnabled}
            grain={settings.grain}
            colors={settings.colors}
            exposure={settings.exposure}
            sharpness={settings.sharpness}
            onFilmType={(id: FilmId) => update((current) => ({ ...current, filmType: id }))}
            onGrainEnabled={(enabled) => update((current) => ({ ...current, grainEnabled: enabled }))}
            onGrain={(value: GrainLevel) => update((current) => ({ ...current, grain: value }))}
            onColor={(id: ColorId, checked) =>
              update((current) => ({ ...current, colors: { ...current.colors, [id]: checked } }))
            }
            onExposure={(id: ExposureId) => update((current) => ({ ...current, exposure: id }))}
            onSharpness={(id: SharpnessId) => update((current) => ({ ...current, sharpness: id }))}
          />
          <LightingSelector
            lighting={settings.lighting}
            noFlash={settings.noFlash}
            onLighting={(id: LightingId) =>
              update((current) => ({
                ...current,
                lighting: id,
                noFlash: id === "flash" ? false : current.noFlash,
              }))
            }
            onNoFlash={(enabled) => update((current) => ({ ...current, noFlash: enabled }))}
          />
          <ArtifactControls
            value={settings.artifacts}
            onToggle={(id: ArtifactId, enabled) =>
              update((current) => ({
                ...current,
                artifacts: { ...current.artifacts, [id]: { ...current.artifacts[id], enabled } },
              }))
            }
            onIntensity={(id: ArtifactId, intensity: Intensity) =>
              update((current) => ({
                ...current,
                artifacts: { ...current.artifacts, [id]: { ...current.artifacts[id], intensity } },
              }))
            }
            onRandomize={randomizeArtifacts}
          />
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:sticky lg:inset-auto lg:top-4 lg:z-auto lg:self-start lg:px-0 lg:pb-0">
          <PromptPreview
            text={text}
            chips={description.chips}
            mode={mode}
            sceneEmpty={!settings.scene.trim()}
            russianInScene={russianInScene}
            foundationActive={description.foundationActive}
            optionalArtifactCount={description.optionalArtifactCount}
            onMode={setMode}
            onReset={reset}
            onSave={() => setSaveOpen(true)}
          />
        </div>
      </div>

      {saveOpen ? (
        <SavePresetDialog
          onClose={closeSave}
          onSave={(name) => {
            const saved = savePreset(name);
            if (saved) setSaveOpen(false);
            return saved;
          }}
        />
      ) : null}
    </div>
  );
}
