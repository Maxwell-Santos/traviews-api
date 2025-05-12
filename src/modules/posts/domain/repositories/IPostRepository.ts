import { IPost } from '../entities/IPost'

export interface IPostRepository {
  // findByEmail(email: string): Promise<IPost | null>
  // findById(userId: string): Promise<IPost | null>
  create(user: IPost): Promise<{ id: string }>
  // update(user: IPost): Promise<void>
  // delete(userId: string): Promise<void>
}
