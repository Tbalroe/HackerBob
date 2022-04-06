export interface Story {
  by: string
  descendants: number
  id: number
  kids?: number[]
  time: number
  type: string
  title: string
  url: string
  score: number
}

export interface Author {
  about?: string
  created: number
  id: string
  karma: number
  submitted: number[]
}

export interface CardDetail {
  title: string
  url: string
  timestamp: number
  score: number
  authorId: string
  authorKarma?: number
  weCool?: boolean
}
