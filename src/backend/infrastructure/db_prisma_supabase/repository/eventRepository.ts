// イベントIDから関連するtimeSlotを取得する
import { IEventRepository } from '@/backend/domain/model/event/eventRepository'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { PrismaClient } from '@prisma/client'
import { Dayjs } from 'dayjs'
import { Event } from '@/backend/domain/model/event/event'

export class EventRepository implements IEventRepository {
  private prisma = new PrismaClient()

  async find(id: string): Promise<Event | null> {
    const eventResponse = await this.prisma.event.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        locationName: true,
        status: true,
        userId: true,
        TimeSlot: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            eventId: true,
          },
        },
      },
    })
    if (!eventResponse) {
      return null
    }
    const timeSlots = eventResponse.TimeSlot.map(
      (timeSlot: { startTime: Dayjs; endTime: Dayjs; id: string }) =>
        new TimeSlot(timeSlot.startTime, timeSlot.endTime, timeSlot.id),
    )
    return new Event(
      eventResponse.title,
      eventResponse.locationName,
      timeSlots,
      eventResponse.status,
      eventResponse.id,
    )
  }
}
