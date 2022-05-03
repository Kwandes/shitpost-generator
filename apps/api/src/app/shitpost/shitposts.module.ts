import { Shitpost, ShitpostTag } from '@models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShitpostsController } from './shitposts.controller';
import { ShitpostsService } from './shitposts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shitpost, ShitpostTag])],
  controllers: [ShitpostsController],
  providers: [ShitpostsService],
  exports: [ShitpostsService],
})
export class ShitpostsModule {}
