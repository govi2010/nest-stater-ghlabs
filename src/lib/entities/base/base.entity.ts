import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn() id: number = undefined;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date = undefined;

  @Column({ type: Date, name: 'updated_date', nullable: true })
  updatedDate: Date = undefined;
}
