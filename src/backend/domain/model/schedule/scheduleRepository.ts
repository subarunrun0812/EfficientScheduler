import { Schedule } from './schedule'
import { ScheduleId } from './scheduleId'

export interface IScheduleRepository {
  save(schedule: Schedule): Promise<void>
  find(id: ScheduleId): Promise<Schedule>
}
