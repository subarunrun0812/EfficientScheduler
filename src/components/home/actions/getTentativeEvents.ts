'use server'

import { createClient } from '@/utils/supabase/server'
import { GetTentativeEventsInteractor } from '@/backend/application/getTentativeEvents/interactor'
import { EventRepository } from '@/backend/infrastructure/dbPrismaSupabase/repository/eventRepository'
import { Schedule } from '@/components/type/type'

export const getTentativeEvents = async (): Promise<Schedule[]> => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('user not found')
  }
  const userId = user.id

  const interactor = new GetTentativeEventsInteractor(new EventRepository())
  const res = await interactor.execute({ userId })

  return res.map(event => {
    return {
      id: event.id,
      title: event.title,
      date: 0, // TODO
    }
  })
}
