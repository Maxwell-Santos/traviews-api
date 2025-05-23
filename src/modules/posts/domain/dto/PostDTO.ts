import { PublishPostDTO } from './PublishPostDTO'

export interface PostDTO extends PublishPostDTO {
  id: string
  likes: string[]
  User: { id: string; name: string }
  foodCost: number
  accommodationCost: number
  entertainmentCost: number
  createdAt?: string
  updatedAt?: string
}
