import duration from 'dayjs/plugin/duration'
import { ScheduleId } from './scheduleId'
import { Place } from './place'
import { AvailableTime } from '@/backend/domain/model/schedule/availableTime'

export class Schedule {
  constructor(
    private readonly id: ScheduleId,
    private readonly title: string,
    private readonly availableTime: AvailableTime,
    private readonly place: Place,
    private readonly timeBuffer: duration.Duration,
  ) {}

  // Slot 候補を作成
}
