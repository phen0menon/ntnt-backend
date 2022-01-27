import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OperationStatus {
  IN_PROGRESS,
  FAILED,
  DONE,
}

@Entity('operation')
export class Operation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int2', name: 'status', default: OperationStatus.IN_PROGRESS })
  status: number;
}
