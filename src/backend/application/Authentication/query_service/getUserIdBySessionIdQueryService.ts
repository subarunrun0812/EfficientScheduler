export interface IGetUserIdBySessionIdQueryService {
    execute(sessionId: string): Promise<string>
}