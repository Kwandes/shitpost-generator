import { Injectable, Logger } from '@nestjs/common';
import { Connection, getManager } from 'typeorm';
import { NameTagsSeederService } from './services/name-tags.service';
import { NamesSeederService } from './services/names.service';
import { ShitpostTagsSeederService } from './services/shitpost-tags.service';
import { ShitpostsSeederService } from './services/shitposts.service';
import { UsersSeederService } from './services/users.service';
@Injectable()
export class SeedService {
  constructor(
    private readonly logger: Logger,
    private readonly connection: Connection,
    private readonly usersService: UsersSeederService,
    private readonly shitpostTagsService: ShitpostTagsSeederService,
    private readonly shitpostsService: ShitpostsSeederService,
    private readonly nameTagsService: NameTagsSeederService,
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
    await this.seedShitpostTags();
    await this.seedShitposts();
    await this.seedNameTags();
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
      const manager = getManager();
      const tables = entities.map((entity) => '"' + entity.tableName + '"');

      if (dbType === 'mysql') {
        // Can't delete from nor truncate multiple tables at once
        // Can't truncate due to foreign key constraints
        for (const table of tables) {
          const query = `DELETE FROM ` + table.replaceAll(`"`, ``) + ';';
          await manager.query(query);
          console.log(`${table} has perished`);
        }
      }

      if (dbType === 'postgres') {
        const truncateSql = `TRUNCATE TABLE ${tables.join(
          ','
        )} RESTART IDENTITY CASCADE;`;
        await manager.query(truncateSql);
      }

      if (dbType === 'sqlite') {
        // There is no SQLite specific TRUNCATE TABLE command
        // Setting in typeorm config `dropSchema: true` clears database
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
      this.logger.error(error);
    }
  }

  async seedShitpostTags() {
    try {
      const response = await Promise.all(this.shitpostTagsService.create());
      this.logger.debug(`✅ Shitpost tags created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async seedShitposts() {
    try {
      const response = await Promise.all(this.shitpostsService.create());
      this.logger.debug(`✅ Shitposts created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async seedNameTags() {
    try {
      const response = await Promise.all(this.nameTagsService.create());
      this.logger.debug(`✅ Name tags created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async seedNames() {
    try {
      const response = await Promise.all(this.namesService.create());
      this.logger.debug(`✅ Names created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
