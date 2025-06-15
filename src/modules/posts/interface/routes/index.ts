import { Router } from 'express'
import { PostController } from '../controllers/PostsController'
import { authenticateJWT } from '../../../../shared/middlewares/authMiddleware'
import { SupabaseMediaStorageProvider } from '../../infra/supabase/SupabaseStorageProvider'
import supabase from '../../infra/supabase/client'

const router = Router()
const postController = new PostController(new SupabaseMediaStorageProvider(supabase))

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obter as postagens
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Postagens retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', authenticateJWT, (req, res, next) => {
  postController.read(req, res).catch(next)
})

/**
 * @swagger
 * /posts/publish:
 *   post:
 *     summary: Criar postagem
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostPublishResponse'
 */
router.post('/publish', authenticateJWT, (req, res, next) => {
  postController.create(req, res).catch(next)
})

/**
 * @swagger
 * /posts/like/{postId}:
 *   post:
 *     summary: Curtir uma postagem
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da postagem a ser curtida
 *     responses:
 *       201:
 *         description: Postagem curtida com sucesso
 */
router.post('/like/:postId', authenticateJWT, (req, res, next) => {
  postController.update(req, res).catch(next)
})

export { router as postsRoutes }
