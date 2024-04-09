import dayjs, { Dayjs } from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'

export class TimeSlot {
  constructor(
    readonly startDateTime: Dayjs,
    readonly endDateTime: Dayjs,
  ) {
    if (startDateTime.isAfter(endDateTime)) {
      throw new Error('startDateTime must be before endDateTime')
    }
  }

  get duration(): Duration {
    return dayjs.duration(this.endDateTime.diff(this.startDateTime))
  }

  overlaps(other: TimeSlot): boolean {
    return (
      this.startDateTime.isBefore(other.endDateTime) &&
      other.startDateTime.isBefore(this.endDateTime)
    )
  }

  equals(other: TimeSlot): boolean {
    return (
      this.startDateTime.isSame(other.startDateTime) &&
      this.endDateTime.isSame(other.endDateTime)
    )
  }
}
