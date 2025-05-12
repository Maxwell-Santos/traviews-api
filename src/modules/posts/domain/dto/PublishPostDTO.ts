import { IVisitCosts } from '../entities/IPost'

export interface PublishPostDTO {
  userId: string
  date: string
  medias: string[]
  description: string
  visitCosts: IVisitCosts
}
