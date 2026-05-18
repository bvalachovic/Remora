---
name: create-component
description: Scaffold a new ds- prefixed Lit web component following Remora's conventions, including the component file, styles file, index re-export, src/index.ts export, package.json sub-path, and a Storybook story.
metadata:
  slash-command: enabled
---

# Create a new Remora component

When asked to create a new component, follow every step below in order.

## Naming

- Tag name: `ds-<name>` (kebab-case, `ds-` prefix)
- Class name: PascalCase equivalent (e.g. `ds-button` → `Button`)
- Folder: `src/components/<name>/`

## Files to create

### 1. `src/components/<name>/<name>.component.ts`

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { <Name>Styles } from './<name>.styles.js';

@customElement('ds-<name>')
export class <Name> extends LitElement {
  static styles = <Name>Styles;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-<name>': <Name>;
  }
}
```

### 2. `src/components/<name>/<name>.styles.ts`

```typescript
import { css } from 'lit';

export const <Name>Styles = css`
  :host {
    display: inline-block;
    font-family: var(--ds-font-family, system-ui, sans-serif);
  }

  :host:focus-visible {
    outline: 3px solid var(--ds-focus-color, #6366f1);
    outline-offset: 3px;
  }
`;
```

### 3. `src/components/<name>/index.ts`

```typescript
export { <Name> } from './<name>.component.js';
```

## Files to update

### 4. `src/index.ts` — add the component and any public types

```typescript
export { <Name> } from './components/<name>/index.js';
```

### 5. `package.json` — add a sub-path export

```json
"./< name>": {
  "import": "./dist/components/<name>/<name>.component.js",
  "types": "./dist/types/components/<name>/<name>.component.d.ts"
}
```

### 6. `stories/<Name>.stories.ts` — create Storybook stories

Cover at minimum:
- Default / happy-path render
- Each significant prop variant
- Edge cases (empty slot, disabled state, etc.)

Use the Storybook web-components meta format:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/<name>/<name>.component.js';

const meta: Meta = {
  title: 'Components/<Name>',
  tags: ['autodocs'],
  render: (args) => html`<ds-<name>></ds-<name>>`,
};
export default meta;
type Story = StoryObj;

export const Default: Story = { name: 'Default' };
```

## Checklist before finishing

- [ ] `@customElement` tag starts with `ds-`
- [ ] `declare global { HTMLElementTagNameMap }` is present
- [ ] Styles are in a separate `*.styles.ts` file
- [ ] CSS custom properties use `--ds-` prefix
- [ ] Focus style uses `var(--ds-focus-color, #6366f1)`
- [ ] `src/index.ts` updated
- [ ] `package.json` sub-path export added
- [ ] Story covers default + edge cases
- [ ] `npm run type-check` passes
