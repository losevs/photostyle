# Alice Brandbook — portable skill

Отчуждаемый навык брендбука Алисы в формате [Agent Skills](https://agentskills.io/specification). Работает сам по себе: vault, Figma и соседние пайплайны не нужны.

Версия пакета: **1.2** · сборка из Alice Creative Intelligence OS.

## Что внутри

```
brandbook-alice/
├── SKILL.md                 # манифест + инструкции агенту
├── README.md                # этот файл
├── agents/openai.yaml       # метаданные для OpenAI / Codex UI
├── references/              # токены, композиция, голос, форматы, кейсы
└── assets/
    ├── logo-*.svg, palette.svg, figma-*.png
    └── fonts/               # YS Text Compact + YS Compressed
```

Размер zip ≈ 1,8 MB (лимит OpenAI Skills — 50 MB).

## Куда подключать

### ChatGPT / OpenAI Skills API

1. Возьми zip из `03_exports/brandbook/brandbook-alice-YYYY-MM-DD.zip` (или этот каталог, упакованный с корневой папкой `brandbook-alice/`).
2. Залей через Skills API:

```bash
curl -X POST 'https://api.openai.com/v1/skills' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F 'files=@./brandbook-alice-YYYY-MM-DD.zip;type=application/zip'
```

3. В среде с shell tool прикрепи skill по возвращённому `skill_id`.

**Custom GPT (без Skills API):** распакуй zip и загрузи содержимое папки (`SKILL.md` + `references/` + `assets/`) в Knowledge GPT. В Instructions коротко: «Следуй SKILL.md пакета brandbook-alice; детали бери из references/ по запросу».

### Claude.ai

Settings → Features → upload custom skill → загрузи zip целиком. Нужен план с code execution.

### Claude Code

```bash
unzip brandbook-alice-YYYY-MM-DD.zip -d ~/.claude/skills/
# → ~/.claude/skills/brandbook-alice/SKILL.md
```

Или положи папку в `.claude/skills/` проекта.

### Cursor / Codex

```bash
unzip brandbook-alice-YYYY-MM-DD.zip -d .agents/skills/
# → .agents/skills/brandbook-alice/
```

В Cursor также работает `.cursor/skills/brandbook-alice/` (можно симлинк на `.agents/skills/...`).

### Любой другой агент

Распакуй zip и укажи агенту путь к `brandbook-alice/SKILL.md`. Формат — открытый Agent Skills: `name` + `description` во frontmatter, тело — инструкции, `references/` и `assets/` подгружаются по мере нужды.

## Как пользоваться после подключения

Примеры триггеров:

- «Собери баннер 1080×1080 про Поболтать в стиле Алисы»
- «Проверь этот слайд на бренд»
- «Напиши CRM-письмо по брендбуку Алисы»
- «Разложи outdoor 6×3 по токенам»

Агент обязан назвать формат, профиль (Neutral / Expressive), регистр (ты / вы) и свериться с `references/` — не выдумывать hex и радиусы.

## Шрифты

В `assets/fonts/`:

| Файл | Роль |
|---|---|
| `YSTextCompact-VF.woff2` / `…-VF.ttf` | Основной набор, variable, `wdth` = 50 |
| `YSCompressed-Bold.otf` | Крупные заголовки `display-lg` / `display-md` + `ss01` |
| `YSCompressed-Medium.ttf` | Рекламные лайны |

Агент обязан подключать эти файлы, а не подменять Arial «по умолчанию».

## Ограничения

- Пакет **proprietary** — для внутренней работы Алисы / Яндекса, не для публичной публикации. Шрифты не выкладывать наружу.
- Живой Figma опционален. Без него канон = этот пакет.
- Токены не править в полученной копии. Обновления — новая сборка от Alice PMM.

## Обновление

Maintainers в репозитории ACIO:

```bash
python3 06_scripts/brandbook/build_brandbook.py
```

Новый zip появляется в `03_exports/brandbook/`. Получателям — заменить старую папку/skill целиком.
