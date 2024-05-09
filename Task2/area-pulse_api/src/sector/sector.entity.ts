import { LocationEntity } from '../location/location.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttendanceEntity } from '../attendance/attendance.entity';

@Entity({ name: 'sectors' })
export class SectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.sector, {
    cascade: true,
  })
  attendances: AttendanceEntity[];

  @ManyToOne(() => LocationEntity, (location) => location.sectors, {
    onDelete: 'CASCADE',
  })
  location: LocationEntity;
}
