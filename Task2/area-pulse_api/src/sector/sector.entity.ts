import { SensorEntity } from '../sensor/sensor.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttendanceEntity } from '../attendance/attendance.entity';
import { LocationEntity } from '../location/location.entity';

@Entity({ name: 'sectors' })
export class SectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  attendanceCoefficient: number;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.sector, {
    cascade: true,
    eager: true,
  })
  attendances: AttendanceEntity[];

  @OneToMany(() => SensorEntity, (sensor) => sensor.sector, {
    cascade: true,
    // eager: true,
  })
  sensors: SensorEntity[];

  @ManyToOne(() => LocationEntity, (location) => location.sectors, {
    onDelete: 'CASCADE',
  })
  location: LocationEntity;
}
