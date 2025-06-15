import swaggerJsdoc from 'swagger-jsdoc'

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao@example.com"
 *         password:
 *           type: string
 *           example: "senhaSegura123!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T12:30:00Z"
 *
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "4dbf58c4-e938-4f3b-a447-c171609c76b5"
 *         token:
 *           type: string
 *           example: "eyJhbGciOi"
 *
 *     VisitCosts:
 *       type: object
 *       properties:
 *         food:
 *           type: number
 *           example: 50.5
 *         accommodation:
 *           type: number
 *           example: 120.0
 *         entertainment:
 *           type: number
 *           example: 30.0
 *
 *     UserInPost:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "user-123"
 *         name:
 *           type: string
 *           example: "Maria Oliveira"
 *
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "post-001"
 *         userId:
 *           type: string
 *           example: "user-123"
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         medias:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         description:
 *           type: string
 *           example: "Minha viagem incrível para o Rio de Janeiro!"
 *         visitCosts:
 *           $ref: '#/components/schemas/VisitCosts'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T12:00:00Z"
 *         User:
 *           $ref: '#/components/schemas/UserInPost'
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           example: ["user-234", "user-456"]
 *
 *     PostCreate:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: "user-123"
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         medias:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         description:
 *           type: string
 *           example: "Minha viagem incrível para o Rio de Janeiro!"
 *         visitCosts:
 *           $ref: '#/components/schemas/VisitCosts'
 *         User:
 *           $ref: '#/components/schemas/UserInPost'
 *
 *     PostPublishResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "post-001"
 *         filesToUpload:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               filePath:
 *                 type: string
 *                 example: "path/to/file.jpg"
 *               pathToUpload:
 *                 type: string
 *                 example: "https://storage.example.com/upload/path/to/file.jpg"
 */
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Traviews API',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
  },
  apis: [
    `${__dirname}/modules/**/interface/routes/*.ts`,
    `${__dirname}/modules/**/interface/routes/*.js`,
    `${__dirname}/index.ts`,
    `${__dirname}/index.js`,
    `${__dirname}/swagger.ts`,
    `${__dirname}/swagger.js`,
  ],
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec
