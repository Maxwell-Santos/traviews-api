import { IUser } from '../entities/IUser'

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>
  findById(userId: string): Promise<IUser | null>
  create(user: IUser): Promise<void>
  update(user: IUser): Promise<void>
  delete(userId: string): Promise<void>
}
