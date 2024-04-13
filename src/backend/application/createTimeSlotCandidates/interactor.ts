import {
  CreateTimeSlotCandidatesInput,
  CreateTimeSlotCandidatesOutput,
  ICreateTimeSlotCandidatesUseCase,
} from '@/backend/application/createTimeSlotCandidates/types'
import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'
import { SuggestTimeSlotsService } from '@/backend/domain/service/suggestTimeSlots/suggestTimeSlots'

export class CreateTimeSlotCandidatesInteractor
  implements ICreateTimeSlotCandidatesUseCase
{
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly googleCalendarService: IGoogleCalendarService,
    private readonly suggestionService: SuggestTimeSlotsService,
  ) {}

  async execute(
    input: CreateTimeSlotCandidatesInput,
  ): Promise<CreateTimeSlotCandidatesOutput> {
    const {
      userId,
      startDateTime,
      endDateTime,
      duration,
      bufferDuration,
      suggestionPeriod,
      maxSuggestions,
    } = input

    const userEvents = await this.eventRepository
      .findByUserId(userId)
      .catch((_) => undefined)
    if (!userEvents) {
      throw new Error('Failed to get user events')
    }

    const googleCalendarBusySlots = await this.googleCalendarService
      .getBusySlots(suggestionPeriod.startTime, suggestionPeriod.endTime)
      .catch((_) => undefined)
    if (!googleCalendarBusySlots) {
      return []
    }

    return this.suggestionService.suggestTimeSlots(
      userEvents.flatMap((e) => e.getTimeSlots()),
      googleCalendarBusySlots,
      { startTime: startDateTime, endTime: endDateTime },
      duration,
      bufferDuration,
      suggestionPeriod,
      maxSuggestions,
    )
  }
}
