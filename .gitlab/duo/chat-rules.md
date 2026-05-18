# Remora — GitLab Duo Chat Rules

## Project context

Remora is a platform-team design system built with **Lit 3** web components and **TypeScript**.
Components are framework-agnostic custom elements published as the `remora` npm package.
Documentation and development happen in **Storybook**.
Auth is handled via **OIDC** — the components never read tokens directly.
User data flows in from app stores (Django session or Pinia).

## Stack

- **Lit 3** — `LitElement`, `@customElement`, `@property`, `@state`, `css` tagged templates
- **TypeScript 5** — strict mode, `experimentalDecorators`, `useDefineForClassFields: false`
- **Storybook 8** — stories in `stories/`, web-components-vite builder
- **Vite 5** — ES module build to `dist/`

## Component conventions

- Custom element tags use the `ds-` prefix in kebab-case (e.g. `<ds-user-profile>`)
- TypeScript class names are PascalCase (e.g. `UserProfile`)
- CSS custom properties use the `--ds-` prefix (e.g. `--ds-focus-color`)
- Custom events use the `ds-` prefix in kebab-case (e.g. `ds-profile-open`)
- CSS `::part()` names are kebab-case (e.g. `::part(avatar)`)
- Each component lives in `src/components/<name>/` with three files:
  `<name>.component.ts`, `<name>.styles.ts`, `index.ts`

## Coding style

- No comments unless the WHY is non-obvious
- No error handling for scenarios that cannot happen
- No backwards-compatibility shims for removed code
- Progressive enhancement: render what data is available, omit fields that are absent
- Prefer `nothing` from Lit to conditionally hide template sections
- Use `_renderXxx()` private methods to break up complex `render()` bodies

## Data types

- `UserProfileData` (from `src/types/user-profile.types.ts`) is the canonical user shape
- All user fields are optional except `firstName` and `lastName`
- `isActive?: boolean` — omit entirely if the store doesn't provide account status
- Do not reference `OktaUser`, `OktaUserStatus`, or any Okta-specific types

## Testing and quality

- Run `npm run type-check` before opening an MR
- Storybook stories must cover: default state, each significant prop variant, edge cases
- Target WCAG 2.1 Level AA for all components
