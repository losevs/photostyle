---
name: brandbook-alice
description: Produce any Alice-branded artifact — presentation slide, OOH board, performance banner, social post, email, print piece, video frame, dashboard or landing screen — using the canonical Alice palette, typography, composition grammar and voice. Use when making or reviewing Alice brand work, checking on-brand compliance, or assembling a layout from Alice tokens.
license: proprietary
compatibility: Agent Skills hosts (ChatGPT/OpenAI Skills, Claude, Codex, Cursor). Self-contained — no network or vault required at runtime. Figma access optional.
metadata:
  author: Alice PMM
  version: "1.2"
  generated_from: 00_core_vault
  portable: "true"
---

# Alice Brandbook

The umbrella brand authority for Alice across every format. This package is self-contained: everything needed to produce or review on-brand work lives in `references/` and `assets/`. No vault, sibling skills or live Figma session is required.

## Authority ladder

When two sources disagree, the higher one wins.

1. **An approved artifact supplied by the user.** Keep its copy, local typography and manual corrections. Report a conflict; never silently normalise someone else's approved work.
2. **The live Figma canon — only if you can open it.** Two files, connected 2026-07-27. `W2sAt3o3pqhU9p07YAoC2S` — «🌴 Web DS・Алиса AI» — owns tokens, components, motion and web layout. `9uww9WubHgu5VSCgW8r4ol` — «Гайд Алиса 2026» — owns the logo, identity, verbal rules and CRM formats. A fresh node beats the stored snapshot in `references/source-guide.md`. If Figma is unreachable, skip this tier.
3. **This package.** Working brand authority for standalone use. `references/design-tokens.md` holds values; `assets/` holds logo masters and visual evidence. Prefer the package over memory or generic design taste.
4. **Your own inference.** Only where the sources above are silent, and only stated out loud.

Every substituted font, derived proportion or invented value is a deliberate adaptation and must be named as such in your response.

## Confirmed, asserted, operational

**Confirmed** values are backed by an exported brand asset, a font binary, or a dated Figma node (see `references/source-guide.md`). Covers `primary #302B31`, `accent-alice #7A55FF`, `accent-blue #5286FF`, `surface #FFFFFF` and the page ground `#DBDFE7`, plus button geometry, motion parameters and the type scale as the design system states it. Do not round them, do not swap them for something similar.

**Asserted** values are stated by the profiles with nothing to corroborate them: `border`, `error`, `success`, the shadow group and the spacing scale. Use them as the working default — internally consistent and already shipping — but never cite them as settled fact.

**Refuted / deliberate overrides.** The radius formula `(height / 2) − 1px` is wrong — radii are scale tokens (24 for M 52px, 28 for L 62px); profiles were migrated 2026-07-29. The page ground is `#DBDFE7`, not `#DDE5EE`. Figma text `secondary` is midnight@48%, but the system's 48% and 24% tiers fail WCAG AA, so profiles keep opaque graphite `#656B77` as the AA text layer and expose alpha as `ds-type-*` for non-text only. `graphite` exists in Figma `base-colors`; it is not the type-and-icons secondary role. And `tertiary` means the purple here but the 24% text tier in Figma — write `accent-alice` when you mean the brand colour.

**Operational** values fill formats the profiles never described: print, out-of-home, decks, social and video. Adjust an operational range for a specific format when you say you are doing it.

One trap: a CSS hex dump that looks like independent corroboration may be generated from the same profile. Prefer `references/design-tokens.md` and the assets in this package.

## Start a task

1. **Name the format and the surface.** A slide, a 6×3 board and a 240×400 banner are different problems. Check `references/format-recipes.md` before choosing anything.
2. **Name the one outcome.** One result, one explanation, one proof or action. If the brief carries three messages, say so and ask which one wins.
3. **Pick the profile.** Alice Neutral for calm, dense, service, B2B and internal work. Alice Expressive for launches, devices, agents and brand campaigns. Never mix them inside one artifact.
4. **Pick the register.** Marketing, CRM and campaign copy use «ты». Product interfaces, unidentified-age AI replies and B2B use «вы». Never mix them inside one text.
5. **Pick a layout family** from `references/brand-system.md`. Two or three composition devices, not the whole vocabulary.
6. **Check the contrast pair** before you commit a colour. Three plausible-looking pairs fail AA — matrix is in `references/design-tokens.md`.

