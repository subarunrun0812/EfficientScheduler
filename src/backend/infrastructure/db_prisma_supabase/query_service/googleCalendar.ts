import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import { Dayjs } from 'dayjs'
import { google } from 'googleapis'

// まだ実装していない
export class GoogleCalendarService implements IGoogleCalendarService {
  getEventsByPeriod(
    userId: string,
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<Event[] | null> {
    throw new Error('Method not implemented.')
  }

  createEvent(userId: string, event: Event): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
