import { NameMongo, ShitpostMongo, UserMongo } from '@models';
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
      type: 'mongodb',
      synchronize: false,
      useUnifiedTopology: true, // Current Server Discovery and Monitoring engine current version is deprecated, setting this to true uses the new stuff
      useNewUrlParser: true,

      authSource: 'admin', //  extra step needed to mongoDb
      host: this.getValue('MONGO_HOST', false) || 'localhost',
      port: parseInt(this.getValue('MONGO_PORT', false)) || 27017,
      username: this.getValue('MONGO_USER', false) || 'root',
      password: this.getValue('MONGO_PASSWORD', false) || 'root',
      database: this.getValue('MONGO_DATABASE', false) || 'shitpost_generator',
      ssl: this.getValue('MONGO_SLL', false) === 'true' || false,

      entities: [UserMongo, ShitpostMongo, NameMongo],
    };
  }
}

// commented out so the app uses defaults for DB connection instead
const configService = new ConfigService(process.env).ensureValues([
  //   'MONGO_HOST',
  //   'MONGO_PORT',
  //   'MONGO_USER',
  //   'MONGO_PASSWORD',
  //   'MONGO_DATABASE',
]);

export { configService };
