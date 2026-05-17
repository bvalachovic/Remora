import type { UserProfile } from '../types/user-profile.types.js';

const MOCK_USERS: Record<string, UserProfile> = {
  'jane.smith': {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    organization: 'Platform Team',
    manager: 'Chris Lee',
    phone: '+1 (555) 012-3456',
    groups: ['Everyone', 'Engineering', 'Platform-Team', 'On-Call'],
    isActive: true,
    lastLogin: '2026-05-15T14:22:00.000Z',
  },
  'john.doe': {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    title: 'Principal Engineer',
    department: 'Engineering',
    organization: 'Core Infrastructure',
    manager: 'Sarah Chen',
    phone: '+1 (555) 987-6543',
    groups: ['Everyone', 'Engineering', 'Core-Infra', 'Architecture-Guild'],
    isActive: true,
    lastLogin: '2026-05-16T08:45:00.000Z',
  },
  'maria.garcia': {
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@company.com',
    title: 'UX Design Lead',
    department: 'Product Design',
    organization: 'Design Systems',
    manager: 'Alex Kim',
    phone: '+1 (555) 246-8100',
    groups: ['Everyone', 'Product-Design', 'Design-Systems', 'Frontend-Guild'],
    isActive: true,
    lastLogin: '2026-05-14T17:00:00.000Z',
  },
  'alex.inactive': {
    firstName: 'Alex',
    lastName: 'Inactive',
    email: 'alex.inactive@company.com',
    title: 'Former Contractor',
    department: 'Engineering',
    organization: 'External',
    groups: ['Everyone'],
    isActive: false,
    lastLogin: '2025-12-01T10:00:00.000Z',
  },
};

export { MOCK_USERS };
export type MockUserId = keyof typeof MOCK_USERS;
