import { CHARACTER_OPTIONS, type CharacterId } from "../config/options";
import { ChoiceOption, Hint, Subhead } from "./ui";
import { SettingsSection } from "./SettingsSection";

type PhotographyCharacterProps = {
  value: Record<CharacterId, boolean>;
  naturalness: boolean;
  onToggle: (id: CharacterId, checked: boolean) => void;
  onNaturalness: (enabled: boolean) => void;
};

export function PhotographyCharacter({ value, naturalness, onToggle, onNaturalness }: PhotographyCharacterProps) {
  const enabled = CHARACTER_OPTIONS.filter((option) => value[option.id]).length;
  const core = CHARACTER_OPTIONS.filter((option) => option.cluster !== "extra");
  const extra = CHARACTER_OPTIONS.filter((option) => option.cluster === "extra");

  return (
    <SettingsSection
      title="Характер съёмки"
      description="Основа стиля: любопытство, живое чувство и неидеальность любительского кадра."
      meta={`${enabled} вкл.`}
    >
      <ChoiceOption
        label="Приоритет естественности"
        description="Без приукрашивания, постановочной позы и нарочито кинематографичного света. Выбранные вспышка, блик или царапины при этом остаются."
        tag="natural everyday photographic realism"
        checked={naturalness}
        onChange={() => onNaturalness(!naturalness)}
      />
      <Subhead>Основа</Subhead>
      <Hint>Эти свойства включены по умолчанию и держат кадр в эстетике личного снимка.</Hint>
      <div className="space-y-1">
        {core.map((option) => (
          <ChoiceOption
            key={option.id}
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={value[option.id]}
            onChange={() => onToggle(option.id, !value[option.id])}
          />
        ))}
      </div>
      <Subhead>Дополнительно</Subhead>
      <div className="space-y-1">
        {extra.map((option) => (
          <ChoiceOption
            key={option.id}
            label={option.label}
            description={option.description}
            tag={option.tag}
            checked={value[option.id]}
            onChange={() => onToggle(option.id, !value[option.id])}
          />
        ))}
      </div>
    </SettingsSection>
  );
}
