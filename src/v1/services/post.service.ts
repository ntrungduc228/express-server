import { prisma } from '../../../prisma/prisma-client'
import { Post } from '../types/post'

export const getPosts = async () => {
  const posts = await prisma.post.findMany()
  return {
    data: posts,
    total: posts.length
  }
}

export const createPost = async (data: Post) => {
  const post = await prisma.post.create({
    data: data
  })

  return post
}

export default { getPosts, createPost }
