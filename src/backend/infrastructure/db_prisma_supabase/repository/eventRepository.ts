// イベントIDから関連するtimeSlotを取得する
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { PrismaClient } from '@prisma/client'
import dayjs, { Dayjs } from 'dayjs'
import { Event, EventStatus } from '@/backend/domain/model/event/event'

export class EventRepository implements IEventRepository {
  private prisma = new PrismaClient()

  async find(id: string): Promise<Event | null> {
    const eventResponse = await this.prisma.event.findUnique({
      where: { id: id },
      include: {
        TimeSlot: true,
      },
    })
    if (!eventResponse) {
      return null
    }

    const timeSlots = eventResponse.TimeSlot.map(
      (ts) => new TimeSlot(dayjs(ts.startTime), dayjs(ts.endTime), ts.id),
    )
    return new Event(
      eventResponse.title,
      eventResponse.locationName,
      timeSlots,
      // Prisma の型定義が変なので, 頑張って変換してる
      // refs: https://github.com/prisma/prisma/issues/8446
      eventResponse.status.toLowerCase() as EventStatus,
      eventResponse.id,
    )
  }
}
