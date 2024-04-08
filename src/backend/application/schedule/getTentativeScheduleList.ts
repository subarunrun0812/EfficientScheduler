// 仮予定一覧の取得(トップページ左)
import { Schedule } from "@/backend/domain/model/schedule/schedule"
import { IGetTentativeScheduleListQueryService } from "./query_service/getTentativeScheduleList"

// ユーザー情報をもらう
export type GetTentativeScheduleListUseCaseInput = {
    currentUserId: string, //　TODO: classにする?
}

// 仮予定の配列が返される
export type GetTentativeScheduleListUseCaseOutput = {
  schedules: Schedule[]
}

export class GetTentativeScheduleListUseCase {
  constructor(
    private readonly tentativeScheduleQueryService : IGetTentativeScheduleListQueryService,
  ) {}

  async execute(
    input: GetTentativeScheduleListUseCaseInput
  ): Promise<GetTentativeScheduleListUseCaseOutput> {
    //userIdが存在しない場合は今回は考えない？
    const schedules = await this.tentativeScheduleQueryService.execute(input.currentUserId)
    return { schedules }
  }
}