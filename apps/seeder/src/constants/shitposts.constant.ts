import { shitpostTags } from './shitpost-tags.constant';
import { users } from './users.constant';

export const shitposts = [
  {
    text: 'Twinks fuck up me. Cats consume me.',
    sfw: false,
    isEnabled: true,
    tags: [shitpostTags.cursed],
  },
  {
    text: 'Just dont trust monsters.',
    sfw: true,
    isEnabled: true,
    tags: [
      shitpostTags.ttrpg,
      shitpostTags.games,
      shitpostTags.cursed,
      shitpostTags.religion,
      shitpostTags.scifi,
    ],
    createdBy: users[0],
  },
  {
    text: 'God i love eels. God i love eels so much I love eels because they destroy corn.',
    sfw: true,
    isEnabled: true,
    tags: [shitpostTags.cursed, shitpostTags.religion],
    createdBy: users[0],
  },
  {
    text: 'What if you were at the grocery store and then you started to think deeply about heterosexuality',
    sfw: false,
    isEnabled: true,
    tags: [shitpostTags.random],
    createdBy: users[0],
  },
  {
    text: 'I think its wrong to roll across the plains and spread the good word about wolves.',
    sfw: true,
    isEnabled: true,
    tags: [shitpostTags.random, shitpostTags.ttrpg],
    createdBy: users[0],
  },
  {
    text: `I'm not a person. I'm a bunch of legos and I flirt with neurotypicals.`,
    sfw: false,
    isEnabled: true,
    tags: [shitpostTags.random, shitpostTags.ttrpg, shitpostTags.schoolLife],
  },
  {
    text: `I am not a model I just manipulate poop emoji.`,
    sfw: true,
    isEnabled: true,
    tags: [shitpostTags.cursed, shitpostTags.random],
    createdBy: users[1],
  },
  {
    text: `I am not a model I just dream about transtrenders.`,
    sfw: true,
    isEnabled: true,
    tags: [shitpostTags.cursed, shitpostTags.random],
    createdBy: users[1],
  },
  {
    text: `It is not polite to pretend to care about flesh.`,
    sfw: true,
    isEnabled: true,
    tags: [shitpostTags.cursed, shitpostTags.ttrpg, shitpostTags.random],
    createdBy: users[1],
  },
  {
    text: `I only use the 'bleeding cowboys' font because I pray to the bog.`,
    sfw: true,
    isEnabled: true,
    tags: [shitpostTags.random],
  },
];
