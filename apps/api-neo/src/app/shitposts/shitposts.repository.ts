import {
  InjectCypher,
  InjectPersistenceManager,
} from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import { ShitpostNeo, TagNeo } from '@models';
import { Injectable } from '@nestjs/common';
import {
  ICreateShitpostRequestNeo,
  IUpdateShitpostRequstNeo,
  IUserNeo,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError } from 'typeorm';
import { TagsRepository } from '../tags/tags.repository';

@Injectable()
export class ShitpostsRepository {
  constructor(
    @InjectPersistenceManager()
    readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, './assets/shitposts/find-all')
    readonly findAllCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/shitposts/find-one-by-id')
    readonly findOneByIdCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/shitposts/find-one-by-text')
    readonly findOneByTextCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/shitposts/update')
    readonly updateCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/shitposts/create')
    readonly createCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/shitposts/create-relationship')
    readonly createRelationshipCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/shitposts/remove-is-tagged')
    readonly removeIsTaggedCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/shitposts/delete')
    readonly deleteCypher: CypherStatement,
    private tagsRepo: TagsRepository
  ) {}

  @Transactional()
  async findAll(): Promise<ShitpostNeo[]> {
    return this.persistenceManager.query(
      new QuerySpecification<ShitpostNeo>()
        .withStatement(this.findAllCypher)
        .transform(ShitpostNeo)
    );
  }

  @Transactional()
  async findOneById(id: string): Promise<ShitpostNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<ShitpostNeo>()
        .withStatement(this.findOneByIdCypher)
        .bind([id])
        .transform(ShitpostNeo)
    );
  }

  @Transactional()
  async findOneByText(text: string): Promise<ShitpostNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<ShitpostNeo>()
        .withStatement(this.findOneByTextCypher)
        .bind([text])
        .transform(ShitpostNeo)
    );
  }

  @Transactional()
  async update(
    params: IUpdateShitpostRequstNeo,
    id: string
  ): Promise<ShitpostNeo> {
    const { text, sfw, tags } = params;

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
        .bind([id, text, sfw, tags])
    );
    return this.findOneByText(text);
  }

  @Transactional()
  async create(
    params: ICreateShitpostRequestNeo,
    createdBy: IUserNeo
  ): Promise<ShitpostNeo> {
    const { text, sfw, tags } = params;

    // verify that the tags exist
    for (const tagId of tags) {
      const tag = await this.tagsRepo.findOneById(tagId);
      if (!tag) {
        throw new EntityNotFoundError(TagNeo, tagId);
      }
    }

    // Create the shitpost on its own
    await this.persistenceManager.execute(
      new QuerySpecification()
        .withStatement(this.createCypher)
        .bind([text, sfw, createdBy.userId ? true : false, tags])
    );
    // If the user was authenticated, associate the shitpost with them

    if (createdBy?.userId) {
      await this.persistenceManager.execute(
        new QuerySpecification()
          .withStatement(this.createRelationshipCypher)
          .bind([text, createdBy.userId])
      );
    }
    return this.findOneByText(text);
  }

  @Transactional()
  async delete(id: string): Promise<void> {
    // check that the shitpost exists
    const shitpost = await this.findOneById(id);
    if (!shitpost) {
      throw new EntityNotFoundError(ShitpostNeo, id);
    }
    // delete the shitpost if they exist
    return this.persistenceManager.execute(
      new QuerySpecification().withStatement(this.deleteCypher).bind([id])
    );
  }
}
