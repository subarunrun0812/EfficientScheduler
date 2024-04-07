import duration from 'dayjs/plugin/duration'

export class TimeSlot {
  constructor(
    private readonly id: string,
    readonly startTime: Date,
    readonly endTime: Date,
    readonly timeBuffer: duration.Duration,
  ) {}
}
