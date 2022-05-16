import { UserMongo } from '@models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMongo])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
