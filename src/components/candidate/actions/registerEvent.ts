'use server'

import { CandidateSchedule } from '@/components/candidate/CandidateSchedulesTemplate'
import { createClient } from '@/utils/supabase/server'
import { Location } from '@/backend/domain/model/event/location'
import { RegisterTentativeEventInput } from '@/backend/application/registerTentativeEvent/types'
import { RegisterTentativeEventInteractor } from '@/backend/application/registerTentativeEvent/interactor'
import { EventRepository } from '@/backend/infrastructure/dbPrismaSupabase/repository/eventRepository'
import dayjs from 'dayjs'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export const registerEvent = async (schedule: CandidateSchedule) => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('user not found')
  }

  const input: RegisterTentativeEventInput = {
    userId: user.id,
    title: schedule.title,
    location: new Location('魔界'),
    timeSlots: [
      new TimeSlot(dayjs('2022-01-01T09:00:00'), dayjs('2022-01-01T10:00:00')),
    ],
  }
  const interactor = new RegisterTentativeEventInteractor(new EventRepository())
  await interactor.execute(input)
}
