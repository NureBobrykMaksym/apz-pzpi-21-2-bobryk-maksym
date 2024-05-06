import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttendanceEntity } from '../attendance/attendance.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'locations' })
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  area: number;
  // TODO: Fix migrations
  @OneToMany(() => AttendanceEntity, (attendance) => attendance.location, {
    cascade: true,
  })
  attendances: AttendanceEntity[];

  @ManyToOne(() => UserEntity, (user) => user.locations, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
