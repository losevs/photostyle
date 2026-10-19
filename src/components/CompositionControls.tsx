import {
  ANGLE_OPTIONS,
  CROPPING_OPTIONS,
  DEPTH_OPTIONS,
  FRAMING_OPTIONS,
  OCCLUSION_OPTIONS,
  SHOT_SCALE_OPTIONS,
  TILT_STEPS,
  VISIBILITY_OPTIONS,
  type AngleId,
  type CroppingId,
  type DepthId,
  type FramingId,
  type OcclusionId,
  type ShotScaleId,
  type VisibilityId,
} from "../config/options";
import type { TiltLevel } from "../types";
import { IntensitySlider } from "./IntensitySlider";
import { SettingsSection } from "./SettingsSection";
import { ChoiceOption, Hint, Subhead, focusClass, noteClass } from "./ui";

type SegmentOption = { id: string; short: string };

function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly SegmentOption[];
  onChange: (id: string) => void;
}) {
  return (
    <div
      className="grid gap-1 rounded-[16px] bg-canvas p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`rounded-[8px] px-1 py-2 text-center text-[11px] leading-tight ${focusClass} ${
              selected ? "bg-white font-medium text-ink shadow-button ring-1 ring-blue" : "text-muted"
            }`}
            onClick={() => onChange(option.id)}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}

type CompositionControlsProps = {
  framing: Record<FramingId, boolean>;
  shotScale: ShotScaleId;
  cropping: CroppingId;
  visibility: VisibilityId;
  actionFirst: boolean;
  accidentalFraming: boolean;
  occlusion: OcclusionId;
  angle: AngleId | null;
  depth: Record<DepthId, boolean>;
  tilt: TiltLevel;
  perspectiveNote: string;
  onFraming: (id: FramingId, checked: boolean) => void;
  onShotScale: (id: ShotScaleId) => void;
  onCropping: (id: CroppingId) => void;
  onVisibility: (id: VisibilityId) => void;
  onActionFirst: (enabled: boolean) => void;
  onAccidentalFraming: (enabled: boolean) => void;
  onOcclusion: (id: OcclusionId) => void;
  onAngle: (id: AngleId | null) => void;
  onDepth: (id: DepthId, checked: boolean) => void;
  onTilt: (value: TiltLevel) => void;
};

export function CompositionControls({
  framing,
  shotScale,
  cropping,
  visibility,
  actionFirst,
  accidentalFraming,
  occlusion,
  angle,
  depth,
  tilt,
  perspectiveNote,
  onFraming,
  onShotScale,
  onCropping,
  onVisibility,
  onActionFirst,
  onAccidentalFraming,
  onOcclusion,
  onAngle,
  onDepth,
  onTilt,
}: CompositionControlsProps) {
  const framingCount = FRAMING_OPTIONS.filter((option) => framing[option.id]).length;
  const depthCount = DEPTH_OPTIONS.filter((option) => depth[option.id]).length;
  const scale = SHOT_SCALE_OPTIONS.find((option) => option.id === shotScale) ?? SHOT_SCALE_OPTIONS[1];
  const crop = CROPPING_OPTIONS.find((option) => option.id === cropping) ?? CROPPING_OPTIONS[1];
  const seen = VISIBILITY_OPTIONS.find((option) => option.id === visibility) ?? VISIBILITY_OPTIONS[1];
  const overlap = OCCLUSION_OPTIONS.find((option) => option.id === occlusion) ?? OCCLUSION_OPTIONS[0];

  return (
    <SettingsSection
      title="Композиция"
      description="Дистанция до объекта, один ракурс и живая рамка."
      meta={`${scale.short} · ${framingCount + depthCount + (angle ? 1 : 0)} приёмов`}
    >
      <Subhead>Дистанция камеры</Subhead>
      <Hint>Только насколько близко стоит камера. Обрезка и видимость объекта задаются отдельно.</Hint>
      <Segmented
        label="Дистанция камеры"
        value={shotScale}
        options={SHOT_SCALE_OPTIONS}
        onChange={(id) => onShotScale(id as ShotScaleId)}
      />
      <p className="mt-3 text-sm font-medium text-ink">
        {scale.label}
        <span className="ml-2 text-xs font-normal text-muted">{scale.english}</span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{scale.description}</p>
      {shotScale === "extreme" ? (
        <p className={`mt-3 ${noteClass}`}>
          Для съёмки вплотную предложены крайняя обрезка, только фрагмент и композиция вокруг действия. Любой из этих
          параметров можно сменить, не меняя дистанцию.
        </p>
      ) : null}

      <Subhead>Сила обрезки</Subhead>
      <Segmented
        label="Сила обрезки"
        value={cropping}
        options={CROPPING_OPTIONS}
        onChange={(id) => onCropping(id as CroppingId)}
      />
      <p className="mt-3 text-sm font-medium text-ink">
        {crop.label}
        <span className="ml-2 text-xs font-normal text-muted">{crop.english}</span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{crop.description}</p>

      <Subhead>Видимость объекта</Subhead>
      <Segmented
        label="Видимость объекта"
        value={visibility}
        options={VISIBILITY_OPTIONS}
        onChange={(id) => onVisibility(id as VisibilityId)}
      />
      <p className="mt-3 text-sm font-medium text-ink">
        {seen.label}
        <span className="ml-2 text-xs font-normal text-muted">{seen.english}</span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{seen.description}</p>

      <div className="mt-4 space-y-1">
        <ChoiceOption
          label="Композиция вокруг действия"
          description="В кадре жест, а не то, кто этот человек и как он выглядит."
          tag="action-first framing"
          checked={actionFirst}
          onChange={() => onActionFirst(!actionFirst)}
        />
        <ChoiceOption
          label="Случайное кадрирование"
          description="Кадр не успели поправить. Наклон камеры при этом не включается."
          tag="accidental framing"
          checked={accidentalFraming}
          onChange={() => onAccidentalFraming(!accidentalFraming)}
        />
      </div>

      <Subhead>Перекрытие объектов</Subhead>
      <Segmented
        label="Перекрытие объектов"
        value={occlusion}
        options={OCCLUSION_OPTIONS}
        onChange={(id) => onOcclusion(id as OcclusionId)}
      />
      <p className="mt-3 text-sm font-medium text-ink">
        {overlap.label}
        <span className="ml-2 text-xs font-normal text-muted">{overlap.english}</span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{overlap.description}</p>

      <Subhead>Кадрирование</Subhead>
      <div className="grid gap-1 sm:grid-cols-2">
        {FRAMING_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={framing[option.id]}
            onChange={() => onFraming(option.id, !framing[option.id])}
          />
        ))}
      </div>

      <Subhead>Угол камеры</Subhead>
      <Hint>В промпт попадает только один угол, чтобы не смешивать точки съёмки.</Hint>
      {perspectiveNote.trim() ? (
        <p className={`mb-2 ${noteClass}`}>
          Свободный ракурс из описания сцены заменит выбранный угол в промпте.
        </p>
      ) : null}
      <div className="space-y-1">
        <ChoiceOption
          type="radio"
          name="camera-angle"
          label="Не задавать"
          description="Угол не добавляется, если свободный ракурс тоже пуст."
          checked={angle === null}
          onChange={() => onAngle(null)}
        />
        {ANGLE_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            type="radio"
            name="camera-angle"
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={angle === option.id}
            onChange={() => onAngle(option.id)}
          />
        ))}
      </div>

      <Subhead>Глубина</Subhead>
      <div className="grid gap-1 sm:grid-cols-2">
        {DEPTH_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={depth[option.id]}
            onChange={() => onDepth(option.id, !depth[option.id])}
          />
        ))}
      </div>

      <Subhead>Наклон камеры</Subhead>
      <Hint>0 — ровный горизонт, 3 — сильный случайный завал.</Hint>
      <IntensitySlider
        label="Наклон камеры"
        value={tilt}
        steps={TILT_STEPS}
        detail={TILT_STEPS[tilt].tags.join(" · ")}
        onChange={(value) => onTilt(value as TiltLevel)}
      />
    </SettingsSection>
  );
}
