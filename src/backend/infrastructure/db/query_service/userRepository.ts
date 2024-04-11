import { IUserRepository } from '@/backend/domain/model/user/userRepository'
import { User } from '@/backend/domain/model/user/user'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@/utils/supabase/server'

export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient()
  private supabase = createClient()

  async find(id: string): Promise<User | null> {
    const userResponse = await this.supabase.auth.getUser()
    const supabaseUser = userResponse.data.user
    if (!supabaseUser) {
      return null
    }

    const userName: string | undefined =
      supabaseUser.identities?.[0]?.identity_data?.name
    if (!userName) {
      return null
    }
    const user: User = {
      id: supabaseUser.id,
      name: userName,
    }
    return user
  }

  async save(user: User): Promise<void> {
    try {
      // TODO: Supabase のユーザー情報も更新する (現状 name の変更はしないため未対応)
      // do nothing for now
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  async delete(user: User): Promise<void> {
    try {
      // TODO: Supabase のユーザー情報も削除する
      this.prisma.user.delete({
        where: {
          id: user.id,
        },
      })
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}
