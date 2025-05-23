export interface IVisitCosts {
  food: number
  accommodation: number
  entertainment: number
}

export interface IPost {
  id?: string
  userId: string
  date: string
  medias: string[]
  description: string
  visitCosts: IVisitCosts
  createdAt: string
  User: { id: string; name: string }
  likes: string[]
  like(userId: string): void
}
