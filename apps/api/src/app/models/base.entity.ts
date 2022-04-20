// base.entity.ts
import { IBase } from '@shitpost-generator/interfaces';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Base implements IBase {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
