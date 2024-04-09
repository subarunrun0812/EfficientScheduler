import { Event } from '@/backend/domain/model/event/event'

export type GetTentativeEventsInput = {
  userId: string
}

export type GetTentativeEventsOutput = Event[]

export interface IGetTentativeEventsUseCase {
  execute(input: GetTentativeEventsInput): Promise<GetTentativeEventsOutput>
}
