import duration from 'dayjs/plugin/duration'
import { ScheduleId } from './scheduleId'
import { Place } from './place'
import { AvailableTime } from './availableTime'
import { TimeSlot } from '@/backend/domain/model/time_slot/timeSlot'
import { ScheduleStatus } from '@/backend/domain/model/schedule/scheduleStatus'

export class Schedule {
  constructor(
    readonly id: ScheduleId,
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

  // 予定の候補を作成
  createSlots(availableTime: AvailableTime, calendar: any): TimeSlot[] {
    return []
  }
}
