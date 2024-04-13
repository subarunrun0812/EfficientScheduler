import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import dayjs from 'dayjs'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { Event } from '@/backend/domain/model/event/event'
import { calendar_v3, google } from 'googleapis'
import { Location } from '@/backend/domain/model/event/location'

export class GoogleCalendarService implements IGoogleCalendarService {
  private readonly calendar: ReturnType<typeof google.calendar>
  private calendarIds: string[] | undefined = undefined

  constructor(
    accessToken: string,
    private readonly userId: string,
  ) {
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
    const items = res.data.items ?? []
    this.calendarIds =
      items.map(item => item.id).filter((id): id is string => id != null) ?? []
    return this.calendarIds
  }

  async getEventsByPeriod(
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
  ): Promise<Event[] | undefined> {
    const ids = await this.getCalendarIds()
    let calendarEventsMap = new Map<string, calendar_v3.Schema$Events>()
    await Promise.all(
      // string[] が () => Promise<void> にmapされる
      ids.map(async id => {
        const res = await this.calendar.events.list({
          calendarId: id,
          timeMin: startDate.toISOString(),
          timeMax: endDate.toISOString(),
        })
        calendarEventsMap.set(id, res.data)
      }),
    )

    return ids.flatMap(id => {
      const calendarEvents = calendarEventsMap.get(id)?.items ?? []
      return calendarEvents.map(res => {
        const startDateTime = dayjs(res.start!.dateTime)
        const endDateTime = dayjs(res.end!.dateTime)
        return new Event(
          this.userId,
          res.summary!,
          new Location(res.location!),
          [new TimeSlot(startDateTime, endDateTime)],
          'confirmed',
          res.id!,
        )
      })
    })
  }

  async getBusySlots(
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
  ): Promise<TimeSlot[]> {
    const ids = await this.getCalendarIds()
    const busySlotsResponce = await this.calendar.freebusy.query({
      requestBody: {
        items: ids.map(id => ({ id })),
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: 'JST',
      },
    })
    const calendars = busySlotsResponce.data.calendars
    if (!calendars) {
      return []
    }

    return ids.flatMap(id => {
      const busy = calendars[id]?.busy ?? []
      return busy.map(slot => new TimeSlot(dayjs(slot.start), dayjs(slot.end)))
    })
  }

  // event を Google Calendar に登録する
  async createEvent(event: Event): Promise<void> {
    if (!event.isConfirmed()) {
      throw new Error('Event is not confirmed')
    }

    const timeSlot = event.getTimeSlots()[0]
    await this.calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.title,
        start: {
          dateTime: timeSlot.startDateTime.toISOString(),
        },
        end: {
          dateTime: timeSlot.endDateTime.toISOString(),
        },
      },
    })
  }

  async isTimeSlotAvailable(timeSlot: TimeSlot): Promise<boolean> {
    return false
  }
}
