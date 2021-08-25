import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SavedLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column('varchar', { array: true })
  tags: string[];

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
