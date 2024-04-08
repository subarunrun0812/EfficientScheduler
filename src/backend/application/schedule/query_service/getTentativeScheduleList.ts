import { Schedule } from "@/backend/domain/model/schedule/schedule";

export interface IGetTentativeScheduleListQueryService {
    execute(userId: string): Promise<Schedule[]>
}