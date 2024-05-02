import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'attendances' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
