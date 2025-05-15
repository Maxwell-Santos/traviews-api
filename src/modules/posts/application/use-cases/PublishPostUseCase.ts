import { PostRepository } from '../../../posts/domain/repositories/PostRepository'
import { MediaStorageFacade } from '../../domain/contracts/MediaStorateFacade'
import { PublishPostDTO } from '../../domain/dto/PublishPostDTO'
import { Post } from '../../domain/entities/Post'

export interface IFileToUpload {
  filePath: string
  pathToUpload: string
}
export class PublishPostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly mediaStorage: MediaStorageFacade,
  ) {}

  async execute(data: PublishPostDTO): Promise<{
    id: string
    filesToUpload: IFileToUpload[]
  }> {
    if (!data.userId) {
      throw new Error('User ID is required')
    }

    const post = new Post(data)

    const filesToUpload = await post.generateMediaUploadUrls(this.mediaStorage)

    const created = await this.postRepository.create(post)
    return { id: created.id, filesToUpload }
  }
}
