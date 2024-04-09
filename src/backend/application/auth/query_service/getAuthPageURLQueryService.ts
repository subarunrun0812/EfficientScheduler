// 認証ページのURLを取得するinterface

export interface IGetAuthPageURLQueryService {
  execute(): Promise<string>
}
