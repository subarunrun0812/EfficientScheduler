import { Schedule } from '@/backend/domain/model/old/schedule/schedule'

export interface IGetTentativeScheduleListQueryService {
  execute(userId: string): Promise<Schedule[]>
}
