import { connectedDotsPreset } from './connected-dots.preset';
import { coronaPreset } from './corona.preset';
import { nyanPreset } from './nyan.preset';
import { ragePreset } from './rage.preset';
import { snowPreset } from './snow.preset';

// https://github.com/matteobruni/tsparticles/tree/main/website/presets
// the presets are "weighted" by just making the more common ones appear more often
export const allParticlesOptions = [
  connectedDotsPreset,
  connectedDotsPreset,
  connectedDotsPreset,
  connectedDotsPreset,
  snowPreset,
  snowPreset,
  snowPreset,
  snowPreset,
  nyanPreset,
  ragePreset,
  coronaPreset,
] as const;
