import { Dayjs } from 'dayjs'
import { Event } from './event'

export interface IEventRepository {
  find(id: string): Promise<Event | undefined>
  save(event: Event): Promise<void>
  delete(event: Event): Promise<void>
  findByUserId(userId: string): Promise<Event[]>
  // 期間外のタイムスロットを除いたイベントの配列
  findByUserIdAndPeriod(
    userId: string,
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<Event[]>
}
