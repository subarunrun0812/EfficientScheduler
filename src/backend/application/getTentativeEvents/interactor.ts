import {
  GetTentativeEventsInput,
  GetTentativeEventsOutput,
  IGetTentativeEventsUseCase,
} from '@/backend/application/getTentativeEvents/types'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'

export class GetTentativeEventsInteractor
  implements IGetTentativeEventsUseCase
{
  constructor(private readonly calendarRepository: ICalendarRepository) {}

  async execute(
    input: GetTentativeEventsInput,
  ): Promise<GetTentativeEventsOutput> {
    const { userId } = input

    const userCalendar = await this.calendarRepository.findByUserId(userId)
    if (!userCalendar) {
      return []
    }

    return userCalendar.getTentativeEvents()
  }
}
