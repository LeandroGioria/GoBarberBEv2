import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Schedules')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Schedule;
