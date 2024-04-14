'use server'

import { createClient } from '@/utils/supabase/server'
import { RegisterTentativeEventInput } from '@/backend/application/registerTentativeEvent/types'
import { RegisterTentativeEventInteractor } from '@/backend/application/registerTentativeEvent/interactor'
import { EventRepository } from '@/backend/infrastructure/dbPrismaSupabase/repository/eventRepository'
import { Location } from '@/backend/domain/model/event/location'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'

export const registerEvent = async (
  title: string,
  timeSlots: TimeSlot[],
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
    timeSlots: timeSlots,
  }
  const interactor = new RegisterTentativeEventInteractor(new EventRepository())
  await interactor.execute(input)
}
