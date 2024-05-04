import { LocationEntity } from '../location/location.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'attendances' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => LocationEntity, (location) => location.attendances)
  location: LocationEntity;
}
