import { IPost } from '../../domain/entities/IPost'
import { PostRepository } from '../../domain/repositories/PostRepository'

export class ListPostsUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly limit: number,
    private readonly cursor: string = '',
  ) {}

  async execute(): Promise<IPost[]> {
    const posts = await this.postRepository.getPosts(this.limit, this.cursor)
    return posts
  }
}
