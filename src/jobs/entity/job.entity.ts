/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  jobType: string;

  @Column()
  salaryRange: string;

  @Column('text')
  description: string;

  // Make these fields nullable
  @Column({ type: 'text', nullable: true })
  requirements: string | null;

  @Column({ type: 'text', nullable: true })
  responsibilities: string | null;

  @Column()
  applicationDeadline: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  companyProfilePhoto: string;
}
