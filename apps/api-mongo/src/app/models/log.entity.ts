import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('logs')
export class Log {
  @ApiModelProperty()
  @ObjectIdColumn()
  logId!: number;

  @ApiModelProperty()
  @Column({ length: 80 })
  user!: string;

  @ApiModelProperty()
  @Column({ length: 10 })
  action!: string;

  @ApiModelProperty()
  @Column({ length: 20, name: 'table_name' })
  tableName!: string;

  @ApiModelProperty()
  @Column({ name: 'log_time' })
  logTime!: Date;

  @ApiModelProperty()
  @Column({ type: 'text' })
  data!: string;
}
