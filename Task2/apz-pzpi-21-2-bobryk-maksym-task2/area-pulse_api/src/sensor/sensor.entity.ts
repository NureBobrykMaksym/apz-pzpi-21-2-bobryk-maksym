import { SectorEntity } from '../sector/sector.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sensors' })
export class SensorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => SectorEntity, (sector) => sector.sensors, {
    onDelete: 'CASCADE',
  })
  sector: SectorEntity;
}
