import {
  GetEventsByPeriodInput,
  GetEventsByPeriodOutput,
  IGetEventsByPeriodUseCase,
} from '@/backend/application/getEventsByPeriod/types'
import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'

export class GetEventsByPeriodInteractor implements IGetEventsByPeriodUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly googleCalendarService: IGoogleCalendarService,
  ) {}

  async execute(
    input: GetEventsByPeriodInput,
  ): Promise<GetEventsByPeriodOutput> {
    const { userId, startDateTime, endDateTime } = input

    const userEvents = await this.eventRepository
      .findByUserIdAndPeriod(userId, startDateTime, endDateTime)
      .catch((e) => undefined)
    if (!userEvents) {
      throw new Error('Failed to get user events')
    }
    const tentativeUserEvents = userEvents.filter((e) => e.isTentative())

    const googleCalendarEvents =
      await this.googleCalendarService.getEventsByPeriod(
        startDateTime,
        endDateTime,
      )
    if (!googleCalendarEvents) {
      throw new Error('Failed to get google calendar events')
    }

    return {
      tentativeEvents: tentativeUserEvents,
      googleCalendarEvents,
    }
  }
}
