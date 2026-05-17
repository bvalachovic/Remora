import type { OktaUser } from './okta.types.js';

/** Mirrors the shape of a real Okta /api/v1/users/{id} response. */
const MOCK_USERS: Record<string, OktaUser> = {
  'jane.smith': {
    id: '00u1a2b3c4d5e6f7g8h9',
    status: 'ACTIVE',
    created: '2023-03-01T09:00:00.000Z',
    activated: '2023-03-01T09:05:00.000Z',
    lastLogin: '2026-05-15T14:22:00.000Z',
    lastUpdated: '2026-04-10T11:00:00.000Z',
    profile: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      login: 'jane.smith@company.com',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      organization: 'Platform Team',
      manager: 'Chris Lee',
      mobilePhone: '+1 (555) 012-3456',
    },
    groups: ['Everyone', 'Engineering', 'Platform-Team', 'On-Call'],
  },
  'john.doe': {
    id: '00u9h8g7f6e5d4c3b2a1',
    status: 'ACTIVE',
    created: '2022-07-12T08:00:00.000Z',
    activated: '2022-07-12T08:10:00.000Z',
    lastLogin: '2026-05-16T08:45:00.000Z',
    lastUpdated: '2026-02-28T16:30:00.000Z',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      login: 'john.doe@company.com',
      title: 'Principal Engineer',
      department: 'Engineering',
      organization: 'Core Infrastructure',
      manager: 'Sarah Chen',
      mobilePhone: '+1 (555) 987-6543',
    },
    groups: ['Everyone', 'Engineering', 'Core-Infra', 'Architecture-Guild'],
  },
  'maria.garcia': {
    id: '00um1a2r3i4a5g6a7r8c',
    status: 'ACTIVE',
    created: '2024-01-08T10:00:00.000Z',
    activated: '2024-01-08T10:15:00.000Z',
    lastLogin: '2026-05-14T17:00:00.000Z',
    lastUpdated: '2025-11-01T09:00:00.000Z',
    profile: {
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@company.com',
      login: 'maria.garcia@company.com',
      title: 'UX Design Lead',
      department: 'Product Design',
      organization: 'Design Systems',
      manager: 'Alex Kim',
      mobilePhone: '+1 (555) 246-8100',
    },
    groups: ['Everyone', 'Product-Design', 'Design-Systems', 'Frontend-Guild'],
  },
  'alex.suspended': {
    id: '00uaaaaabbbbccccdddd',
    status: 'SUSPENDED',
    created: '2021-06-01T08:00:00.000Z',
    activated: '2021-06-01T08:00:00.000Z',
    lastLogin: '2025-12-01T10:00:00.000Z',
    lastUpdated: '2026-01-15T09:00:00.000Z',
    profile: {
      firstName: 'Alex',
      lastName: 'Suspended',
      email: 'alex.suspended@company.com',
      login: 'alex.suspended@company.com',
      title: 'Former Contractor',
      department: 'Engineering',
      organization: 'External',
    },
    groups: ['Everyone'],
  },
};

/** Simulates a GET /api/v1/users/{userId} call with network latency. */
export async function getOktaUser(userId: string): Promise<OktaUser> {
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));
  const user = MOCK_USERS[userId];
  if (!user) {
    throw new Error(`[Okta Mock] User "${userId}" not found`);
  }
  return structuredClone(user);
}

/** All mock users keyed by login prefix, for Storybook controls. */
export const MOCK_OKTA_USERS = MOCK_USERS;

export type MockUserId = keyof typeof MOCK_USERS;
