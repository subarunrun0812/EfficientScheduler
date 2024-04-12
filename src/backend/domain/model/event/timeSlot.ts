import dayjs, { Dayjs } from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import duration, { Duration } from 'dayjs/plugin/duration'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(duration)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export class TimeSlot {
  readonly id: string = uuidv4()

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
      this.endDateTime.isAfter(other.startDateTime)
    )
  }

  // 引数で渡された startDateTime, endDateTime の区間に含まれるか
  isWithin(startDateTime: Dayjs, endDateTime: Dayjs): boolean {
    return (
      this.startDateTime.isSameOrAfter(startDateTime) &&
      this.endDateTime.isSameOrBefore(endDateTime)
    )
  }

  equals(other: TimeSlot): boolean {
    return (
      this.startDateTime.isSame(other.startDateTime) &&
      this.endDateTime.isSame(other.endDateTime)
    )
  }
}
