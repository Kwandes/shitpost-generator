import {
  InjectCypher,
  InjectPersistenceManager,
} from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import { TagNeo } from '@models';
import { Injectable } from '@nestjs/common';
import {
  ICreateTagNeoRequest,
  IUpdateTagNeoRequest,
  IUserNeo,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class TagsRepository {
  constructor(
    @InjectPersistenceManager()
    readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, './assets/tags/find-all')
    readonly findAllCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/tags/find-one-by-id')
    readonly findOneByIdCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/tags/find-one-by-tag')
    readonly findOneByTagCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/tags/update')
    readonly updateCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/tags/create')
    readonly createCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/tags/create-relationship')
    readonly createRelationshipCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/tags/delete')
    readonly deleteCypher: CypherStatement
  ) {}

  @Transactional()
  async findAll(): Promise<TagNeo[]> {
    return this.persistenceManager.query(
      new QuerySpecification<TagNeo>()
        .withStatement(this.findAllCypher)
        .transform(TagNeo)
    );
  }

  @Transactional()
  async findOneById(id: string): Promise<TagNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<TagNeo>()
        .withStatement(this.findOneByIdCypher)
        .bind([id])
        .transform(TagNeo)
    );
  }

  @Transactional()
  async findOneByTag(tag: string): Promise<TagNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<TagNeo>()
        .withStatement(this.findOneByTagCypher)
        .bind([tag])
        .transform(TagNeo)
    );
  }

  @Transactional()
  async update(params: IUpdateTagNeoRequest, id: string): Promise<TagNeo> {
    const { tag, sfw } = params;
    await this.persistenceManager.execute(
      new QuerySpecification()
        .withStatement(this.updateCypher)
        .bind([id, tag, sfw])
    );
    return this.findOneByTag(tag);
  }

  @Transactional()
  async create(
    params: ICreateTagNeoRequest,
    createdBy: IUserNeo
  ): Promise<TagNeo> {
    const { tag, sfw } = params;
    // Create the tag on its own
    await this.persistenceManager.execute(
      new QuerySpecification().withStatement(this.createCypher).bind([tag, sfw])
    );
    // If the user was authenticated, associate the tag with them
    if (createdBy?.userId) {
      await this.persistenceManager.execute(
        new QuerySpecification()
          .withStatement(this.createRelationshipCypher)
          .bind([tag, createdBy.userId])
      );
    }
    return this.findOneByTag(tag);
  }

  @Transactional()
  async delete(id: string): Promise<void> {
    // check that the tag exists
    const tag = await this.findOneById(id);
    if (!tag) {
      throw new EntityNotFoundError(TagNeo, id);
    }
    // delete the tag if they exist
    return this.persistenceManager.execute(
      new QuerySpecification().withStatement(this.deleteCypher).bind([id])
    );
  }
}
