import { ScheduleId } from "../schedule/schedule_id";
import duration from "dayjs/plugin/duration";

export class TimeSlot {
  constructor(
    private readonly id: string,
    private readonly startTime: Date,
    private readonly endTime: Date,
    private readonly timeBuffer: duration.Duration
  ) {}
}
