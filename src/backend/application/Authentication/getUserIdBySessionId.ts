// セッションIDからユーザIDを取得するユースケース

import { IGetUserIdBySessionIdQueryService } from './query_service/getUserIdBySessionIdQueryService'

export type GetUserIdBySessionIdUseCaseInput = {
  sessionId: string
}

export type GetUserIdBySessionIdUseCaseOutput = {
  userId: string // TODO: クラスにするかも
}

export class GetUserIdBySessionIdUseCase {
  constructor(
    private readonly getUserIdBySessionIdQueryService: IGetUserIdBySessionIdQueryService,
  ) {}

  public async execute(sessionId: string): Promise<string> {
    const userId =
      await this.getUserIdBySessionIdQueryService.execute(sessionId)
    if (!userId) {
      throw new Error('Session not found')
    }
    return userId
  }
}
