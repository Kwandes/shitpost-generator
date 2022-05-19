import { Module } from '@nestjs/common';
import { TagsRepository } from '../tags/tags.repository';
import { NamesController } from './names.controller';
import { NamesRepository } from './names.repository';
import { NamesService } from './names.service';

@Module({
  controllers: [NamesController],
  providers: [NamesService, NamesRepository, TagsRepository],
  exports: [NamesService, NamesRepository],
})
export class NamesModule {}
