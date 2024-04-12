import {
  IRegisterTentativeEventUseCase,
  RegisterTentativeEventInput,
  RegisterTentativeEventOutput,
} from '@/backend/application/registerTentativeEvent/types'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'
import { Event } from '@/backend/domain/model/event/event'

export class RegisterTentativeEventInteractor
  implements IRegisterTentativeEventUseCase
{
  constructor(private readonly calendarRepository: ICalendarRepository) {}

  async execute(
    input: RegisterTentativeEventInput,
  ): Promise<RegisterTentativeEventOutput> {
    const { userId, title, location, timeSlots } = input

    const userCalendar = await this.calendarRepository.findByUserId(userId)
    if (!userCalendar) {
      throw new Error('user not found')
    }

    const tentativeEvent = new Event(title, location, timeSlots, 'tentative')

    userCalendar.addEvent(tentativeEvent)

    await this.calendarRepository.save(userCalendar)

    return tentativeEvent
  }
}
