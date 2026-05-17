export interface UserProfileData {
  firstName: string;
  lastName: string;
  email?: string;
  /** OIDC `picture` claim or any publicly accessible image URL. */
  pictureUrl?: string;
  title?: string;
  department?: string;
  organization?: string;
  manager?: string;
  phone?: string;
  groups?: string[];
  /** From Django `user.is_active` or equivalent. Omit if unknown. */
  isActive?: boolean;
  /** ISO 8601 timestamp. From your IdP's audit log or Django session. */
  lastLogin?: string;
}
