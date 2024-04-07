import duration from 'dayjs/plugin/duration'
import { ScheduleId } from './scheduleId'
import { Place } from './place'
import { TimeSlot } from './timeSlot'
import { ScheduleStatus } from '@/backend/domain/model/schedule/scheduleStatus'

// 調整中の場合, 予定は複数のスロットを持つ
// 確定後, 予定は 1 つだけスロットを持つ
export class Schedule {
  constructor(
    private readonly scheduleId: ScheduleId,
    private readonly userId: string,  // TODO: クラスにするかも
    readonly title: string,
    readonly duration: duration.Duration,
    readonly place: Place,
    private readonly timeSlots: TimeSlot[],
    private status: ScheduleStatus,
  ) {}

  getStatus(): ScheduleStatus {
    return this.status
  }

  getId(): string {
    return this.scheduleId.getId()
  }

  // slotId で指定されたスロットに確定
  // それ以外の予約済みスロットを削除する
  confirmSlot(slotId: string): void {}
}
