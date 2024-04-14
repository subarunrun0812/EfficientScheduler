'use server'

import { createClient } from '@/utils/supabase/server'
import { RegisterTentativeEventInput } from '@/backend/application/registerTentativeEvent/types'
import { RegisterTentativeEventInteractor } from '@/backend/application/registerTentativeEvent/interactor'
import { EventRepository } from '@/backend/infrastructure/dbPrismaSupabase/repository/eventRepository'
import { Location } from '@/backend/domain/model/event/location'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import dayjs from 'dayjs'

export type TimeSlotData = {
  id: string
  startDate: string
  endDate: string
}

export const registerEvent = async (
  title: string,
  timeSlots: TimeSlotData[],
  location?: string,
) => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('user not found')
  }

  const input: RegisterTentativeEventInput = {
    userId: user.id,
    title: title,
    location: new Location(location ?? ''),
    timeSlots: timeSlots.map((ts): TimeSlot => {
      return new TimeSlot(dayjs(ts.startDate), dayjs(ts.endDate), ts.id)
    }),
  }
  const interactor = new RegisterTentativeEventInteractor(new EventRepository())
  await interactor.execute(input)
}
