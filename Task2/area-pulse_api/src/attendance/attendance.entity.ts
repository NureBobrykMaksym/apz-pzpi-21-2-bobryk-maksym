import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocationEntity } from '../location/location.entity';

@Entity({ name: 'attendances' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => LocationEntity, (location) => location.attendances, {
    onDelete: 'CASCADE',
  })
  location: LocationEntity;
}
