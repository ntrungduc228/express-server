import { Router } from 'express'
import postController from '../controllers/post.controller'

const router: Router = Router()

router.get('/', postController.getPosts)

export default router
