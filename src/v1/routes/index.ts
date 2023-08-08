import express, { Router } from 'express'
import postRouter from './post.route'

const routes: Router = Router()

function initRoutesV1(app: express.Application) {
  routes.use('/posts', postRouter)

  app.use('/api/v1', routes)

  return app
}

export default initRoutesV1
