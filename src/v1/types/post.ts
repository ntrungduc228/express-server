import { Base } from './base'

export type Post = {
  userId: number
  title: string
  body: string
} & Base
