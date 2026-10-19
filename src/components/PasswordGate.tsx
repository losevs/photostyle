import { useId, useState, type FormEvent, type ReactNode } from "react";
import logo from "../../brandbook-alice/assets/logo-color.svg";
import { Button, fieldClass, panelClass } from "./ui";

const GATE_KEY = "photostyle.gate";
const PASSWORD = "alice2026";

function isUnlocked(): boolean {
  try {
    return sessionStorage.getItem(GATE_KEY) === "1";
  } catch {
    return false;
  }
}

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputId = useId();

  if (unlocked) return children;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (value.trim() !== PASSWORD) {
      setError(true);
      return;
    }
    try {
      sessionStorage.setItem(GATE_KEY, "1");
    } catch {
      // The gate still opens for this visit if storage is blocked.
    }
    setUnlocked(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <form className={`${panelClass} w-full max-w-md px-6 py-8`} onSubmit={submit}>
        <img src={logo} alt="Алиса" className="h-7 w-auto" />
        <h1 className="mt-7 text-[2rem] font-semibold leading-9 tracking-[-0.005em] text-ink">Вход</h1>
        <p className="mt-3 text-base leading-6 text-muted">Конструктор промптов открывается по паролю.</p>
        <label htmlFor={inputId} className="mt-6 block text-sm font-medium text-ink">
          Пароль
        </label>
        <input
          id={inputId}
          type="password"
          autoFocus
          autoComplete="current-password"
          className={`${fieldClass} mt-1.5`}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
        />
        {error ? <p className="mt-2 text-xs font-medium text-ink">Неверный пароль.</p> : null}
        <Button variant="accent" type="submit" className="mt-5 w-full">
          Войти
        </Button>
      </form>
    </div>
  );
}
