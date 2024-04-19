import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'

export interface IGoogleCalendarServiceFactory {
  create(): Promise<IGoogleCalendarService>;
}
