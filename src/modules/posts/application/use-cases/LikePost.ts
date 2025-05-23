import { PostRepository } from '../../../posts/domain/repositories/PostRepository'
import { ILikePostDTO } from '../../domain/dto/LikePostDTO'
import { IPost } from '../../domain/entities/IPost'
import { Post } from '../../domain/entities/Post'

export class LikePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(data: ILikePostDTO): Promise<{ id: string }> {
    const postDTO = await this.postRepository.findById(data.id)

    const post: IPost = new Post({
      ...postDTO,
      visitCosts: {
        food: postDTO.foodCost,
        accommodation: postDTO.accommodationCost,
        entertainment: postDTO.entertainmentCost,
      },
    })
    post.like(data.userLikedId)

    return this.postRepository.update(post)
  }
}
