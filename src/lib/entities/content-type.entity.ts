import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { Permission } from './permission.entity';
import { CustomValidationError } from '../exceptions/custom-validation.error';
import { BaseEntity } from './base/base.entity';

@Entity({ name: 'content_type' })
export class ContentType extends BaseEntity {
  @Column({ length: 100 })
  @IsNotEmpty()
  @MaxLength(100)
  name: string = undefined;

  @Column({ length: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  title: string = undefined;

  @OneToMany(type => Permission, permission => permission.contentType)
  permissions: Permission[];

  @BeforeInsert()
  doBeforeInsertion() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  @BeforeUpdate()
  doBeforeUpdate() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }
}
