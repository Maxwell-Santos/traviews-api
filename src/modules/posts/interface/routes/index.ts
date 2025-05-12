import { Router } from 'express'
import { PostController } from '../controllers/PostsController'
import { authenticateJWT } from '../../../../shared/middlewares/authMiddleware'

const router = Router()

router.post('/publish', authenticateJWT, (req, res, next) => {
  PostController.create(req, res).catch(next)
})

export { router as postsRoutes }
