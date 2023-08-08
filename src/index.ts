import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { ENV_CONFIG } from './v1/utils/const'
import handleError from './v1/middlewares/handleError'
import initRoutesV1 from './v1/routes'
import { connectRedis } from './v1/config/redis.config'

const app = express()

app.use(express.json({ limit: '50kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(
  compression({
    threshold: 100 * 1000 // 100kB
  })
)

app.use(helmet())
app.use(cors({ origin: true, credentials: true })) // Enable All CORS Requests

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 1000,
  message: 'System is busy now !!!',
  legacyHeaders: false
})

app.use(limiter)

connectRedis()

initRoutesV1(app)
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Express Server:1.0')
})

app.use(handleError)
app.use('*', (req: express.Request, res: express.Response) => {
  return res.status(404).json({ status: 404, message: 'Bad Request' })
})

const port = ENV_CONFIG.PORT || 8000

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
