import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { hasCyrillic } from "../lib/text";
import type { SceneSettings } from "../types";
import { fieldClass, focusClass, noteClass, panelClass } from "./ui";

type SceneEditorProps = {
  value: SceneSettings;
  onChange: (patch: Partial<SceneSettings>) => void;
};

const optionalFields: {
  key: "characters" | "action" | "location" | "perspectiveNote";
  label: string;
  tag: string;
  placeholder: string;
}[] = [
  {
    key: "characters",
    label: "Главные герои",
    tag: "Main characters",
    placeholder: "Отец и сын",
  },
  {
    key: "action",
    label: "Действие",
    tag: "Action",
    placeholder: "Сравнивает две игрушечные машинки",
  },
  {
    key: "location",
    label: "Место",
    tag: "Location",
    placeholder: "Гостиная, диван у окна",
  },
  {
    key: "perspectiveNote",
    label: "Ракурс камеры",
    tag: "Camera perspective",
    placeholder: "С дивана напротив, чуть сбоку",
  },
];

export function SceneEditor({ value, onChange }: SceneEditorProps) {
  const [open, setOpen] = useState(false);
  const sceneId = useId();
  const russian = hasCyrillic([
    value.scene,
    value.characters,
    value.action,
    value.location,
    value.perspectiveNote,
    value.visibleInFrame,
    value.outsideFrame,
  ]);
  const visibleId = useId();
  const outsideId = useId();
  const filled = optionalFields.filter((field) => value[field.key].trim()).length;

  return (
    <section className={panelClass}>
      <div className="px-6 py-6">
        <label htmlFor={sceneId} className="block text-base font-semibold leading-6 text-ink">
          Описание сцены
        </label>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Можно писать по-русски или по-английски. В промпт попадёт текст как есть.
        </p>
        <textarea
          id={sceneId}
          className={`${fieldClass} mt-3 min-h-36 resize-y`}
          rows={6}
          value={value.scene}
          placeholder="Например: Отец сидит на диване и сравнивает две игрушечные машинки, пока сын обнимает его сзади."
          onChange={(event) => onChange({ scene: event.target.value })}
        />
        <label htmlFor={visibleId} className="mt-5 block text-sm font-medium text-ink">
          Что должно быть видно в кадре?
        </label>
        <p className="mt-1 text-[11px] text-muted">Visible in the frame</p>
        <textarea
          id={visibleId}
          className={`${fieldClass} mt-1.5 min-h-20 resize-y`}
          rows={3}
          value={value.visibleInFrame}
          placeholder="Only the woman's squeezed-shut eyes, nose, mouth, fingers and apple. The forehead, chin and most of the hair are outside the frame."
          onChange={(event) => onChange({ visibleInFrame: event.target.value })}
        />
        <label htmlFor={outsideId} className="mt-4 block text-sm font-medium text-ink">
          Что должно остаться за кадром?
        </label>
        <p className="mt-1 text-[11px] text-muted">Outside the frame</p>
        <textarea
          id={outsideId}
          className={`${fieldClass} mt-1.5 min-h-20 resize-y`}
          rows={3}
          value={value.outsideFrame}
          placeholder="Full face, complete head, shoulders, upper body and surrounding environment."
          onChange={(event) => onChange({ outsideFrame: event.target.value })}
        />
        {russian ? (
          <p className={`mt-3 ${noteClass}`}>
            Текст на русском останется в промпте без перевода. Автоматического перевода нет — для Nano Banana лучше
            описать сцену по-английски.
          </p>
        ) : null}
      </div>
      <div className="border-t border-line">
        <button
          type="button"
          className={`flex w-full items-center justify-between px-6 py-4 text-left ${focusClass}`}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="text-sm font-medium text-ink">
            Детали сцены
            <span className="ml-2 text-xs font-normal text-muted">{filled > 0 ? `${filled} из 4` : "необязательно"}</span>
          </span>
          <ChevronDown className={`size-4 text-muted ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <div className="space-y-3 px-6 pb-6">
            {optionalFields.map((field) => {
              const id = `${sceneId}-${field.key}`;
              return (
                <label key={field.key} htmlFor={id} className="block">
                  <span className="block text-sm font-medium text-ink">{field.label}</span>
                  <span className="mt-0.5 block text-[11px] text-muted">{field.tag}</span>
                  <input
                    id={id}
                    className={`${fieldClass} mt-1.5`}
                    value={value[field.key]}
                    placeholder={field.placeholder}
                    onChange={(event) => onChange({ [field.key]: event.target.value })}
                  />
                </label>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
