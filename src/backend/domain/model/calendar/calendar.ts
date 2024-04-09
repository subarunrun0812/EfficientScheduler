import duration from 'dayjs/plugin/duration'
import { Schedule } from '../schedule/schedule'
import { TimeSlot } from '../schedule/timeSlot'
import { AvailableTime } from './availableTime'

export class Calendar {
  constructor() {}

  // 予定の候補を作成
  createSlots(
    scheduleDuration: duration.Duration,
    availableTime: AvailableTime,
    timeBuffer: duration.Duration,
  ): TimeSlot[] {
    return []
  }

  async addSchedule(schedule: Schedule): Promise<void> {
    return
  }
}
