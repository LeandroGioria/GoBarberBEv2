import { Repository, EntityRepository } from 'typeorm';
import Schedule from '../models/Schedule';

@EntityRepository(Schedule)
class SchedulesRepository extends Repository<Schedule> {}

export default SchedulesRepository;
