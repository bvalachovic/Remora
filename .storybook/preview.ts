import type { Preview } from '@storybook/web-components';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
    docs: {
      description: {
        component: 'Platform Design System components built with Lit.',
      },
    },
    // ── Accessibility ──────────────────────────────────────────────────────
    // @storybook/addon-a11y runs axe-core on every story automatically.
    // The config below targets WCAG 2.1 Level AA — the standard for internal
    // enterprise applications. Violations appear in the Accessibility panel.
    a11y: {
      config: {
        rules: [
          // Enforce WCAG 2.1 AA colour contrast (4.5:1 normal text, 3:1 large)
          { id: 'color-contrast', enabled: true },
          // All images must have meaningful alt text
          { id: 'image-alt', enabled: true },
          // Interactive elements must have accessible names
          { id: 'button-name', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
        ],
      },
      options: {
        runOnly: {
          // wcag2a covers Level A; wcag2aa adds Level AA on top
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'best-practice'],
        },
      },
    },
    // ── Story ordering ─────────────────────────────────────────────────────
    options: {
      storySort: {
        order: ['Introduction', 'Components', ['UserProfile', '*'], '*'],
      },
    },
  },
};

export default preview;
