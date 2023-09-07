import { Request, Response, NextFunction } from 'express'
import { STATUS, STATUS_CODE, successReponse } from './controller'
import axios from 'axios'
import redisClient from '../config/redis.config'
import postService from '../services/post.service'

const url = 'https://jsonplaceholder.typicode.com/posts/'

const DEFAULT_EXP = 3600

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await postService.getPosts()
    return successReponse(STATUS_CODE.OK, result, res)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await postService.createPost(req.body)
    return successReponse(STATUS_CODE.OK, result, res)
  } catch (error) {
    next(error)
  }
}

export const getPostsFromRedis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataCache = await redisClient.get('posts')
    if (dataCache) {
      console.log('dataChae ', dataCache)
      return successReponse(STATUS_CODE.OK, JSON.parse(dataCache), res)
    }
    const response = await axios.get(url)
    const result = response?.data
    redisClient.setEx('posts', DEFAULT_EXP, JSON.stringify(result))
    return successReponse(STATUS_CODE.OK, result, res)
  } catch (error) {
    next(error)
  }
}

export default { getPosts, getPostsFromRedis, createPost }
