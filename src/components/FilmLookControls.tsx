import {
  COLOR_OPTIONS,
  EXPOSURE_OPTIONS,
  FILM_OPTIONS,
  GRAIN_STEPS,
  SHARPNESS_OPTIONS,
  type ColorId,
  type ExposureId,
  type FilmId,
  type SharpnessId,
} from "../config/options";
import type { GrainLevel } from "../types";
import { IntensitySlider } from "./IntensitySlider";
import { SettingsSection } from "./SettingsSection";
import { ChoiceOption, Hint, Subhead } from "./ui";

type FilmLookControlsProps = {
  filmType: FilmId;
  grainEnabled: boolean;
  grain: GrainLevel;
  colors: Record<ColorId, boolean>;
  exposure: ExposureId;
  sharpness: SharpnessId;
  onFilmType: (id: FilmId) => void;
  onGrainEnabled: (enabled: boolean) => void;
  onGrain: (value: GrainLevel) => void;
  onColor: (id: ColorId, checked: boolean) => void;
  onExposure: (id: ExposureId) => void;
  onSharpness: (id: SharpnessId) => void;
};

export function FilmLookControls({
  filmType,
  grainEnabled,
  grain,
  colors,
  exposure,
  sharpness,
  onFilmType,
  onGrainEnabled,
  onGrain,
  onColor,
  onExposure,
  onSharpness,
}: FilmLookControlsProps) {
  const colorCount = COLOR_OPTIONS.filter((option) => colors[option.id]).length;

  return (
    <SettingsSection title="Плёночная обработка" description="Цвет, зерно, экспозиция и резкость бытовой плёнки." meta={`${colorCount} цвета`}>
      <Subhead>Тип плёнки</Subhead>
      <Hint>Название задаёт цвет и контраст. Логотипы и упаковка в кадр не добавляются.</Hint>
      <div className="space-y-1">
        {FILM_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            type="radio"
            name="film-type"
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={filmType === option.id}
            onChange={() => onFilmType(option.id)}
          />
        ))}
      </div>

      <Subhead>Зерно</Subhead>
      <ChoiceOption
        label="Плёночное зерно"
        description="Интенсивность ниже. Если выключить, зерно может остаться из базовых артефактов."
        tag="organic film grain"
        checked={grainEnabled}
        onChange={() => onGrainEnabled(!grainEnabled)}
      />
      <fieldset disabled={!grainEnabled} className={`mt-3 border-0 p-0 ${grainEnabled ? "" : "opacity-40"}`}>
        <IntensitySlider
          label="Интенсивность зерна"
          value={grain}
          steps={GRAIN_STEPS}
          detail={GRAIN_STEPS[grain].tags.join(" · ")}
          onChange={(value) => onGrain(value as GrainLevel)}
        />
      </fieldset>

      <Subhead>Цвет</Subhead>
      <div className="grid gap-1 sm:grid-cols-2">
        {COLOR_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={colors[option.id]}
            onChange={() => onColor(option.id, !colors[option.id])}
          />
        ))}
      </div>

      <Subhead>Экспозиция</Subhead>
      <div className="grid gap-1 sm:grid-cols-2">
        {EXPOSURE_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            type="radio"
            name="exposure"
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={exposure === option.id}
            onChange={() => onExposure(option.id)}
          />
        ))}
      </div>

      <Subhead>Резкость</Subhead>
      <div className="grid gap-1 sm:grid-cols-2">
        {SHARPNESS_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            type="radio"
            name="sharpness"
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={sharpness === option.id}
            onChange={() => onSharpness(option.id)}
          />
        ))}
      </div>
    </SettingsSection>
  );
}
