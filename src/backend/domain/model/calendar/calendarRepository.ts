import { Calendar } from './calendar'

export interface ICalendarRepository {
  save(calendar: Calendar): Promise<void>
  find(id: string): Promise<Calendar | null>
  delete(calendar: Calendar): Promise<void>
}
