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
    return []
  }
}
