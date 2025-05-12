import { PublishPostDTO } from './PublishPostDTO'

export interface PostDTO extends PublishPostDTO {
  id: string
  createdAt: string
  updatedAt?: string
}
