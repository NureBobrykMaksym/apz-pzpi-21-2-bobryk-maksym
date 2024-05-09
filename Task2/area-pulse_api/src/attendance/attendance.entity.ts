import { SectorEntity } from '../sector/sector.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'attendances' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => SectorEntity, (sector) => sector.attendances, {
    onDelete: 'CASCADE',
    eager: false,
  })
  sector: SectorEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
