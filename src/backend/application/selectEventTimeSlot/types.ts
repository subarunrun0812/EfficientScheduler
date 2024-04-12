export type SelectEventTimeSlotInput = {
  userId: string
  eventId: string
  timeSlotId: string
}

export type SelectEventTimeSlotOutput = void

export interface ISelectEventTimeSlotUseCase {
  execute(input: SelectEventTimeSlotInput): Promise<SelectEventTimeSlotOutput>
}
