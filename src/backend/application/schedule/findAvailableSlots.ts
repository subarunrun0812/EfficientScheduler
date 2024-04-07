import { AvailableTime } from '@/backend/domain/model/calendar/availableTime'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'
import { IScheduleRepository } from '@/backend/domain/model/schedule/scheduleRepository'
import { TimeSlot } from '@/backend/domain/model/time_slot/timeSlot'
import duration from 'dayjs/plugin/duration'

export type RegisterScheduleInput = {
  currentUserId: string,  // TODO: クラスにするかも
  duration: duration.Duration,
  timeBuffer: duration.Duration,
  availableTime: AvailableTime,
}

export type RegisterScheduleOutput = TimeSlot[]

export class FindAvailableSlotsUseCase {
  constructor(
    private readonly calendarRepository: ICalendarRepository,
    private readonly scheduleRepository: IScheduleRepository,
  ) { }

  async execute(input: RegisterScheduleInput): Promise<RegisterScheduleOutput> {
    // ユーザーのカレンダーを取得
    // 外部システムに登録されている予定, 仮の予定も含む
    const calendar = await this.calendarRepository.findByUserId(input.currentUserId).catch(_ => null)
    if (calendar == null) {
      throw new Error('Calendar not found')
    }

    // 取得した予定から空きを検索して、schedule に対する仮スロットを作成
    const slotCandidates = calendar.createSlots(input.duration, input.availableTime, input.timeBuffer)

    return slotCandidates
  }
}
