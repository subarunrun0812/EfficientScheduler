import { Dayjs } from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export type CreateTimeSlotCandidatesInput = {
  userId: string
  startDateTime: Dayjs
  endDateTime: Dayjs
  duration: Duration
  bufferDuration: Duration
  suggestionPeriod: { startTime: Dayjs; endTime: Dayjs }
  maxSuggestions: number
}

export type CreateTimeSlotCandidatesOutput = TimeSlot[]

export interface ICreateTimeSlotCandidatesUseCase {
  execute(
    input: CreateTimeSlotCandidatesInput,
  ): Promise<CreateTimeSlotCandidatesOutput>
}
