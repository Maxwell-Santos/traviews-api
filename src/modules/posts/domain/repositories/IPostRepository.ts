import { PostDTO } from '../dto/PostDTO'
import { IPost } from '../entities/IPost'

export interface IPostRepository {
  // findById(userId: string): Promise<IPost | null>
  // findAll(filter: IPost): Promise<IPost[]>
  getPosts(limit: number, cursor: string): Promise<PostDTO[]>
  create(user: PostDTO): Promise<{ id: string }>
  // update(user: IPost): Promise<void>
  // delete(userId: string): Promise<void>
}
