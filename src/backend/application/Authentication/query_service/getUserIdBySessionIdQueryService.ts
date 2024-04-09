// セッションIDからユーザIDを取得するinterface

export interface IGetUserIdBySessionIdQueryService {
  execute(sessionId: string): Promise<string>
}
