import { SectorEntity } from '../sector/sector.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @OneToMany(() => SectorEntity, (sector) => sector.location, {
    cascade: true,
  })
  sectors: SectorEntity[];

  @ManyToOne(() => UserEntity, (user) => user.locations, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
