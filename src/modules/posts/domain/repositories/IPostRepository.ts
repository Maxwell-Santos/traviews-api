import { IPost } from '../entities/IPost'

export interface IPostRepository {
  // findById(userId: string): Promise<IPost | null>
  // findAll(filter: IPost): Promise<IPost[]>
  getPosts(limit: number, cursor: string): Promise<IPost[]>
  create(user: IPost): Promise<{ id: string }>
  // update(user: IPost): Promise<void>
  // delete(userId: string): Promise<void>
}
