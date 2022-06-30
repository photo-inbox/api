import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  image: string;

  @Column({ nullable: true })
  label: string | null;
}
