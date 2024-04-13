import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import dayjs, { Dayjs } from 'dayjs'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { Event } from '@/backend/domain/model/event/event'
import { google } from 'googleapis'

export class GoogleCalendarService implements IGoogleCalendarService {
  private readonly calendar: ReturnType<typeof google.calendar>
  private calendarIds: string[] | undefined = undefined

  constructor(accessToken: string) {
    const oauth = new google.auth.OAuth2()
    oauth.setCredentials({ access_token: accessToken })

    this.calendar = google.calendar({
      version: 'v3',
      auth: oauth,
    })
  }

  private async getCalendarIds(): Promise<string[]> {
    if (this.calendarIds) {
      return this.calendarIds
    }

    const res = await this.calendar.calendarList.list()
    this.calendarIds =
      res.data.items
        ?.map((item) => item.id)
        .filter((id): id is string => id != null) ?? []
    return this.calendarIds
  }

  async getEventsByPeriod(
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
  ): Promise<Event[] | undefined> {
    return []
  }

  async getBusySlots(
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
  ): Promise<TimeSlot[]> {
    const ids = await this.getCalendarIds()
    const busySlotsResponce = await this.calendar.freebusy.query({
      requestBody: {
        items: ids.map((id) => ({ id })),
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: 'JST',
      },
    })
    const calendars = busySlotsResponce.data.calendars
    if (!calendars) {
      return []
    }

    return ids.flatMap((id) => {
      const busy = calendars[id]?.busy ?? []
      return busy.map(
        (slot): TimeSlot => new TimeSlot(dayjs(slot.start), dayjs(slot.end)),
      )
    })
  }

  async createEvent(userId: string, event: Event): Promise<void> {
    return
  }

  async isTimeSlotAvailable(timeSlot: TimeSlot): Promise<boolean> {
    return false
  }
}
