import {
  ISelectEventTimeSlotUseCase,
  SelectEventTimeSlotInput,
  SelectEventTimeSlotOutput,
} from './types'
import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'

export class SelectEventTimeSlotInteractor
  implements ISelectEventTimeSlotUseCase
{
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly googleCalendarService: IGoogleCalendarService,
  ) {}

  async execute(
    input: SelectEventTimeSlotInput,
  ): Promise<SelectEventTimeSlotOutput> {
    const { userId, eventId, timeSlotId } = input

    // event 取得
    const event = await this.eventRepository
      .find(eventId)
      .catch((_) => undefined)
    if (!event) {
      throw new Error('event not found')
    }

    // event のタイムスロット取得
    const timeSlot = event.findTimeSlot(timeSlotId)
    if (!timeSlot) {
      throw new Error('time slot not found')
    }

    // google calendar の予定と衝突していないか確認
    const isTimeSlotAvailable = await this.googleCalendarService
      .isTimeSlotAvailable(userId, timeSlot)
      .catch((_) => false)
    if (!isTimeSlotAvailable) {
      throw new Error('time slot is not available')
    }

    // event のタイムスロットを1つに確定
    // google calendar に予定を登録
    event.confirmTimeSlot(timeSlotId)

    // TODO: 失敗した場合のロールバック
    await Promise.all([
      this.eventRepository.save(event),
      this.googleCalendarService.createEvent(userId, event),
    ])
  }
}
