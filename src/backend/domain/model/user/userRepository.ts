import { User } from './user'

export interface IUserRepository {
  find(id: string): Promise<User | null>
  save(user: User): Promise<void>
  delete(user: User): Promise<void>
}
