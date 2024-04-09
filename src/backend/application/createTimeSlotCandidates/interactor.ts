import {
  CreateTimeSlotCandidatesInput,
  CreateTimeSlotCandidatesOutput,
  ICreateTimeSlotCandidatesUseCase,
} from '@/backend/application/createTimeSlotCandidates/types'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'
import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'

export class CreateTimeSlotCandidatesInteractor
  implements ICreateTimeSlotCandidatesUseCase
{
  constructor(
    private readonly calendarRepository: ICalendarRepository,
    private readonly googleCalendarService: IGoogleCalendarService,
  ) {}

  async execute(
    input: CreateTimeSlotCandidatesInput,
  ): Promise<CreateTimeSlotCandidatesOutput> {
    const { userId, startDateTime, endDateTime, duration, bufferDuration } =
      input

    const userCalendar = await this.calendarRepository.findByUserId(userId)
    if (!userCalendar) {
      return []
    }

    const googleCalendarEvents =
      await this.googleCalendarService.getEventsByPeriod(
        userId,
        startDateTime,
        endDateTime,
      )
    if (!googleCalendarEvents) {
      return []
    }
    googleCalendarEvents.forEach((e) => userCalendar.addEvent(e))

    return userCalendar.getAvailableTimeSlots(
      startDateTime,
      endDateTime,
      duration,
      bufferDuration,
    )
  }
}
