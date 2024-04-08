// どの期間の情報が欲しいのかを引数でもらう

import { Schedule } from "@/backend/domain/model/schedule/schedule"
import { IScheduleRepository } from "@/backend/domain/model/schedule/scheduleRepository"

// 期間の情報をもらう・置き場所を考える必要がある
export type DataSpan = {
    startDate: Date
    endDate: Date
}

export type GetAllScheduleUseCaseInput = {
    currentUserId: string
    startDate: Date
    endDate: Date
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
        // const tentativeSchedule = await this.internalScheduleRepository.findByUserId(input.currentUserId)
        // const confirmedSchedule = await this.externalScheduleRepository.findByUserId(input.currentUserId)
        const tentativeSchedule = await this.internalScheduleRepository.findByUserId(input.currentUserId, input.startDate, input.endDate)
        const confirmedSchedule = await this.externalScheduleRepository.findByUserId(input.currentUserId, input.startDate, input.endDate)
        return { confirmedSchedule, tentativeSchedule }
    }
}
