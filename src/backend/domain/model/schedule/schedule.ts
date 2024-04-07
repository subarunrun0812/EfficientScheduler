import duration from "dayjs/plugin/duration";
import { ScheduleId } from "./schedule_id";
import { Place } from "./place";

export class Schedule {
  constructor(
    private readonly id: ScheduleId,
    private readonly title: string,
    private readonly startTime: Date,
    private readonly endTime: Date,
    private readonly place: Place,
    private readonly timeBuffer: duration.Duration
  ) {}
}
