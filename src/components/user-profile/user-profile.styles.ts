import { css } from 'lit';

export const userProfileStyles = css`
  /* ── Host ───────────────────────────────────────────────── */
  :host {
    display: inline-block;
    position: relative;
    font-family: var(
      --ds-font-family,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      system-ui,
      sans-serif
    );
  }

  /* ── Avatar button ──────────────────────────────────────── */
  .avatar {
    width: var(--ds-avatar-size, 40px);
    height: var(--ds-avatar-size, 40px);
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.85);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0;
    overflow: hidden;
    box-shadow:
      0 0 0 2px rgba(0, 0, 0, 0.06),
      0 2px 6px rgba(0, 0, 0, 0.14);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .avatar:hover {
    transform: scale(1.06);
    box-shadow:
      0 0 0 2px rgba(0, 0, 0, 0.06),
      0 4px 14px rgba(0, 0, 0, 0.22);
  }

  .avatar:focus-visible {
    outline: 3px solid var(--ds-focus-color, #6366f1);
    outline-offset: 3px;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .initials {
    color: #fff;
    font-weight: 700;
    font-size: calc(var(--ds-avatar-size, 40px) * 0.36);
    letter-spacing: 0.02em;
    user-select: none;
    pointer-events: none;
  }

  /* ── Size variants ──────────────────────────────────────── */
  .avatar--sm {
    --ds-avatar-size: 32px;
  }
  .avatar--md {
    --ds-avatar-size: 40px;
  }
  .avatar--lg {
    --ds-avatar-size: 52px;
  }

  /* ── Status dot ─────────────────────────────────────────── */
  .status-dot {
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #fff;
    pointer-events: none;
  }

  .status-dot--active {
    background: #10b981;
  }
  .status-dot--inactive {
    background: #9ca3af;
  }

  /* ── Popover container ──────────────────────────────────── */
  .popover {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    width: 292px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.06),
      0 4px 8px rgba(0, 0, 0, 0.08),
      0 12px 28px rgba(0, 0, 0, 0.14);
    z-index: 9999;
    overflow: hidden;
    animation: ds-fade-slide-in 0.14s ease;
  }

  @keyframes ds-fade-slide-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* ── Popover header ─────────────────────────────────────── */
  .popover__header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: linear-gradient(135deg, #f0f4ff 0%, #e8edff 100%);
    border-bottom: 1px solid #e5e7eb;
    position: relative;
  }

  .popover__avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .popover__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .popover__identity {
    flex: 1;
    min-width: 0;
  }

  .popover__name {
    font-size: 15px;
    font-weight: 700;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }

  .popover__job-title {
    font-size: 12px;
    color: #6b7280;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .popover__status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 6px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .popover__status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status--active .popover__status-dot {
    background: #10b981;
  }
  .status--active {
    color: #059669;
  }
  .status--inactive .popover__status-dot {
    background: #9ca3af;
  }
  .status--inactive {
    color: #6b7280;
  }

  .popover__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    border: none;
    background: rgba(0, 0, 0, 0.06);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 16px;
    line-height: 1;
    transition: background 0.1s ease;
    padding: 0;
  }

  .popover__close:hover {
    background: rgba(0, 0, 0, 0.12);
    color: #111827;
  }

  .popover__close:focus-visible {
    outline: 2px solid var(--ds-focus-color, #6366f1);
    outline-offset: 1px;
  }

  /* ── Popover body / attributes ──────────────────────────── */
  .popover__body {
    padding: 8px 0 12px;
  }

  .attr {
    display: grid;
    grid-template-columns: 88px 1fr;
    gap: 0 8px;
    padding: 5px 16px;
    align-items: start;
  }

  .attr:hover {
    background: #f9fafb;
  }

  .attr__label {
    font-size: 10.5px;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding-top: 1px;
    line-height: 1.5;
  }

  .attr__value {
    font-size: 13px;
    color: #374151;
    line-height: 1.5;
    word-break: break-word;
  }

  .attr__value--email {
    color: #6366f1;
  }

  .attr__value--phone {
    font-variant-numeric: tabular-nums;
  }

  /* ── Divider ────────────────────────────────────────────── */
  .popover__divider {
    height: 1px;
    background: #f3f4f6;
    margin: 6px 0;
  }

  /* ── Group tags ─────────────────────────────────────────── */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding-top: 2px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 9px;
    border-radius: 20px;
    background: #eef2ff;
    color: #6366f1;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.6;
  }

  /* ── Footer ─────────────────────────────────────────────── */
  .popover__footer {
    padding: 8px 16px 4px;
    border-top: 1px solid #f3f4f6;
  }

  .popover__last-login {
    font-size: 10.5px;
    color: #9ca3af;
  }
`;
