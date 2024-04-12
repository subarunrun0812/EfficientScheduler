import { v4 as uuidv4 } from 'uuid'
import { Location } from './location'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export type EventStatus = 'confirmed' | 'tentative'

export class Event {
  constructor(
    readonly title: string,
    readonly location: string, // Location型(url)をstring型に変更
    private timeSlots: TimeSlot[],
    private status: EventStatus,
    readonly id: string = uuidv4(),
  ) {
    if (status === 'confirmed' && timeSlots.length !== 1) {
      throw new Error('confirmed event must have exactly one time slot')
    }
  }

  isTentative(): boolean {
    return this.status === 'tentative'
  }

  isConfirmed(): boolean {
    return this.status === 'confirmed'
  }

  getTimeSlots(): TimeSlot[] {
    return this.timeSlots
  }

  findTimeSlot(timeSlotId: string): TimeSlot | undefined {
    return this.timeSlots.find((ts) => ts.id === timeSlotId)
  }
}
