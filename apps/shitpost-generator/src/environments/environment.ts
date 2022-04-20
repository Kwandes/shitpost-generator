/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEnvironment } from './ienvironment';

// Default development environment configuration
export const environment: IEnvironment = {
  production: false,
  envName: 'development',

  apiUrl: (window as any)['env']
    ? (window as any)['env']['apiUrl']
    : 'http://localhost:3333',
};
