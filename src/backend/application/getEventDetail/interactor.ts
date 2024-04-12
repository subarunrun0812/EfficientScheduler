import {
  GetEventDetailInput,
  GetEventDetailOutput,
  IGetEventDetailUseCase,
} from '@/backend/application/getEventDetail/types'
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'

export class GetEventDetailInteractor implements IGetEventDetailUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(input: GetEventDetailInput): Promise<GetEventDetailOutput> {
    const { eventId } = input

    const event = await this.eventRepository.find(eventId)
    if (!event) {
      throw new Error('event not found')
    }

    return event
  }
}
