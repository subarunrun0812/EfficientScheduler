import { Schedule } from '@/backend/domain/model/old/schedule/schedule'
import { ScheduleId } from '@/backend/domain/model/old/schedule/scheduleId'
import { IScheduleRepository } from '@/backend/domain/model/old/schedule/scheduleRepository'

export type GetScheduleDetailUseCaseInput = {
  scheduleId: ScheduleId
}

export type GetScheduleDetailUseCaseOutput = {
  schedule: Schedule
}

export class GetScheduleDetailUseCase {
  constructor(private readonly scheduleRepository: IScheduleRepository) {}

  async execute(
    input: GetScheduleDetailUseCaseInput,
  ): Promise<GetScheduleDetailUseCaseOutput> {
    const schedule = await this.scheduleRepository
      .find(input.scheduleId)
      .catch((_) => null)
    if (schedule === null) {
      throw new Error('Schedule not found')
    }
    return { schedule }
  }
}
