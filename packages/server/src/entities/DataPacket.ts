import {
  Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne,
} from 'typeorm';
import { Country } from './Country';
import { Vehicle } from './Vehicle';

@Entity()
export class DataPacket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location_general: string;

  @Column()
  location_specific: string;

  @Column('decimal')
  speed: number;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column('decimal')
  battery: number;

  @Column('decimal')
  current: number;

  @Column('decimal')
  temperature: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.dataPackets)
  vehicle?: Vehicle;

  @ManyToOne(() => Country, (country) => country.dataPackets)
  country?: Country;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
