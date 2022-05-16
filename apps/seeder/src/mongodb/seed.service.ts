import { NameMongo, ShitpostMongo, UserMongo } from '@models';
import { Injectable, Logger } from '@nestjs/common';
import { Connection, getMongoManager } from 'typeorm';
import { NamesSeederService } from './services/names.service';
import { ShitpostsSeederService } from './services/shitposts.service';
import { UsersSeederService } from './services/users.service';
@Injectable()
export class SeedServiceMongo {
  constructor(
    private readonly logger: Logger,
    private readonly connection: Connection,
    private readonly usersService: UsersSeederService,
    private readonly shitpostsService: ShitpostsSeederService,
    private readonly namesService: NamesSeederService
  ) {}

  // ========================
  // === MAIN SEED METHOD ===
  async seed() {
    this.logger.debug('Seeding the database');

    this.logger.debug('Entities:');
    (await this.getEntities()).forEach((entity) =>
      console.log(entity.tableName)
    );

    // Clear database
    this.logger.debug('Removing old database data');
    await this.resetDatabase();

    // Seed the entities
    this.logger.debug('Populating tables with seed data');
    await this.seedUsers();
    await this.seedShitposts();
    await this.seedNames();
  }

  // ====================================
  // === DATABASE MANAGEMENT METHODS ====

  async getEntities() {
    const entities = [];
    try {
      this.connection.entityMetadatas.forEach((entity) =>
        entities.push({
          name: entity.name,
          tableName: entity.tableName,
        })
      );
      return entities;
    } catch (error) {
      this.logger.error(error, 'Unable to retrieve database metadata');
      return [];
    }
  }

  /**
   * Cleans all the entities
   * Removes all data from database
   */
  private async cleanAll(entities) {
    try {
      const dbType = this.connection.options.type;
      const manager = getMongoManager();

      if (dbType === 'mongodb') {
        const entities = [UserMongo, ShitpostMongo, NameMongo];
        // Can't perform raw queries like `db.dropDatabase()` so gotta do a query for each table
        for (const entity of entities) {
          await manager.delete(entity, {});
        }
      }
    } catch (error) {
      this.logger.error(error, 'Unable to clean database');
    }
  }

  /**
   * Reset the database, truncate all tables (remove all data)
   */
  async resetDatabase() {
    this.logger.debug('RESETTING DATABASE');

    const entities = await this.getEntities();
    await this.cleanAll(entities);

    this.logger.debug('✅ DATABASE RESET SUCCESSFUL');
  }

  // ====================================
  // === ENTITY SEEDING METHODS ====

  async seedUsers() {
    try {
      const response = await Promise.all(this.usersService.create());
      this.logger.debug(`✅ Users created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Users failed to seed`);
      this.logger.error(error);
    }
  }

  async seedShitposts() {
    try {
      const response = await Promise.all(this.shitpostsService.create());
      this.logger.debug(`✅ Shitposts created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Shitposts failed to seed`);
      this.logger.error(error);
    }
  }

  async seedNames() {
    try {
      const response = await Promise.all(this.namesService.create());
      this.logger.debug(`✅ Names created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Names failed to seed`);
      this.logger.error(error);
    }
  }
}
