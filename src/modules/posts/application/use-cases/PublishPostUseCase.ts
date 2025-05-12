import { PostRepository } from '../../../posts/domain/repositories/PostRepository'
import { PublishPostDTO } from '../../domain/dto/PublishPostDTO'
import { Post } from '../../domain/entities/Post'

export class PublishPostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(data: PublishPostDTO): Promise<{ id: string }> {
    if (!data.userId) {
      throw new Error('User ID is required')
    }

    const post = new Post(data)

    const created = await this.postRepository.create(post)
    return { id: created.id }
  }
}
