import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { Dayjs } from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'

interface AvailabilityTimeRange {
  startTime: Dayjs
  endTime: Dayjs
}

interface SuggestionPeriod {
  startTime: Dayjs
  endTime: Dayjs
}

export class SuggestTimeSlotsService {
  suggestTimeSlots(
    tentativeSlots: TimeSlot[],
    googleCalendarBusySlots: TimeSlot[],
    availabilityRange: AvailabilityTimeRange,
    duration: Duration,
    bufferDuration: Duration,
    suggestionPeriod: SuggestionPeriod,
    maxSuggestions: number,
  ): TimeSlot[] {
    // TODO: implement here

    const busySlots = [...tentativeSlots, ...googleCalendarBusySlots]
    const availableSlots: TimeSlot[] = []
    let currentDate = suggestionPeriod.startTime

    // suggestionPeriod内で、maxSuggestions個の候補を見つける
    while (
      currentDate.isBefore(suggestionPeriod.endTime) &&
      availableSlots.length < maxSuggestions
    ) {
      let currentStartTime = currentDate
        .set('hour', availabilityRange.startTime.hour())
        .set('minute', availabilityRange.startTime.minute())

      // availabilityRange内で、durationを超えない候補を見つける
      while (
        currentStartTime
          .add(duration)
          .add(bufferDuration)
          .isBefore(
            currentDate
              .set('hour', availabilityRange.endTime.hour())
              .set('minute', availabilityRange.endTime.minute()),
          )
      ) {
        const endTime = currentStartTime.add(duration)
        const slot: TimeSlot = new TimeSlot(currentStartTime, endTime)

        if (!isOverlapping(slot, busySlots)) {
          availableSlots.push(slot)
          if (availableSlots.length === maxSuggestions) {
            return availableSlots
          }
        }

        currentStartTime = endTime.add(duration)
      }

      currentDate = currentDate.add(1, 'day')
    }

    return availableSlots
  }
}

function isOverlapping(slot: TimeSlot, existingEvents: TimeSlot[]): boolean {
  return existingEvents.some(event => slot.overlaps(event))
}
