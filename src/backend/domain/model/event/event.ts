import { v4 as uuidv4 } from 'uuid'
import { Location } from './location'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export type EventStatus = 'confirmed' | 'tentative'

export class Event {
  constructor(
    readonly userId: string,
    readonly title: string,
    readonly location: Location,
    private timeSlots: TimeSlot[],
    private status: EventStatus,
    readonly id: string = uuidv4(),
  ) {
    if (status === 'confirmed' && timeSlots.length !== 1) {
      throw new Error('confirmed event must have exactly one time slot')
    }
  }

  getStatus(): EventStatus {
    return this.status
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

  // 指定したタイムスロットに確定する
  confirmTimeSlot(timeSlotId: string): void {
    if (this.status === 'confirmed') {
      throw new Error('event is already confirmed')
    }

    const timeSlot = this.findTimeSlot(timeSlotId)
    if (!timeSlot) {
      throw new Error('time slot not found')
    }

    this.timeSlots = [timeSlot]
    this.status = 'confirmed'
  }
}
