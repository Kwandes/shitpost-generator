import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedModuleMongo } from './mongodb/seed.module';
import { SeedServiceMongo } from './mongodb/seed.service';
import { SeedModuleMySql } from './mysql/seed.module';
import { SeedServiceMySql } from './mysql/seed.service';

async function bootstrap() {
  // Figure out which databases to seed
  const seedDatabases = {
    mysql: false,
    mongodb: false,
    neo4j: false,
  };
  let seedingDatabaseText = '';
  process.argv.forEach(function (val) {
    if (val === '--mysql') {
      seedDatabases.mysql = true;
      seedingDatabaseText += 'MySQL';
    }
    if (val === '--mongo') {
      seedDatabases.mongodb = true;
      seedingDatabaseText += ' MongoDb';
    }
    if (val === '--neo4j') {
      seedDatabases.neo4j = true;
      seedingDatabaseText += ' Neo4j';
    }
  });

  // ======== MySQL ========
  if (seedDatabases.mysql) {
    const appCtx = await NestFactory.createApplicationContext(
      SeedModuleMySql.register()
    );
    const logger = appCtx.get(Logger);
    const seeder = appCtx.get(SeedServiceMySql);
    try {
      logger.debug(`Seeding the MySQL database`);
      await seeder.seed();
      logger.debug('Seeding complete!');

      appCtx.close();
    } catch (error) {
      logger.error('Seeding failed');
      throw error;
    }
  }
  // ======== MongoDB ========
  if (seedDatabases.mongodb) {
    const appCtx = await NestFactory.createApplicationContext(
      SeedModuleMongo.register()
    );
    const logger = appCtx.get(Logger);
    const seeder = appCtx.get(SeedServiceMongo);
    try {
      logger.debug(`Seeding the MongoDB database`);
      await seeder.seed();
      logger.debug('Seeding complete!');

      appCtx.close();
    } catch (error) {
      logger.error('Seeding failed');
      throw error;
    }
  }
  // ======== Neo4j ========
  if (seedDatabases.neo4j) {
    // TODO - implement Neo4j seeding
    console.warn('SEEDING OF NEO4J DATABASE IS NOT IMPLEMENTED YET');
  }
}

bootstrap();
