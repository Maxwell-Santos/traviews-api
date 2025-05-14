import { isValidDate, isValidISODateString } from '../../../../shared/utils/isValidDate'
import { IFileToUpload } from '../../application/use-cases/PublishPostUseCase'
import { MediaStorageFacade } from '../contracts/MediaStorateFacade'
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

  async generateMediaUploadUrls(mediaStorage: MediaStorageFacade): Promise<IFileToUpload[]> {
    const filesToUpload: IFileToUpload[] = []
    const publicUrls: string[] = []

    const filePath = (fileName: string) => this.userId + '/' + fileName

    for (const fileName of this.medias) {
      try {
        const signedUrl = await mediaStorage.generateSignedUploadUrl(filePath(fileName))
        filesToUpload.push({ filePath: filePath(fileName), pathToUpload: signedUrl.uploadUrl })

        publicUrls.push(mediaStorage.generatePublicUrl(filePath(fileName)))
      } catch (error) {
        console.error(`Falha ao gerar url para upload da imagem: ${filePath(fileName)}`)
      }
    }

    this.medias = publicUrls
    return filesToUpload
  }

  like() {}
  comment() {}
  edit() {}
  exclude() {}
}
