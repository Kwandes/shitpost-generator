import { Gender } from '@shitpost-generator/interfaces';
import { nameTags } from './name-tags.constant copy';
import { users } from './users.constant';

export const names = [
  {
    name: 'Jasmine Gallagher',
    gender: Gender.feminine,
    isEnabled: true,
    tags: [nameTags.ttrpg],
  },
  {
    name: 'Megatron Owen (Meg)',
    gender: Gender.feminine,
    isEnabled: true,
    tags: [nameTags.random],
    createdBy: users[1],
  },
  {
    name: 'Nadia Bowen',
    gender: Gender.feminine,
    isEnabled: true,
    tags: [nameTags.ttrpg],
    createdBy: users[0],
  },
  {
    name: 'Lee Martinez',
    gender: Gender.androgynous,
    isEnabled: true,
    tags: [nameTags.harryPotter],
  },
  {
    name: 'Ader Titsoff',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
    createdBy: users[0],
  },
  {
    name: 'Sir Cumference',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
    createdBy: users[0],
  },
  {
    name: 'Harry Azcrac',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed, nameTags.harryPotter],
  },
  {
    name: 'Kenny Dewitt',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
    createdBy: users[0],
  },
  {
    name: 'Lou Sirr',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
  },
  {
    name: 'Lou Sirr',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
  },
  {
    name: 'Lou Briccant',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
    createdBy: users[1],
  },
  {
    name: 'Mary Juana',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
  },
  {
    name: 'Nick O’ Teen',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
    createdBy: users[1],
  },
  {
    name: 'Sal Ami',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed, nameTags.food],
    createdBy: users[1],
  },
  {
    name: 'Sheeza Freak',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.cursed],
  },
  {
    name: 'Bill Board',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.random],
  },
  {
    name: 'Bud Light',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.random, nameTags.food],
  },
  {
    name: 'Cara Van',
    gender: Gender.meme,
    isEnabled: true,
    tags: [nameTags.random],
  },
  {
    name: 'Chris Cross',
    gender: Gender.masculine,
    isEnabled: true,
    tags: [nameTags.random],
  },
];
