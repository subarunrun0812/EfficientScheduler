import { IUserRepository } from '@/backend/domain/model/user/userRepository'
import { User } from '@/backend/domain/model/user/user'
import { PrismaClient } from '@prisma/client'

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async find(id: string): Promise<User | null> {
    const user_DB = await this.prisma.user_DB.findUnique({
      where: { user_id: id }, // 引数のidをuser_idとして検索条件に使用する
      select: {
        user_id: true,
        name: true,
      },
    })
    if (!user_DB) return null // ユーザーが見つからない場合は null を返す
    const user: User = {
      id: user_DB.user_id,
      name: user_DB.name,
    }
    return user // User オブジェクトを返す
  }

  async save(user: User): Promise<void> {
    try {
      await this.prisma.user_DB.create({
        data: {
          user_id: user.id,
          name: user.name,
          email: 'test@test', //user.email,
        },
      })
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  async delete(user: User): Promise<void> {
    try {
      await this.prisma.user_DB.delete({
        where: { user_id: user.id },
      })
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}
