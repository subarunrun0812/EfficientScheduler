import { Event } from '@/backend/domain/model/event/event'

export type GetEventDetailInput = {
  eventId: string
}

export type GetEventDetailOutput = Event

export interface IGetEventDetailUseCase {
  execute(input: GetEventDetailInput): Promise<GetEventDetailOutput>
}
