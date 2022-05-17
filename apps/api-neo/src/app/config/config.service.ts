import {
  ConnectionProperties,
  DatabaseType,
} from '@liberation-data/drivine/connection';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing: boolean): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getConnectionProperties(): ConnectionProperties {
    return {
      databaseType: DatabaseType.NEO4J,
      host: this.getValue('NEO4J_HOST', false) || 'localhost',
      port: parseInt(this.getValue('NEO4J_PORT', false)) || 7687,
      userName: this.getValue('NEO4J_USER', false) || 'neo4j',
      password: this.getValue('NEO4J_PASSWORD', false) || 'root',
      databaseName: this.getValue('NEO4J_DATABASE', false) || 'neo4j',
    };
  }
}

// commented out so the app uses defaults for DB connection instead
const configService = new ConfigService(process.env).ensureValues([
  //   'NEO4J_HOST',
  //   'NEO4J_PORT',
  //   'NEO4J_USER',
  //   'NEO4J_PASSWORD',
  //   'NEO4J_DATABASE',
]);

export { configService };
