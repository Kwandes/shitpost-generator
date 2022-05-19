import {
  InjectCypher,
  InjectPersistenceManager,
} from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import { NameNeo, TagNeo } from '@models';
import { Injectable } from '@nestjs/common';
import {
  ICreateNameRequestNeo,
  IUpdateNameRequstNeo,
  IUserNeo,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError } from 'typeorm';
import { TagsRepository } from '../tags/tags.repository';

@Injectable()
export class NamesRepository {
  constructor(
    @InjectPersistenceManager()
    readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, './assets/names/find-all')
    readonly findAllCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/names/find-one-by-id')
    readonly findOneByIdCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/names/find-one-by-text')
    readonly findOneByTextCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/names/update')
    readonly updateCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/names/create')
    readonly createCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/names/create-relationship')
    readonly createRelationshipCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/names/remove-is-tagged')
    readonly removeIsTaggedCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/names/delete')
    readonly deleteCypher: CypherStatement,
    private tagsRepo: TagsRepository
  ) {}

  @Transactional()
  async findAll(): Promise<NameNeo[]> {
    return this.persistenceManager.query(
      new QuerySpecification<NameNeo>()
        .withStatement(this.findAllCypher)
        .transform(NameNeo)
    );
  }

  @Transactional()
  async findOneById(id: string): Promise<NameNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<NameNeo>()
        .withStatement(this.findOneByIdCypher)
        .bind([id])
        .transform(NameNeo)
    );
  }

  @Transactional()
  async findOneByName(text: string): Promise<NameNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<NameNeo>()
        .withStatement(this.findOneByTextCypher)
        .bind([text])
        .transform(NameNeo)
    );
  }

  @Transactional()
  async update(params: IUpdateNameRequstNeo, id: string): Promise<NameNeo> {
    const { name, gender, isEnabled, tags } = params;

    // verify that the tags exist
    for (const tagId of tags) {
      const tag = await this.tagsRepo.findOneById(tagId);
      if (!tag) {
        throw new EntityNotFoundError(TagNeo, tagId);
      }
    }
    // Remove old IS_TAGGED relationships
    await this.persistenceManager.execute(
      new QuerySpecification()
        .withStatement(this.removeIsTaggedCypher)
        .bind([id])
    );
    // set new entry data, wipe old tag relationships and set new ones
    await this.persistenceManager.execute(
      new QuerySpecification()
        .withStatement(this.updateCypher)
        .bind([id, name, isEnabled, gender, tags])
    );
    return this.findOneByName(name);
  }

  @Transactional()
  async create(
    params: ICreateNameRequestNeo,
    createdBy: IUserNeo
  ): Promise<NameNeo> {
    const { name, gender, isEnabled, tags } = params;

    // verify that the tags exist
    for (const tagId of tags) {
      const tag = await this.tagsRepo.findOneById(tagId);
      if (!tag) {
        throw new EntityNotFoundError(TagNeo, tagId);
      }
    }

    // Create the name on its own
    await this.persistenceManager.execute(
      new QuerySpecification()
        .withStatement(this.createCypher)
        .bind([name, gender, createdBy.userId ? true : false, tags])
    );
    // If the user was authenticated, associate the name with them

    if (createdBy?.userId) {
      await this.persistenceManager.execute(
        new QuerySpecification()
          .withStatement(this.createRelationshipCypher)
          .bind([name, createdBy.userId])
      );
    }
    return this.findOneByName(name);
  }

  @Transactional()
  async delete(id: string): Promise<void> {
    // check that the name exists
    const name = await this.findOneById(id);
    if (!name) {
      throw new EntityNotFoundError(NameNeo, id);
    }
    // delete the name if they exist
    return this.persistenceManager.execute(
      new QuerySpecification().withStatement(this.deleteCypher).bind([id])
    );
  }
}
