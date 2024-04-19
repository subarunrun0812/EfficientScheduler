import { TimeSlot } from "@/backend/domain/model/event/timeSlot";
import { Dayjs } from "dayjs";
import { Duration } from "dayjs/plugin/duration";

interface AvailabilityTimeRange {
  startTime: Dayjs;
  endTime: Dayjs;
}

interface SuggestionPeriod {
  startTime: Dayjs;
  endTime: Dayjs;
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
    const busySlots = [...tentativeSlots, ...googleCalendarBusySlots];
    const suggestions: TimeSlot[] = [];
    let currentDate = suggestionPeriod.startTime;

    // suggestionPeriod内で、maxSuggestions個の候補を見つける
    while (
      currentDate.isBefore(suggestionPeriod.endTime) &&
      suggestions.length < maxSuggestions
    ) {
      let currentStartTime = currentDate
        .clone()
        .set("hour", availabilityRange.startTime.hour())
        .set("minute", availabilityRange.startTime.minute());
      const rangeEnd = currentStartTime
        .clone()
        .set("hour", availabilityRange.endTime.hour())
        .set("minute", availabilityRange.endTime.minute());

      // availabilityRange内で、durationを超えない候補を見つける
      while (
        currentStartTime.add(duration).add(bufferDuration).isBefore(rangeEnd)
      ) {
        const endTime = currentStartTime.clone().add(duration);
        const slot: TimeSlot = new TimeSlot(currentStartTime, endTime);

        if (!isOverlapping(slot, busySlots)) {
          if (suggestions.length === maxSuggestions) {
            break;
          }
          suggestions.push(slot);
        }

        currentStartTime = endTime.add(duration);
      }

      currentDate = currentDate.add(1, "day");
    }

    return suggestions;
  }
}

function isOverlapping(slot: TimeSlot, existingEvents: TimeSlot[]): boolean {
  return existingEvents.some((event) => slot.overlaps(event));
}
