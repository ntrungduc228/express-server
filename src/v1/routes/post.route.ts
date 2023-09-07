import { Router } from 'express'
import postController from '../controllers/post.controller'

const router: Router = Router()

router.get('/', postController.getPosts)
router.get('/redis', postController.getPostsFromRedis)
router.post('/', postController.createPost)

export default router
