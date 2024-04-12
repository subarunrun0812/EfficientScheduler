import {
  ISelectEventTimeSlotUseCase,
  SelectEventTimeSlotInput,
  SelectEventTimeSlotOutput,
} from '@/backend/application/selectEventTimeSlot/types'
import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'

export class SelectEventTimeSlotInteractor
  implements ISelectEventTimeSlotUseCase
{
  constructor(
    private readonly calendarRepository: ICalendarRepository,
    private readonly googleCalendarService: IGoogleCalendarService,
  ) {}

  // TODO: 外部カレンダーに対する重複チェックのロジックが, アプリケーション層に漏れているのが気になる
  async execute(
    input: SelectEventTimeSlotInput,
  ): Promise<SelectEventTimeSlotOutput> {
    const { userId, eventId, timeSlotId } = input

    const userCalendar = await this.calendarRepository.findByUserId(userId)
    if (!userCalendar) {
      throw new Error('calendar not found')
    }
    const event = userCalendar.getEvent(eventId)
    if (!event) {
      throw new Error('event not found')
    }
    const timeSlot = event.findTimeSlot(timeSlotId)
    if (!timeSlot) {
      throw new Error('time slot not found')
    }

    const duplicateGoogleCalendarEvent =
      await this.googleCalendarService.getEventsByPeriod(
        userId,
        timeSlot.startDateTime,
        timeSlot.endDateTime,
      )
    if (duplicateGoogleCalendarEvent) {
      throw new Error('time slot already booked')
    }

    // スロット確保可能
    event.selectTimeSlot(timeSlotId)
    await this.calendarRepository.save(userCalendar)

    // TODO: Google Calendar への登録

    return
  }
}
