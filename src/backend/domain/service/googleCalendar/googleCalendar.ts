import { Event } from '@/backend/domain/model/event/event'
import { Dayjs } from 'dayjs'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

// default calendar についてのみ読み書きする
export interface IGoogleCalendarService {
  getEventsByPeriod(
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<Event[] | undefined>
  getBusySlots(startDate: Dayjs, endDate: Dayjs): Promise<TimeSlot[]>
  createEvent(userId: string, event: Event): Promise<void>
  isTimeSlotAvailable(timeSlot: TimeSlot): Promise<boolean>
}