## Assemble the composition

Build in this order. Decor first, content later is the most common cause of rework.

1. **Field.** One dominant surface: `neutral`, `surface` or `primary`.
2. **Message.** Headline, explanation, caption, legal line. It must work with everything else removed.
3. **Proof.** One kind only: product UI, a dialogue line, a photograph, a number or a quote.
4. **Accent.** Exactly one action in `accent-alice`. Up to 10% of the area in Neutral, 15% in Expressive.
5. **Signature.** Logo, legal line, source, date. Stable, never overlapping media or accent.

## Brand invariants

These hold in every format, including ones this package does not list.

- **Palette is exact.** Flat colour by default. A gradient is an exception, not a device: the web design system uses exactly one, on the closing CTA block. So use one per layout at most, always on the purple, never under text smaller than a heading. Radial glow, glowing orb and neon grid remain refusals.
- **Type is YS Text Compact** with the width axis pinned at `50` and kerning on. YS Compressed is the display face for the two largest roles, not an opt-in flourish; set it with `ss01`, lowercase, and leading at roughly 90% of the size — both the web system and the ad guide agree a condensed face compresses vertically when it gets big. Never synthesise weight or stretch a face horizontally. Font files ship in `assets/fonts/` — use them. Only if the host cannot load local fonts, substitute the closest condensed sans and name the substitution.
- **Size comes from the frame's area, not its width.** Format unit `u = √(width × height) / 100`. A headline runs about `9.8u`, the logo `7.7u`, the legal line `2.2u`, the frame margin `3.5u`, the gap inside a text block `3.7u`, the gap before the CTA `7.4u`. Roles the guide never templated hang off the headline instead: subline `0.42` of it, bubble `0.45`, CTA label `0.42` with a capsule `3.25` times its own size. Four formats carry the guide's own numbers and use them directly — `1920×460` at 95.8, `672×1152` at 78.8, `448×576` at 52.6, `192×544` at 31.2. These are starting sizes: fit drives them down, nothing drives them up, and a deviation is named with its reason. Never scale by a single side — on `672×1152` the short-side multiplier turns a 79px headline into 20px. Reasoning lives in `references/brand-system.md`.
- **Headlines are sentence case.** Uppercase exists only in the `label-caps` role.
- **Radius is a scale token, not a formula.** The system uses 24 for a 52px button and 28 for a 62px one; the old `(height / 2) − 1px` rule is arithmetically self-consistent and wrong. Vertical padding is deliberately asymmetric — two more pixels at the bottom, to optically centre the face. No `9999px`, no `50%`, no local values.
- **Shadow is multi-layer and tinted with `primary`.** Never pure black, never a single hard drop.
- **The logo is never smaller than the type it sits with.** Its lowercase — 0.652 of the logoblock height — is at least the lowercase height of the largest text on the layout. Clearspace is one okniks on every side, measured to neighbouring elements rather than to the canvas edge. The logo's own size comes from the format — `7.7u` — while that lowercase rule works underneath it as a floor. Use only the masters in `assets/logo-color.svg` and `assets/logo-white.svg` — never retype, recolour or redraw.
- **Spacing is measured to the edge of the letters, not to the baseline.** Gaps grow as the role changes: smallest inside a block, larger between blocks, largest before the CTA — at least twice the internal gap. A button pressed against its explanation reads as a caption to it.
- **The bubble is an identity element, not decoration.** Any request a person would say to Alice fits inside one. White fill, `primary` text, pushed right like a chat message. Always YS Text Compact, and the text opens on a lower-case letter — it is a spoken line, not a sentence. Left-aligned only, never stretched to fit long text: wrap the line instead.
- **The bubble's right-hand corners carry meaning.** Top-right is always shortened into a tail. In a stack the bottom-right shortens too, so the group reads as one utterance; only the last bubble keeps a fully round bottom-right and closes the group. Stack gaps stay tight — around 0.15 of the bubble height. Padding comes from the live component, roughly 1.16 of the type size horizontally and 1.3 vertically. See `references/graphic-language.md`.
- **One action per artifact.** Two purple elements mean the action stopped reading.
- **Show the result, not the technology.** A first screen naming a model, an LLM or a neural network is a rejection.
- **Alice is the only character.** Devices are not personified. A sensor is not a helper and a speaker has no personality.
- **Typographic detail:** «ёлочки», the letter ё, infinitive verbs in CTAs, no exclamation mark in a headline.

