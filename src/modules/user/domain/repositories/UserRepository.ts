import { IUserRepository } from './IUserRepository'
import { IUser } from '../entities/IUser'

export class UserRepository implements IUserRepository {
  private users: IUser[] = []

  async findById(userId: string): Promise<IUser | null> {
    return this.users.find((u) => u.id === userId) || null
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((u) => u.email === email) || null
  }

  async update(user: IUser): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id)
    if (index === -1) {
      throw new Error('User not found.')
    }
    this.users[index] = user
  }

  async delete(userId: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === userId)
    if (index === -1) {
      throw new Error('User not found.')
    }
    this.users.splice(index, 1)
  }

  async create(user: IUser): Promise<void> {
    const existingUser = await this.findById(user.id)
    if (existingUser) {
      throw new Error('User already exists.')
    }
    this.users.push(user)
  }
}
