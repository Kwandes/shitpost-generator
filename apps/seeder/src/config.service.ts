import { Name, Shitpost, ShitpostTag, User } from '@models';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      synchronize: true,

      host: this.getValue('MYSQL_HOST', false) || 'localhost',
      port: parseInt(this.getValue('MYSQL_PORT', false)) || 5432,
      username: this.getValue('MYSQL_USER', false) || 'root',
      password: this.getValue('MYSQL_PASSWORD', false) || 'root',
      database: this.getValue('MYSQL_DATABASE', false) || 'shitpost_generator',

      entities: [User, Shitpost, ShitpostTag, Name],
    };
  }
}

// commented out so the app uses defaults for DB connection instead
const configService = new ConfigService(process.env).ensureValues([
  //   'MYSQL_HOST',
  //   'MYSQL_PORT',
  //   'MYSQL_USER',
  //   'MYSQL_PASSWORD',
  //   'MYSQL_DATABASE',
]);

export { configService };
