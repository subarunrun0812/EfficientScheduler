import { Schedule } from './schedule'

export interface IScheduleRepository {
    save(schedule: Schedule): Promise<void> 
}