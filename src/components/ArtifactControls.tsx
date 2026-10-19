import { AlertTriangle, Dices } from "lucide-react";
import { ARTIFACT_OPTIONS, INTENSITY_LABELS, RARE_WARNING_AT, type ArtifactId } from "../config/options";
import type { ArtifactState, Intensity } from "../types";
import { IntensitySlider } from "./IntensitySlider";
import { SettingsSection } from "./SettingsSection";
import { Button, ChoiceOption, Hint, Subhead, noteClass } from "./ui";

type ArtifactControlsProps = {
  value: Record<ArtifactId, ArtifactState>;
  onToggle: (id: ArtifactId, enabled: boolean) => void;
  onIntensity: (id: ArtifactId, intensity: Intensity) => void;
  onRandomize: () => void;
};

const groups = [
  { id: "foundation", title: "Основа", hint: "Почти всегда уместны." },
  { id: "situational", title: "По ситуации", hint: "Когда момент или свет этого просят." },
  { id: "rare", title: "Редко", hint: "Лучше один-два за раз." },
] as const;

export function ArtifactControls({ value, onToggle, onIntensity, onRandomize }: ArtifactControlsProps) {
  const optionalCount = ARTIFACT_OPTIONS.filter((option) => option.group !== "foundation" && value[option.id].enabled).length;
  const rareCount = ARTIFACT_OPTIONS.filter((option) => option.group === "rare" && value[option.id].enabled).length;

  return (
    <SettingsSection
      title="Плёночные артефакты"
      description="Чем реже артефакт, тем осторожнее его стоит включать."
      meta={`${optionalCount} доп.`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Hint>Случайный набор включает не больше двух необязательных артефактов. Основа не меняется.</Hint>
        <Button onClick={onRandomize}>
          <Dices className="size-4" />
          Случайные артефакты
        </Button>
      </div>

      {groups.map((group) => (
        <div key={group.id}>
          <Subhead>{group.title}</Subhead>
          <Hint>{group.hint}</Hint>
          <div className="space-y-1">
            {ARTIFACT_OPTIONS.filter((option) => option.group === group.id).map((option) => {
              const state = value[option.id];
              const level = option.levels[Math.min(state.intensity, option.levels.length - 1)];
              return (
                <div key={option.id}>
                  <ChoiceOption
                    label={option.label}
                    description={option.description}
                    tag={level?.tags.join(" · ")}
                    checked={state.enabled}
                    onChange={() => onToggle(option.id, !state.enabled)}
                  />
                  {state.enabled && option.group !== "foundation" ? (
                    <div className="px-3 pb-2 pt-1">
                      <IntensitySlider
                        label={option.label}
                        value={state.intensity}
                        steps={INTENSITY_LABELS}
                        detail={`${INTENSITY_LABELS[state.intensity]?.english ?? ""} · ${level?.tags.join(", ") ?? ""}`}
                        onChange={(next) => onIntensity(option.id, next as Intensity)}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {rareCount >= RARE_WARNING_AT ? (
        <p className={`mt-4 flex gap-2 ${noteClass}`}>
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>Слишком много артефактов могут сделать фотографию искусственно состаренной.</span>
        </p>
      ) : null}
    </SettingsSection>
  );
}
