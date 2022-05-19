import { Module } from '@nestjs/common';
import { TagsRepository } from '../tags/tags.repository';
import { ShitpostsController } from './shitposts.controller';
import { ShitpostsRepository } from './shitposts.repository';
import { ShitpostsService } from './shitposts.service';

@Module({
  controllers: [ShitpostsController],
  providers: [ShitpostsService, ShitpostsRepository, TagsRepository],
  exports: [ShitpostsService, ShitpostsRepository],
})
export class ShitpostsModule {}
