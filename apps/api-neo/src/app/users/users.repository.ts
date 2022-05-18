import {
  InjectCypher,
  InjectPersistenceManager,
} from '@liberation-data/drivine/DrivineInjectionDecorators';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { CypherStatement } from '@liberation-data/drivine/query/Statement';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import { UserNeo } from '@models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectPersistenceManager()
    readonly persistenceManager: PersistenceManager,
    @InjectCypher(__dirname, './assets/users/find-all')
    readonly findAllCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/users/find-one-by-id')
    readonly findOneByIdCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/users/find-one-by-email')
    readonly findOneByEmailCypher: CypherStatement
  ) {}

  @Transactional()
  async findAll(): Promise<UserNeo[]> {
    return this.persistenceManager.query(
      new QuerySpecification<UserNeo>()
        .withStatement(this.findAllCypher)
        .transform(UserNeo)
    );
  }

  @Transactional()
  async findOneById(id: string): Promise<UserNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<UserNeo>()
        .withStatement(this.findOneByIdCypher)
        .bind([id])
        .transform(UserNeo)
    );
  }

  @Transactional()
  async findOneByEmail(email: string): Promise<UserNeo> {
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<UserNeo>()
        .withStatement(this.findOneByEmailCypher)
        .bind([email])
        .transform(UserNeo)
    );
  }
}
