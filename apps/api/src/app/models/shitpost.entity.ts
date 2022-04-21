import { IShitpost } from '@shitpost-generator/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('shitposts')
export class Shitpost extends Base implements IShitpost {
  @PrimaryGeneratedColumn('uuid')
  shitpostId: string;

  @Column({ length: 150 })
  text: string;

  @Column()
  sfw: boolean;

  @Column({ default: false })
  isEnabled: boolean;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy?: User;
}
