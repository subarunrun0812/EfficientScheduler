import { Location } from '@/backend/domain/model/event/location'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import { Event } from '@/backend/domain/model/event/event'

// TODO: ドメインモデルをそのまま使うかは再検討
export type RegisterTentativeEventInput = {
  userId: string
  title: string
  location: Location
  timeSlots: TimeSlot[]
}

export type RegisterTentativeEventOutput = Event

export interface IRegisterTentativeEventUseCase {
  execute(
    input: RegisterTentativeEventInput,
  ): Promise<RegisterTentativeEventOutput>
}
