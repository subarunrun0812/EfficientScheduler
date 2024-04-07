import duration from 'dayjs/plugin/duration'
import { ScheduleId } from './scheduleId'
import { Place } from './place'
import { TimeSlot } from '@/backend/domain/model/time_slot/timeSlot'
import { ScheduleStatus } from '@/backend/domain/model/schedule/scheduleStatus'

export class Schedule {
  constructor(
    readonly scheduleId: ScheduleId,
    private readonly userId: string,  // TODO: クラスにするかも
    readonly title: string,
    readonly duration: duration.Duration,
    readonly place: Place,
    readonly timeBuffer: duration.Duration,
    private status: ScheduleStatus,
  ) {}

  // ステータスを取得
  getStatus(): ScheduleStatus {
    return this.status
  }

}
