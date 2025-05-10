import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authenticateJWT } from '../../../../shared/middlewares/authMiddleware'

const router = Router()

router.post('/', UserController.create)

router.get('/me', authenticateJWT, (req, res, next) => {
  UserController.profile(req, res).catch(next)
})

export { router as userRoutes }
