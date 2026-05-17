import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { OktaUser, OktaUserStatus } from '../../mocks/okta.types.js';
import { userProfileStyles } from './user-profile.styles.js';

type AvatarSize = 'sm' | 'md' | 'lg';

/** Deterministic color for a user's avatar based on their name. */
function avatarColor(name: string): string {
  const palette = [
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // emerald
    '#3b82f6', // blue
    '#ef4444', // red
    '#14b8a6', // teal
  ];
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function isActiveStatus(status: OktaUserStatus): boolean {
  return status === 'ACTIVE';
}

const STATUS_LABELS: Record<OktaUserStatus, string> = {
  ACTIVE: 'Active',
  DEPROVISIONED: 'Deprovisioned',
  LOCKED_OUT: 'Locked Out',
  PASSWORD_EXPIRED: 'Password Expired',
  PROVISIONED: 'Provisioned',
  RECOVERY: 'Recovery',
  STAGED: 'Staged',
  SUSPENDED: 'Suspended',
};

/**
 * `<ds-user-profile>` — avatar button that opens an identity popover.
 *
 * @fires ds-profile-open  - When the popover opens
 * @fires ds-profile-close - When the popover closes
 *
 * @csspart avatar  - The avatar button element
 * @csspart popover - The popover card element
 *
 * @cssprop --ds-font-family - Override component font family
 * @cssprop --ds-focus-color - Focus ring color (default: #6366f1)
 */
@customElement('ds-user-profile')
export class UserProfile extends LitElement {
  static styles = userProfileStyles;

  /** Okta user object. Provide this from `getOktaUser()` or a mock. */
  @property({ type: Object }) user: OktaUser | undefined = undefined;

  /** Avatar size: sm (32px) | md (40px, default) | lg (52px) */
  @property({ type: String, attribute: 'avatar-size' })
  avatarSize: AvatarSize = 'md';

  @state() private _open = false;

  private _handleDocumentClick = (e: MouseEvent) => {
    if (this._open && !this.contains(e.target as Node)) {
      this._closePopover();
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this._open && e.key === 'Escape') {
      this._closePopover();
      this.shadowRoot?.querySelector<HTMLButtonElement>('.avatar')?.focus();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  private _togglePopover(e: MouseEvent) {
    e.stopPropagation();
    this._open ? this._closePopover() : this._openPopover();
  }

  private _openPopover() {
    this._open = true;
    this.dispatchEvent(new CustomEvent('ds-profile-open', { bubbles: true, composed: true }));
  }

  private _closePopover() {
    this._open = false;
    this.dispatchEvent(new CustomEvent('ds-profile-close', { bubbles: true, composed: true }));
  }

  private get _initials(): string {
    if (!this.user) return '?';
    const { firstName, lastName } = this.user.profile;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  private get _color(): string {
    if (!this.user) return '#6366f1';
    return avatarColor(this.user.profile.firstName + this.user.profile.lastName);
  }

  private _formatDate(iso?: string): string {
    if (!iso) return '—';
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  }

  private _renderAvatarImage() {
    const src = this.user?.profile.profileImageUrl;
    return src
      ? html`<img src=${src} alt="" />`
      : html`<span class="initials">${this._initials}</span>`;
  }

  private _renderAttr(label: string, value: string | undefined, modifier = '') {
    if (!value) return nothing;
    return html`
      <div class="attr">
        <span class="attr__label">${label}</span>
        <span class="attr__value ${modifier ? `attr__value--${modifier}` : ''}">${value}</span>
      </div>
    `;
  }

  private _renderGroups() {
    const groups = this.user?.groups;
    if (!groups?.length) return nothing;
    return html`
      <div class="attr">
        <span class="attr__label">Groups</span>
        <div class="tags">
          ${groups.map((g) => html`<span class="tag">${g}</span>`)}
        </div>
      </div>
    `;
  }

  private _renderPopover() {
    if (!this._open || !this.user) return nothing;
    const { profile, status, lastLogin } = this.user;
    const fullName = `${profile.firstName} ${profile.lastName}`;

    return html`
      <div
        class="popover"
        part="popover"
        role="dialog"
        aria-label="Profile: ${fullName}"
        aria-modal="false"
      >
        <div class="popover__header">
          <div class="popover__avatar" style="background-color: ${this._color}">
            ${profile.profileImageUrl
              ? html`<img src=${profile.profileImageUrl} alt="" />`
              : this._initials}
          </div>

          <div class="popover__identity">
            <div class="popover__name">${fullName}</div>
            ${profile.title
              ? html`<div class="popover__job-title">${profile.title}</div>`
              : nothing}
            <div class="popover__status status--${status}">
              <span class="popover__status-dot"></span>
              ${STATUS_LABELS[status] ?? status}
            </div>
          </div>

          <button
            class="popover__close"
            @click=${() => this._closePopover()}
            aria-label="Close profile"
          >
            ✕
          </button>
        </div>

        <div class="popover__body">
          ${this._renderAttr('Email', profile.email, 'email')}
          ${this._renderAttr('Department', profile.department)}
          ${this._renderAttr('Organization', profile.organization)}
          ${this._renderAttr('Manager', profile.manager)}
          ${this._renderAttr('Phone', profile.mobilePhone, 'phone')}
          <div class="popover__divider"></div>
          ${this._renderGroups()}
        </div>

        <div class="popover__footer">
          <span class="popover__last-login">
            Last login: ${this._formatDate(lastLogin)}
          </span>
        </div>
      </div>
    `;
  }

  render() {
    const label = this.user
      ? `${this.user.profile.firstName} ${this.user.profile.lastName} — profile`
      : 'User profile';

    return html`
      <button
        class="avatar avatar--${this.avatarSize}"
        part="avatar"
        style="background-color: ${this._color}"
        @click=${this._togglePopover}
        aria-expanded=${this._open}
        aria-haspopup="dialog"
        aria-label=${label}
      >
        ${this._renderAvatarImage()}
        <span
          class="status-dot status-dot--${this.user && isActiveStatus(this.user.status)
            ? 'active'
            : 'inactive'}"
        ></span>
      </button>
      ${this._renderPopover()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-user-profile': UserProfile;
  }
}
