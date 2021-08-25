import { MaxLength, Property, Required } from '@tsed/schema';
import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity,
} from 'typeorm';
import { DataPacket } from './DataPacket';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(100)
  @Required()
  name: string;

  @Column()
  @MaxLength(64)
  @Required()
  key: string;

  @Column({ nullable: true })
  telegramBotToken?: string;

  @Column({ nullable: true })
  telegramBotChatId?: string;

  @OneToMany(() => DataPacket, (dataPacket) => dataPacket.country)
  dataPackets?: DataPacket[];
}
