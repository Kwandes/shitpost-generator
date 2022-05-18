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
import {
  ISignupRequest,
  IUpdateUserNeoRequest,
  Role,
} from '@shitpost-generator/interfaces';
import { EntityNotFoundError } from 'typeorm';

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
    readonly findOneByEmailCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/users/update')
    readonly updateCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/users/create')
    readonly createCypher: CypherStatement,
    @InjectCypher(__dirname, './assets/users/delete')
    readonly deleteCypher: CypherStatement
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

  @Transactional()
  async update(params: IUpdateUserNeoRequest, id: string): Promise<UserNeo> {
    const { email, password, role } = params;
    return this.persistenceManager.maybeGetOne(
      new QuerySpecification<UserNeo>()
        .withStatement(this.updateCypher)
        .bind([id, email, password, role])
        .transform(UserNeo)
    );
  }

  @Transactional()
  async create(params: ISignupRequest, role: Role): Promise<UserNeo> {
    const { email, password } = params;
    // execute returns void so we need to do a seperate request to get the created user
    await this.persistenceManager.execute(
      new QuerySpecification()
        .withStatement(this.createCypher)
        .bind([email, password, role])
    );
    console.log('created');

    return this.findOneByEmail(email);
  }

  @Transactional()
  async delete(id: string): Promise<void> {
    // check that the user exists
    const user = await this.findOneById(id);
    if (!user) {
      throw new EntityNotFoundError(UserNeo, id);
    }
    // delete the user if they exist
    return this.persistenceManager.execute(
      new QuerySpecification().withStatement(this.deleteCypher).bind([id])
    );
  }
}
