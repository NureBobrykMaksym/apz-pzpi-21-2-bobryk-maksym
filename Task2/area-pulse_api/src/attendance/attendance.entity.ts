import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocationEntity } from '../location/location.entity';

@Entity({ name: 'attendances' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => LocationEntity, (location) => location.attendances, {
    onDelete: 'CASCADE',
    eager: false,
  })
  location: LocationEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
