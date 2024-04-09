import { Event } from './event'

// Event は集約ルートでないので, save は持たない
// 単体での書き込みを許すと一貫性が保てない
export interface IEventRepository {
  find(id: string): Promise<Event | null>
}
