import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  image: string;

  @Column({ nullable: true })
  label: string | null;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  @Column({ default: false })
  isCompleted: boolean;
}
