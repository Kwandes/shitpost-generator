import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
@Injectable()
export class SeedService {
  constructor(
    private readonly logger: Logger,
    private readonly connection: Connection
  ) {}

  // ========================
  // === MAIN SEED METHOD ===
  async seed() {
    this.logger.debug('Seeding the database');

    this.logger.debug('Entities:');
    (await this.getEntities()).forEach((entity) => console.log(entity.name));
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
}
