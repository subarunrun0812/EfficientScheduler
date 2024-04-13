// イベントIDから関連するtimeSlotを取得する
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { EventStatus as DBEventStatus, PrismaClient } from '@prisma/client'
import dayjs, { Dayjs } from 'dayjs'
import { Event, EventStatus } from '@/backend/domain/model/event/event'
import { Location } from '@/backend/domain/model/event/location'

export class EventRepository implements IEventRepository {
  private prisma = new PrismaClient()

  // Prisma の型定義が変なので, 頑張って変換してる
  // refs: https://github.com/prisma/prisma/issues/8446
  private convertEventStatus(status: DBEventStatus): EventStatus {
    return status.toLowerCase() as EventStatus
  }

  async find(id: string): Promise<Event | undefined> {
    const eventResponse = await this.prisma.event.findUnique({
      where: { id: id },
      include: {
        TimeSlot: true,
      },
    })
    if (!eventResponse) {
      return undefined
    }

    const timeSlots = eventResponse.TimeSlot.map(
      (ts) => new TimeSlot(dayjs(ts.startTime), dayjs(ts.endTime), ts.id),
    )
    return new Event(
      eventResponse.userId,
      eventResponse.title,
      new Location(eventResponse.locationName),
      timeSlots,
      this.convertEventStatus(eventResponse.status),
      eventResponse.id,
    )
  }

  async save(event: Event): Promise<void> {}

  async delete(event: Event): Promise<void> {}

  async findByUserId(userId: string): Promise<Event[]> {
    return []
  }

  // 期間外のタイムスロットを除いたイベントの配列
  async findByUserIdAndPeriod(
    userId: string,
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<Event[]> {
    return []
  }
}
