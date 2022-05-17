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
    @InjectCypher(__dirname, './assets/findAllUsers')
    readonly findAllCypher: CypherStatement
  ) {}

  @Transactional()
  async findAll(): Promise<UserNeo[]> {
    return this.persistenceManager.query(
      new QuerySpecification<UserNeo>()
        .withStatement(this.findAllCypher)
        .transform(UserNeo)
    );
  }
}
