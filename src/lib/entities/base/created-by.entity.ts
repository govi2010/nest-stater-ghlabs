import { User } from '../user.entity';
import { Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class CreatedByEntity extends BaseEntity {
  @OneToOne(type => User)
  @JoinColumn()
  @Column({ type: Date, name: 'created_by_id' })
  created_by: User;

  @OneToOne(type => User)
  @JoinColumn()
  @Column({ type: Date, name: 'updated_by_id', nullable: true })
  updated_by_id: User;

  @OneToOne(type => User)
  @JoinColumn()
  @Column({ type: Date, name: 'deleted_by_id', nullable: true })
  deleted_by_id: User;
}
