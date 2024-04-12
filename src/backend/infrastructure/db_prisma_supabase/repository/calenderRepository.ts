import { Calendar } from '@/backend/domain/model/calendar/calendar'
import { ICalendarRepository } from '@/backend/domain/model/calendar/calendarRepository'
import { PrismaClient } from '@prisma/client'
import { Dayjs } from 'dayjs'
import { Event, EventStatus } from '@/backend/domain/model/event/event'
import { time } from 'console'

export class CalendarRepository implements ICalendarRepository {
  private prisma = new PrismaClient()

  // 仮予定をカレンダーに登録
  async save(calendar: Calendar): Promise<void> {
    try {
      await this.prisma.$transaction([
      this.prisma.event.create({
      data: {
        id: calendar.id,
        title: 'title',
        locationName: 'locationName',
        status: 'TENTATIVE',
        userId: calendar.userId,
        TimeSlot: {
          createMany: {
            data: [
              {
                id: 'id',
                startTime: Dayjs,
                endTime: Dayjs,
                eventId: 'eventId',
              },
            ],
          },
    }})])
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  // イベントIDからslotを検索
  // これいらないかも？
  // eventRepositoryにあるやつでいいかも
  async find(id: string): Promise<Calendar | null> {
    const eventResponse = await this.prisma.event.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        locationName: true,
        status: true,
        userId: true,
      },
    })
    if (!eventResponse) {
      return null
    }
    return new Event(
      eventResponse.id,
      eventResponse.title,
      eventResponse.locationName,
      eventResponse.status,
      eventResponse.userId,
    )
  }

  // ユーザーIDを元に仮予定を検索
  async findByUserId(userId: string): Promise<Calendar | null> {
    const eventResponse = await this.prisma.event.findMany({
      where: { userId: userId },
      select: {
        id: true,
        title: true,
        locationName: true,
        status: true,
      },
    })
    if (!eventResponse) {
      return null
    }
    return eventResponse.map(
    (event : { title: string, locationName: string, timeSlots: any, status: EventStatus, id: string }) =>
    new Event(
      event.title,
      event.locationName,
      null,
      event.status,
      event.id,
    ))
  }

  // カレンダーから削除
  async delete(eventId: string): Promise<void> {
    try {
      await this.prisma.event.delete({
        where: { id: eventId },
      })
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }
}