## Degrade under pressure

When the format shrinks, drop from the bottom of this list first.

1. Secondary proof and extra cards.
2. The second accent.
3. Eyebrow and captions.
4. Image or interface.
5. Explanation.

Palette, legible Alice typography and the brand signature are the last to go. Recognition at small size comes from colour and type, never from a shrunken copy of the large layout.

## References

Load on demand, not all at once.

| File | Load it when |
|---|---|
| `references/design-tokens.md` | You need an exact value: colour, size, radius, shadow, duration, contrast |
| `references/brand-system.md` | You are deciding what goes where: layer model, hierarchy, layout families |
| `references/graphic-language.md` | Logo, icons, photography, illustration, data graphics, motion, bubble |
| `references/format-recipes.md` | You need the constraints of a specific medium |
| `references/verbal-system.md` | You are writing or reviewing copy |
| `references/case-launch.md` | You are planning a multi-carrier campaign, or you want real before/after copy calibration |
| `references/case-formats.md` | You want to see a slide, a board and a banner assembled from tokens alone |
| `references/source-guide.md` | You need provenance, or something contradicts something else |

`assets/` holds visual evidence and production fonts. `palette.svg` and the two logo masters are the production sources. `assets/fonts/` carries YS Text Compact (variable) and YS Compressed (Bold + Medium). The `figma-*.png` files are renders of the canon itself, dated 2026-07-28. Look at them when a written rule is ambiguous. Production values come from the tokens, never measured off an image, and a render never goes into a deliverable unless the user asked for the reference itself.

## Boundaries

- **Self-contained.** Outside the Alice vault this package is the only brand source. Do not invent parallel palettes, type scales or composition rules.
- **Do not invent tokens.** If a value is missing, say so and propose an operational adaptation — never silently invent a hex, radius or type size.
- **Web landings** still obey these invariants. Full landing-production pipelines are not bundled here; apply the brand rules, do not invent a parallel system.
- **Token ownership.** Consumers treat the package as read-only canon. Maintainers change values in the Alice vault and rebuild — see below.

## Rebuild (maintainers only)

The package is a build artifact of the Alice Creative Intelligence OS vault. Edit the vault note named under `Source` in each reference, then run:

```bash
python3 06_scripts/brandbook/build_brandbook.py
```

This regenerates the contrast matrix, reassembles every reference, redraws the palette sheet and writes a portable archive to `03_exports/brandbook/`. Recipients of the zip do not rebuild — they use the package as received.

## Acceptance checklist

Run before handing anything over.

- [ ] Format and surface named; constraints taken from `format-recipes.md`, not from memory.
- [ ] One outcome in the headline, stated as a result rather than a topic.
- [ ] Explanation adds a second fact instead of restating the headline.
- [ ] One kind of proof, and it actually proves the promise.
- [ ] Exactly one action, in `accent-alice`, within the area budget.
- [ ] Every text pair checked against the contrast matrix; none of the three known traps used.
- [ ] Profile not mixed. Register not mixed. Compressed weights not mixed.
- [ ] Sentence case; uppercase only in `label-caps`.
- [ ] Radius, spacing and shadow taken from named tokens.
- [ ] Type and element sizes derived from the format unit, not eyeballed; every deviation named with its reason.
- [ ] Logo from an approved master in `assets/`, not retyped, recoloured or redrawn.
- [ ] No generic AI imagery, no glow, no personified device.
- [ ] Copy passes the verbal system: no forbidden words, no AI structural markers, «ё» and «ёлочки» in place.
- [ ] Every inferred or substituted value called out as an adaptation.
