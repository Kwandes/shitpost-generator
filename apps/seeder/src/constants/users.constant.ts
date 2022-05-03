import { IUser, Role } from '@shitpost-generator/interfaces';

export const users: IUser[] = [
  {
    userId: '17631e48-c5de-432f-826e-a1461a2928ed',
    email: 'user@example.com',
    password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K',
    role: Role.user,
  },
  {
    userId: '238777fb-67ff-483f-96a9-24cd993ffb88',
    email: 'admin@example.com',
    password: '$2b$10$h1PegDvn0XBbESh5b5dJOOZHj.4Ru6s/CPUzlSOm9hv5V6UY3q5GC',
    role: Role.admin,
  },
];
