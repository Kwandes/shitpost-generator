import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Name } from '../models/name.entity';
import { NamesController } from './names.controller';
import { NamesService } from './names.service';

@Module({
  imports: [TypeOrmModule.forFeature([Name])],
  controllers: [NamesController],
  providers: [NamesService],
  exports: [NamesService],
})
export class NamesModule {}
