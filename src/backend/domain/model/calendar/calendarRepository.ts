import { Event } from '../event/event'
import { Calendar } from './calendar'

export interface ICalendarRepository {
  save(calendar: Calendar): Promise<void>
  find(id: string): Promise<Event | null>
  findByUserId(userId: string): Promise<Event[] | null>
  delete(eventId: string): Promise<void>
}
