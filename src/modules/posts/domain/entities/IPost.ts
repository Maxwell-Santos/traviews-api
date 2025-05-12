export interface IVisitCosts {
  food: number
  accommodation: number
  entertainment: number
}

export interface IPost {
  userId: string
  date: string
  medias: string[]
  description: string
  visitCosts: IVisitCosts
  createdAt: string
  like(): void
  comment(): void
  edit(): void
  exclude(): void
}
