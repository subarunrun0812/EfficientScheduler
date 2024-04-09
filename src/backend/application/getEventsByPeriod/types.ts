import { Dayjs } from 'dayjs'
import { Event } from '@/backend/domain/model/event/event'

export type GetEventsByPeriodInput = {
  userId: string
  startDateTime: Dayjs
  endDateTime: Dayjs
}

export type GetEventsByPeriodOutput = {
  tentativeEvents: Event[]
  googleCalendarEvents: Event[]
}

export interface IGetEventsByPeriodUseCase {
  execute(input: GetEventsByPeriodInput): Promise<GetEventsByPeriodOutput>
}
