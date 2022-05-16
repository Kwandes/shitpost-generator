import {
  Name,
  NameMongo,
  NameTag,
  Shitpost,
  ShitpostMongo,
  ShitpostTag,
  User,
  UserMongo,
} from '@models';
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

  public getTypeOrmConfigMySql(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      synchronize: true,

      host: this.getValue('MYSQL_HOST', false) || 'localhost',
      port: parseInt(this.getValue('MYSQL_PORT', false)) || 3306,
      username: this.getValue('MYSQL_USER', false) || 'root',
      password: this.getValue('MYSQL_PASSWORD', false) || 'root',
      database: this.getValue('MYSQL_DATABASE', false) || 'shitpost_generator',

      entities: [User, Shitpost, ShitpostTag, Name, NameTag],
    };
  }
  public getTypeOrmConfigMongoDb(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      synchronize: false,
      useUnifiedTopology: true, // Current Server Discovery and Monitoring engine current version is deprecated, setting this to true uses the new stuff

      authSource: 'admin', //  extra step needed to mongoDb
      host: this.getValue('MONGO_HOST', false) || 'localhost',
      port: parseInt(this.getValue('MONGO_PORT', false)) || 49153,
      username: this.getValue('MONGO_USER', false) || 'docker',
      password: this.getValue('MONGO_PASSWORD', false) || 'mongopw',
      database: this.getValue('MONGO_DATABASE', false) || 'shitpost_generator',

      entities: [UserMongo, ShitpostMongo, NameMongo],
    };
  }
  public getTypeOrmConfigNeo4j(): TypeOrmModuleOptions {
    return {
      // TODO - implement neo4j
      // type: 'neo4j',
      // synchronize: true,
      // host: this.getValue('MYSQL_HOST', false) || 'localhost',
      // port: parseInt(this.getValue('MYSQL_PORT', false)) || 3306,
      // username: this.getValue('MYSQL_USER', false) || 'root',
      // password: this.getValue('MYSQL_PASSWORD', false) || 'root',
      // database: this.getValue('MYSQL_DATABASE', false) || 'shitpost_generator',
      // entities: [User, Shitpost, ShitpostTag, Name, NameTag],
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
