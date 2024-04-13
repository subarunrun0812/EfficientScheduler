import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import { Dayjs } from 'dayjs'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { Event } from '@/backend/domain/model/event/event'

export class GoogleCalendarService implements IGoogleCalendarService {
  async getEventsByPeriod(
    userId: string,
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<Event[] | undefined> {
    return []
  }

  async getBusySlots(
    userId: string,
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<TimeSlot[]> {
    return []
  }

  async createEvent(userId: string, event: Event): Promise<void> {
    return
  }

  async isTimeSlotAvailable(
    userId: string,
    timeSlot: TimeSlot,
  ): Promise<boolean> {
    return false
  }
}
