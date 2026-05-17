import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Side-effect import registers <ds-user-profile>
import '../src/components/user-profile/user-profile.component.js';
import type { OktaUser } from '../src/mocks/okta.types.js';
import { MOCK_OKTA_USERS } from '../src/mocks/okta-service.mock.js';

// ── Shared mock users ──────────────────────────────────────────────────────
const JANE = MOCK_OKTA_USERS['jane.smith'] as OktaUser;
const JOHN = MOCK_OKTA_USERS['john.doe'] as OktaUser;
const MARIA = MOCK_OKTA_USERS['maria.garcia'] as OktaUser;
const SUSPENDED = MOCK_OKTA_USERS['alex.suspended'] as OktaUser;

// ── Shared a11y config ─────────────────────────────────────────────────────
// Applied globally in preview.ts (WCAG 2.1 AA). Story-level overrides below
// document intentional exceptions with clear justification.
const A11Y_WCAG_AA = {
  config: {
    rules: [
      { id: 'color-contrast', enabled: true },
      { id: 'button-name', enabled: true },
    ],
  },
};

// ── Meta ───────────────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Components/UserProfile',
  tags: ['autodocs'],
  render: (args) => html`
    <ds-user-profile
      .user=${args.user}
      avatar-size=${args.avatarSize}
    ></ds-user-profile>
  `,
  argTypes: {
    user: {
      control: 'object',
      description: 'OktaUser object returned from `getOktaUser()` or a mock.',
    },
    avatarSize: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the avatar button.',
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: {
    user: JANE,
    avatarSize: 'md',
  },
  parameters: {
    a11y: A11Y_WCAG_AA,
    docs: {
      description: {
        component: `
A Lit web component (\`<ds-user-profile>\`) that displays a user avatar and, on click, reveals an identity popover sourced from Okta user data.

**Accessibility:** Targets WCAG 2.1 Level AA. The avatar is a \`<button>\` with \`aria-label\`, \`aria-expanded\`, and \`aria-haspopup="dialog"\`. The popover has \`role="dialog"\` with an \`aria-label\`. Escape closes the popover and returns focus to the trigger.

**Usage**
\`\`\`html
<script type="module">
  import '@platform/design-system';
</script>
<ds-user-profile id="profile"></ds-user-profile>
<script type="module">
  const el = document.getElementById('profile');
  el.user = await getOktaUser(currentUserId);
</script>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ── Stories ────────────────────────────────────────────────────────────────

/** Default — active engineer with full profile. */
export const Default: Story = {
  name: 'Default (Jane Smith)',
  args: { user: JANE, avatarSize: 'md' },
};

/** Principal engineer — different avatar color from name hash. */
export const PrincipalEngineer: Story = {
  name: 'John Doe — Principal Engineer',
  args: { user: JOHN, avatarSize: 'md' },
};

/** Design lead — demonstrates a different department and color. */
export const DesignLead: Story = {
  name: 'Maria Garcia — Design Lead',
  args: { user: MARIA, avatarSize: 'md' },
};

/**
 * Suspended account — amber status badge.
 * a11y: color-contrast rule is satisfied; amber (#d97706) on the light header
 * gradient meets the 4.5:1 ratio for normal-weight text at 11px bold.
 */
export const SuspendedUser: Story = {
  name: 'Suspended Account',
  args: { user: SUSPENDED, avatarSize: 'md' },
  parameters: {
    a11y: A11Y_WCAG_AA,
    docs: {
      description: {
        story: 'A suspended Okta account renders with an amber status indicator in the popover header.',
      },
    },
  },
};

/** Small avatar — 32px, suits nav bars and dense table rows. */
export const SizeSmall: Story = {
  name: 'Size — Small (32px)',
  args: { user: JANE, avatarSize: 'sm' },
};

/** Medium (default). */
export const SizeMedium: Story = {
  name: 'Size — Medium (40px)',
  args: { user: JANE, avatarSize: 'md' },
};

/** Large avatar for profile pages or hero areas. */
export const SizeLarge: Story = {
  name: 'Size — Large (52px)',
  args: { user: JANE, avatarSize: 'lg' },
};

/** Profile image overrides initials when `profileImageUrl` is set. */
export const WithProfileImage: Story = {
  name: 'With Profile Image',
  args: {
    user: {
      ...JANE,
      profile: {
        ...JANE.profile,
        profileImageUrl: 'https://i.pravatar.cc/150?img=47',
      },
    },
    avatarSize: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'When `profile.profileImageUrl` is set, the image renders instead of initials. The `<img>` has `alt=""` because the adjacent visible name already describes the user (decorative image pattern).',
      },
    },
  },
};

/** All three sizes side-by-side — visual regression reference. */
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => html`
    <div style="display:flex; align-items:center; gap:16px;">
      <ds-user-profile .user=${JANE} avatar-size="sm"></ds-user-profile>
      <ds-user-profile .user=${JOHN} avatar-size="md"></ds-user-profile>
      <ds-user-profile .user=${MARIA} avatar-size="lg"></ds-user-profile>
    </div>
  `,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'sm / md / lg rendered side-by-side for visual comparison.' },
    },
  },
};

/**
 * No user assigned yet — "?" placeholder.
 * a11y: button-name rule is satisfied by the static aria-label "User profile".
 */
export const NoUser: Story = {
  name: 'No User (loading state)',
  args: { user: undefined, avatarSize: 'md' },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          // button-name is satisfied: avatar has aria-label="User profile"
          { id: 'button-name', enabled: true },
        ],
      },
    },
    docs: {
      description: {
        story: 'When `user` has not been set yet, the avatar shows a "?" placeholder. Assign the `user` property once your Okta call resolves.',
      },
    },
  },
};
