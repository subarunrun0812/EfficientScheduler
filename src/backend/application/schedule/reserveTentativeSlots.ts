import { IdGenerator } from '@/backend/domain/common/idGenerator'
import { AvailableTime } from '@/backend/domain/model/old/calendar/availableTime'
import { Place } from '@/backend/domain/model/old/schedule/place'
import { Schedule } from '@/backend/domain/model/old/schedule/schedule'
import { ScheduleId } from '@/backend/domain/model/old/schedule/scheduleId'
import { IScheduleRepository } from '@/backend/domain/model/old/schedule/scheduleRepository'
import { ScheduleStatus } from '@/backend/domain/model/old/schedule/scheduleStatus'
import { TimeSlot } from '@/backend/domain/model/old/schedule/timeSlot'
import duration from 'dayjs/plugin/duration'

export type ReserveTentativeSlotsUseCaseInput = {
  // 登録された情報
  scheduleId: ScheduleId
  currentUserId: string
  title: string
  duration: duration.Duration
  place: Place
  availableTime: AvailableTime // TODO: availableTime も Schedule に含める?
  selectedSlots: TimeSlot[]
}

export type ReserveTentativeSlotsUseCaseOutput = {}

export class ReserveTentativeSlotsUseCase {
  constructor(
    private readonly scheduleRepository: IScheduleRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(
    input: ReserveTentativeSlotsUseCaseInput,
  ): Promise<ReserveTentativeSlotsUseCaseOutput> {
    // スロットを仮押さえし, 予定を登録する
    const schedule = new Schedule(
      new ScheduleId(this.idGenerator),
      input.currentUserId,
      input.title,
      input.duration,
      input.place,
      input.selectedSlots,
      ScheduleStatus.Tentative,
    )
    this.scheduleRepository.save(schedule)

    return {}
  }
}
