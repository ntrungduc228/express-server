import * as redis from 'redis'

const redisClient = redis.createClient()

export const connectRedis = async () => {
  redisClient.on('error', (err) => console.log('Redis redisClient Error', err))
  await redisClient.connect()
}

export default redisClient
