import { IScheduleRepository } from '@/backend/domain/model/schedule/scheduleRepository'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'
import { ScheduleId } from '@/backend/domain/model/schedule/scheduleId'

export type ConfirmSlotUseCaseInput = {
  currentUserId: string
  scheduleId: ScheduleId
  slotId: string // TODO: クラスにする?
}

export type ConfirmSlotUseCaseOutput = {}

export class ConfirmSlotUseCase {
  constructor(
    private readonly scheduleRepository: IScheduleRepository,
    private readonly calendarRepository: ICalendarRepository,
  ) {}

  async execute(
    input: ConfirmSlotUseCaseInput,
  ): Promise<ConfirmSlotUseCaseOutput> {
    const schedule = await this.scheduleRepository
      .find(input.scheduleId)
      .catch((_) => null)
    if (schedule === null) {
      throw new Error('Schedule not found')
    }

    // 予定のスロットを確定 (他の仮予約のスロットを削除)
    schedule.confirmSlot(input.slotId)
    await this.scheduleRepository.save(schedule)

    // カレンダーに登録
    // TODO: 失敗した場合は?
    const calendar = await this.calendarRepository
      .findByUserId(input.currentUserId)
      .catch((_) => null)
    if (calendar === null) {
      throw new Error('Calendar not found')
    }
    calendar.addSchedule(schedule)
    await this.calendarRepository.save(calendar)

    return {}
  }
}
