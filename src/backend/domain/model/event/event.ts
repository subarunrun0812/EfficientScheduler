import { v4 as uuidv4 } from 'uuid'
import { Location } from './location'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export type EventStatus = 'confirmed' | 'tentative'

export class Event {
  // イベントIDは引数で渡されなければ生成する形式に
  readonly id: string

  constructor(
    readonly title: string,
    readonly location: Location,
    private timeSlots: TimeSlot[],
    private status: EventStatus,
    id?: string,
  ) {
    if (id) this.id = id
    else this.id = uuidv4()
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

  selectTimeSlot(timeSlotId: string): void {
    if (this.isConfirmed()) {
      throw new Error('confirmed event cannot change time slot')
    }

    const timeSlot = this.findTimeSlot(timeSlotId)
    if (!timeSlot) {
      throw new Error('time slot not found')
    }

    this.timeSlots = [timeSlot]
  }
}
