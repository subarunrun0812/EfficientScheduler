import { v4 as uuidv4 } from 'uuid'
import { Event } from '@/backend/domain/model/event/event'

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

  getEvents(): readonly Event[] {
    return this.events
  }
}
