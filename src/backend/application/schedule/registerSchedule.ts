type RegisterScheduleInput = void

type RegisterScheduleOutput = void

export class RegisterScheduleUseCase {
  constructor(
    private readonly calendarRepository: ICalendarRepository,
    private readonly scheduleRepository: IScheduleRepository,
  ) {}

  async execute(request: RegisterScheduleInput): Promise<void> {
    const calendar = await this.calendarRepository.findByUserId(request.userId)
    if (!calendar) {
      throw new Error('Calendar not found')
    }
    const scheduleId = new ScheduleId()
    const schedule = new Schedule(
      scheduleId,
      request.userId,
      request.availableTime,
      ScheduleStatus.Tentative,
    )
    await this.scheduleRepository.save(schedule)
  }
}
