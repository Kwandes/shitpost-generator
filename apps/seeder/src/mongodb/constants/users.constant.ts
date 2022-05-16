import { Role } from '@shitpost-generator/interfaces';

export const users = [
  {
    email: 'user@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.user,
  },
  {
    email: 'admin@example.com',
    password: '$2b$10$h1PegDvn0XBbESh5b5dJOOZHj.4Ru6s/CPUzlSOm9hv5V6UY3q5GC',
    role: Role.admin,
  },
];
