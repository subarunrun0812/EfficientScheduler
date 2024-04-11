import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'

export class CalendarRepository implements ICalendarRepository {
  async save(calendar: any): Promise<void> {
    // Save calendar
  }

  async find(id: string): Promise<any | null> {
    // Find calendar
    return null
  }

  async findByUserId(userId: string): Promise<any | null> {
    // Find calendar by user id
    return null
  }

  async delete(calendar: any): Promise<void> {
    // Delete calendar
  }
}
