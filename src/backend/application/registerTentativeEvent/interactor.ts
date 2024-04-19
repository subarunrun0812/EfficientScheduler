import {
  IRegisterTentativeEventUseCase,
  RegisterTentativeEventInput,
  RegisterTentativeEventOutput,
} from '@/backend/application/registerTentativeEvent/types'
import { Event } from '@/backend/domain/model/event/event'
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'

export class RegisterTentativeEventInteractor
  implements IRegisterTentativeEventUseCase
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(
    input: RegisterTentativeEventInput,
  ): Promise<RegisterTentativeEventOutput> {
    const { userId, title, location, timeSlots } = input

    const event = new Event(userId, title, location, timeSlots, 'tentative')
    await this.eventRepository.save(event)

    return event
  }
}
