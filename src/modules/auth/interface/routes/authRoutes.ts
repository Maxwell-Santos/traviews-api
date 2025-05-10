import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const router = Router()

router.get('/login', AuthController.login)

export { router as authRoutes }
