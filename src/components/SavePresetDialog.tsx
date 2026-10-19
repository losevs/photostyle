import { useEffect, useId, useState } from "react";
import { Button, fieldClass } from "./ui";

type SavePresetDialogProps = {
  onClose: () => void;
  onSave: (name: string) => boolean;
};

export function SavePresetDialog({ onClose, onSave }: SavePresetDialogProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const titleId = useId();
  const inputId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center" onMouseDown={onClose}>
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-card"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          if (!onSave(name)) setError("Введите название.");
        }}
      >
        <h2 id={titleId} className="text-base font-semibold text-ink">
          Сохранить пресет
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Сохранится текущий стиль. Описание сцены в пресет не входит.
        </p>
        <label htmlFor={inputId} className="mt-4 block text-sm font-medium text-ink">
          Название
        </label>
        <input
          id={inputId}
          autoFocus
          maxLength={48}
          className={`${fieldClass} mt-1.5`}
          value={name}
          placeholder="Например: Кухня вечером"
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
        />
        {error ? <p className="mt-2 text-xs font-medium text-ink">{error}</p> : null}
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
