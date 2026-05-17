export interface OktaUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  department?: string;
  title?: string;
  manager?: string;
  mobilePhone?: string;
  organization?: string;
  profileImageUrl?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  countryCode?: string;
}

export type OktaUserStatus =
  | 'ACTIVE'
  | 'DEPROVISIONED'
  | 'LOCKED_OUT'
  | 'PASSWORD_EXPIRED'
  | 'PROVISIONED'
  | 'RECOVERY'
  | 'STAGED'
  | 'SUSPENDED';

export interface OktaUser {
  id: string;
  status: OktaUserStatus;
  created: string;
  activated: string;
  lastLogin: string;
  lastUpdated: string;
  profile: OktaUserProfile;
  groups?: string[];
}

export interface OktaServiceConfig {
  /** Base URL of your Okta org, e.g. https://yourorg.okta.com */
  orgUrl: string;
  /** API token (server-side only) or OIDC access token */
  token: string;
}
