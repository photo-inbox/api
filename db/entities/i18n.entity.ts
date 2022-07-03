import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('i18n')
export class I18nEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  lang: string;

  @Column('json')
  document: Record<string, string>;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
