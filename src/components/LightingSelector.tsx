import { LIGHTING_OPTIONS, type LightingId } from "../config/options";
import { SettingsSection } from "./SettingsSection";
import { ChoiceOption, Hint, noteClass } from "./ui";

type LightingSelectorProps = {
  lighting: LightingId;
  noFlash: boolean;
  onLighting: (id: LightingId) => void;
  onNoFlash: (enabled: boolean) => void;
};

export function LightingSelector({ lighting, noFlash, onLighting, onNoFlash }: LightingSelectorProps) {
  const current = LIGHTING_OPTIONS.find((option) => option.id === lighting);

  return (
    <SettingsSection title="Освещение" description="Один основной свет. Вспышка заменяет остальные схемы." meta={current?.label}>
      <Hint>Фразы про вспышку появляются только в режиме прямой вспышки.</Hint>
      <div className="grid gap-1 sm:grid-cols-2">
        {LIGHTING_OPTIONS.map((option) => (
          <ChoiceOption
            key={option.id}
            type="radio"
            name="lighting"
            label={option.label}
            description={option.description}
            tag={option.tags.join(" · ")}
            checked={lighting === option.id}
            onChange={() => onLighting(option.id)}
          />
        ))}
      </div>
      {lighting === "flash" ? (
        <p className={`mt-3 ${noteClass}`}>
          В промпт добавятся прямая вспышка, яркие лица, естественный спад, плотные тени и более тёмный фон.
        </p>
      ) : (
        <div className="mt-3">
          <ChoiceOption
            label="Добавить «без вспышки»"
            description="Само по себе это ограничение не добавляется."
            tag="no on-camera flash"
            checked={noFlash}
            onChange={() => onNoFlash(!noFlash)}
          />
        </div>
      )}
    </SettingsSection>
  );
}
