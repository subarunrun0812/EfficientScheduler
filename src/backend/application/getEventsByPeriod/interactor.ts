import {
  GetEventsByPeriodInput,
  GetEventsByPeriodOutput,
  IGetEventsByPeriodUseCase,
} from '@/backend/application/getEventsByPeriod/types'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'
import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'

export class GetEventsByPeriodInteractor implements IGetEventsByPeriodUseCase {
  constructor(
    private readonly calendarRepository: ICalendarRepository,
    private readonly googleCalendarService: IGoogleCalendarService,
  ) {}

  async execute(
    input: GetEventsByPeriodInput,
  ): Promise<GetEventsByPeriodOutput> {
    const { userId, startDateTime, endDateTime } = input

    const userCalendar = await this.calendarRepository.findByUserId(userId)
    if (!userCalendar) {
      return { tentativeEvents: [], googleCalendarEvents: [] }
    }

    const tentativeEvents = userCalendar.getTentativeEventsByPeriod(
      startDateTime,
      endDateTime,
    )

    const googleCalendarEvents =
      await this.googleCalendarService.getEventsByPeriod(
        userId,
        startDateTime,
        endDateTime,
      )
    if (!googleCalendarEvents) {
      return { tentativeEvents, googleCalendarEvents: [] }
    }

    return { tentativeEvents, googleCalendarEvents }
  }
}
