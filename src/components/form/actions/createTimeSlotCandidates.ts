'use server'

import { FormState } from '@/components/form/FormTemplate'
import { createClient } from '@/utils/supabase/server'
import { CreateTimeSlotCandidatesInput } from '@/backend/application/createTimeSlotCandidates/types'
import dayjs from 'dayjs'
import { CreateTimeSlotCandidatesInteractor } from '@/backend/application/createTimeSlotCandidates/interactor'
import { EventRepository } from '@/backend/infrastructure/dbPrismaSupabase/repository/eventRepository'
import { GoogleCalendarServiceFactory } from '@/backend/infrastructure/apiGoogleCalendar/factory'
import { SuggestTimeSlotsService } from '@/backend/domain/service/suggestTimeSlots/suggestTimeSlots'

export const createTimeSlotCandidates = async (state: FormState) => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('user not found')
  }

  const input: CreateTimeSlotCandidatesInput = {
    userId: user.id,
    startDateTime: dayjs(),
    endDateTime: dayjs(),
    duration: dayjs.duration(1),
    bufferDuration: dayjs.duration(1),
    suggestionPeriod: { startTime: dayjs(), endTime: dayjs() },
    maxSuggestions: 10,
  }
  const interactor = new CreateTimeSlotCandidatesInteractor(
    new EventRepository(),
    await new GoogleCalendarServiceFactory().create(),
    new SuggestTimeSlotsService(),
  )
  return await interactor.execute(input)
}
