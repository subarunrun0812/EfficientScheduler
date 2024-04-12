import { IUserRepository } from '@/backend/domain/model/user/userRepository'
import { User } from '@/backend/domain/model/user/user'
import { PrismaClient } from '@prisma/client'
import { createClient } from '@/utils/supabase/server'
import { transferableAbortController } from 'util'

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
      const userResponse = await this.supabase.auth.getUser()
      //　ユーザーが存在した場合は何もしない
      if (userResponse.data.user) {
        console.log('User already exists')
        return
      }
      //ユーザーの登録
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) {
        console.error('Error signing in with Google:', error)
      } else if (!data) {
        console.error('No data received from Google')
      } else {
        await this.prisma.user.create({
          data: {
            id: user.id,
          },
        })
      }
      return
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  async delete(user: User): Promise<void> {
    const userResponse = await this.supabase.auth.getUser()
    //　ユーザーが存在した場合は何もしない
    if (!userResponse) {
      console.log('User does not exist')
      return
    }
    try {
      // TODO: Supabase のユーザー情報も削除する
      await this.prisma.$transaction([
        this.prisma.user.delete({
          where: {
            id: user.id,
          },
        }),
        this.supabase.auth.signOut(),
      ])
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}
