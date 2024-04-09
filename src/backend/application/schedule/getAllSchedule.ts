// どの期間の情報が欲しいのかを引数でもらう

import { Schedule } from '@/backend/domain/model/old/schedule/schedule'
import { IScheduleRepository } from '@/backend/domain/model/old/schedule/scheduleRepository'

export type GetAllScheduleUseCaseInput = {
  userId: string
  startDate: Date
  endDate: Date
}

// outputを確定の予定とtentative二つ返すといい感じになりそう
export type GetAllScheduleUseCaseOutput = {
  confirmedSchedule: Schedule[]
  tentativeSchedule: Schedule[]
}

export class GetAllScheduleUseCase {
  constructor(
    private readonly internalScheduleRepository: IScheduleRepository,
    private readonly externalScheduleRepository: IScheduleRepository,
  ) {}

  async execute(
    input: GetAllScheduleUseCaseInput,
  ): Promise<GetAllScheduleUseCaseOutput> {
    // const tentativeSchedule = await this.internalScheduleRepository.findByUserId(input.currentUserId)
    // const confirmedSchedule = await this.externalScheduleRepository.findByUserId(input.currentUserId)
    const tentativeSchedule =
      await this.internalScheduleRepository.findByUserId(
        input.userId,
        input.startDate,
        input.endDate,
      )
    const confirmedSchedule =
      await this.externalScheduleRepository.findByUserId(
        input.userId,
        input.startDate,
        input.endDate,
      )
    return { confirmedSchedule, tentativeSchedule }
  }
}
