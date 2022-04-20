/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEnvironment } from './ienvironment';

// production-specific environment
export const environment: IEnvironment = {
  production: true,
  envName: 'production',

  apiUrl: (window as any)['env']
    ? (window as any)['env']['apiUrl']
    : 'http://localhost:3333',
};
