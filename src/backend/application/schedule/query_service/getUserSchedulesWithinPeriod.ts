import { Schedule } from '@/backend/domain/model/old/schedule/schedule'

export interface IGetUserSchedulesWithinPeriodQueryService {
  execute(userId: string, startDate: Date, endDate: Date): Promise<Schedule[]>
}
