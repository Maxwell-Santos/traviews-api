import { isValidDate, isValidISODateString } from '../../../../shared/utils/isValidDate'
import { PublishPostDTO } from '../dto/PublishPostDTO'
import { IPost, IVisitCosts } from './IPost'

export class Post implements IPost {
  userId: string
  date: string
  medias: string[]
  description: string
  visitCosts: IVisitCosts
  createdAt: string

  constructor(data: PublishPostDTO) {
    this.userId = data.userId.trim()
    this.medias = data.medias
    this.date = data.date.trim()
    this.description = data.description.trim()

    this.visitCosts = data.visitCosts
    this.createdAt = new Date().toISOString()
    this.validate()
  }

  private validate() {
    if (!this.date) {
      throw new Error('Date is required')
    }
    if (!isValidDate(this.date) || !isValidISODateString(this.date)) {
      throw new Error('Invalid date format')
    }
    if (!this.medias || this.medias.length === 0) {
      throw new Error('At least one media is required')
    }
    if (!this.description) {
      throw new Error('Description is required')
    }
    if (
      this.visitCosts.food < 0 ||
      this.visitCosts.accommodation < 0 ||
      this.visitCosts.entertainment < 0
    ) {
      throw new Error('Costs must be non-negative')
    }
  }

  like() {}
  comment() {}
  edit() {}
  exclude() {}
}
