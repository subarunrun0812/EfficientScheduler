import { Event } from './event'

export interface IEventRepository {
  find(id: string): Promise<Event | null>
  save(event: Event): Promise<void>
  delete(event: Event): Promise<void>
}
