import { Event } from '../event/event'
import { Calendar } from './calendar'

export interface ICalendarRepository {
  save(calendar: Calendar): Promise<void>
  find(id: string): Promise<Calendar | null>
  findByUserId(userId: string): Promise<Calendar | null>
  delete(eventId: string): Promise<void>
}
