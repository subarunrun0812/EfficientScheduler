import { IGoogleCalendarServiceFactory } from '@/backend/domain/service/googleCalendar/factory'
import { IGoogleCalendarService } from '@/backend/domain/service/googleCalendar/googleCalendar'
import { createClient } from '@/utils/supabase/server'
import { GoogleCalendarService } from '@/backend/infrastructure/apiGoogleCalendar/googleCalendar'

export class GoogleCalendarServiceFactory
  implements IGoogleCalendarServiceFactory
{
  private readonly supabase = createClient()

  constructor() {}

  async create(): Promise<IGoogleCalendarService> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession()
    if (!session) {
      throw new Error('Session not found')
    }

    if (!session.provider_token) {
      throw new Error('Provider token not found')
    }

    return new GoogleCalendarService(session.provider_token)
  }
}
