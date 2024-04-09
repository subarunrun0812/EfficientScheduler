import { v4 as uuidv4 } from 'uuid'
import { Event } from '@/backend/domain/model/event/event'
import { Dayjs } from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export class Calendar {
  readonly id: string = uuidv4()
  private events: Event[] = []

  constructor(readonly userId: string) {}

  addEvent(event: Event): void {
    this.events.push(event)
  }

  removeEvent(eventId: string): void {
    this.events = this.events.filter((event) => event.id !== eventId)
  }

  getAvailableTimeSlots(
    startDateTime: Dayjs,
    endDateTime: Dayjs,
    duration: Duration,
    bufferDuration: Duration,
  ): TimeSlot[] {
    return []
  }

  getTentativeEvents(): Event[] {
    return this.events.filter((event) => event.getStatus() == 'tentative')
  }
}
