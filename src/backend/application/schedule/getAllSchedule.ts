// どの期間の情報が欲しいのかを引数でもらう

import { Schedule } from "@/backend/domain/model/schedule/schedule"
import { IScheduleRepository } from "@/backend/domain/model/schedule/scheduleRepository"

export type GetAllScheduleUseCaseInput = {
    currentUserId: string
}

// outputを確定の予定とtentative二つ返すといい感じになりそう
export type GetAllScheduleUseCaseOutput = {
  confirmedSchedule: Schedule[]
  tentativeSchedule: Schedule[]
}

// カレンダーの取得はどこから? repository? domain service?
// 「ドメインサービス 外部API」 とかで事例を調べる?
export class GetAllScheduleUseCase {
    // TODO: 命名再検討
    constructor (
        private readonly internalScheduleRepository: IScheduleRepository,
        private readonly externalScheduleRepository: IScheduleRepository,
    ) {}

    async execute(
        input: GetAllScheduleUseCaseInput
    ): Promise<GetAllScheduleUseCaseOutput> {
        const tentativeSchedule = await this.internalScheduleRepository.findByUserId(input.currentUserId)
        const confirmedSchedule = await this.externalScheduleRepository.findByUserId(input.currentUserId)
        return { confirmedSchedule, tentativeSchedule }
    }
}
