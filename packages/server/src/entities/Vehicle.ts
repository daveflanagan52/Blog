import { MaxLength, Property, Required } from '@tsed/schema';
import {
  Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne,
} from 'typeorm';
import { Country } from './Country';

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

  @Column({ nullable: true })
  locationGeneral: string;

  @Column({ nullable: true })
  locationSpecific: string;

  @Column({ nullable: true })
  showOnBlog: boolean;

  @ManyToOne(() => Country, (country) => country.vehicles)
  country?: Country;
}
