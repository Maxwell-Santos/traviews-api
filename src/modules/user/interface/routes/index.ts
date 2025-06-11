import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authenticateJWT } from '../../../../shared/middlewares/authMiddleware'

const router = Router()
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', UserController.create)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obter perfil do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/me', authenticateJWT, (req, res, next) => {
  UserController.profile(req, res).catch(next)
})

export { router as userRoutes }
