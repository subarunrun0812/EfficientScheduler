import { Event } from '@/backend/domain/model/event/event'
import { Dayjs } from 'dayjs'

export interface IGoogleCalendarService {
  getEventsByPeriod(
    userId: string,
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<Event[] | null>
}
