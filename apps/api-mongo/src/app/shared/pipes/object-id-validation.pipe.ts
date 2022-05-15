import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  transform(value: any): ObjectID {
    const validObjectId = ObjectID.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return ObjectID.createFromHexString(value);
  }
}
