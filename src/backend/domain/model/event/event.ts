import { v4 as uuidv4 } from 'uuid'
import { Location } from './location'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export type EventStatus = 'confirmed' | 'tentative' | 'cancelled'

export class Event {
  readonly id: string = uuidv4()

  constructor(
    readonly title: string,
    readonly location: Location,
    private timeSlots: TimeSlot[],
    private status: EventStatus,
  ) {
    if (status === 'confirmed' && timeSlots.length !== 1) {
      throw new Error('confirmed event must have exactly one time slot')
    }
  }

  getStatus(): EventStatus {
    return this.status
  }

  getTimeSlots(): TimeSlot[] {
    return this.timeSlots
  }
}
