import { Router } from 'express'
import { PostController } from '../controllers/PostsController'
import { authenticateJWT } from '../../../../shared/middlewares/authMiddleware'
import { SupabaseMediaStorageProvider } from '../../infra/supabase/SupabaseStorageProvider'
import supabase from '../../infra/supabase/client'

const router = Router()
const postController = new PostController(new SupabaseMediaStorageProvider(supabase))

router.get('/', authenticateJWT, (req, res, next) => {
  postController.read(req, res).catch(next)
})

router.post('/publish', authenticateJWT, (req, res, next) => {
  postController.create(req, res).catch(next)
})

router.post('/like/:postId', authenticateJWT, (req, res, next) => {
  postController.update(req, res).catch(next)
})

export { router as postsRoutes }
