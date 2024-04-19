import {
  GetTentativeEventsInput,
  GetTentativeEventsOutput,
  IGetTentativeEventsUseCase,
} from '@/backend/application/getTentativeEvents/types'
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'

export class GetTentativeEventsInteractor
  implements IGetTentativeEventsUseCase
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(
    input: GetTentativeEventsInput,
  ): Promise<GetTentativeEventsOutput> {
    const { userId } = input

    const userEvents = await this.eventRepository
      .findByUserId(userId)
      .catch((e) => undefined)
    if (!userEvents) {
      throw new Error('User not found')
    }

    return userEvents.filter((event) => event.isTentative())
  }
}
