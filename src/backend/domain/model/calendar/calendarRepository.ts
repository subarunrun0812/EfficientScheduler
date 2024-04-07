import { Calendar } from "./calendar"

export interface ICalendarRepository {
    findByUserId(userId: string): Promise<Calendar>
}