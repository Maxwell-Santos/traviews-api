import express from 'express'
import session from 'express-session'
import { userRoutes } from './modules/user/interface/routes'
import { authRoutes } from './modules/auth/interface/routes/authRoutes'
import passport from 'passport'
import './modules/auth/infra/passport'
import 'dotenv/config'
import { Database } from './shared/database/connection'
import { postsRoutes } from './modules/posts/interface/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger'

const app = express()
const PORT = 3000
const version = 'v1'
const secret = process.env.JWT_SECRET!

app.use(express.json())

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
)

app.use(passport.initialize())
app.use(passport.session())
app.set('trust proxy', true)

app.use((request, response, next) => {
  if (request.secure) {
    response.setHeader('X-Content-Type-Options', 'nosniff')
    response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  next()
})

app.use(`/api/${version}/auth`, authRoutes)
app.use(`/api/${version}/users`, userRoutes)
app.use(`/api/${version}/posts`, postsRoutes)
app.use(`/api/${version}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get(`/api/${version}`, (req, res) => {
  res.send(`
    <h1>Bem-vindo(a) ao TRAVIEWS API.</h1>
    <p>Para acessar a documentação, acesse <a href="/api/v1/docs">/api/v1/docs</a>.</p>
    `)
})

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}/api/${version}`)
})

async function ShutdownDatabase() {
  console.log('\nEncerrando conexões do pool...')
  await Database.getInstance().end()
  console.log('Conexões encerradas com sucesso.')
  process.exit(0)
}

process.on('SIGINT', ShutdownDatabase)
process.on('SIGTERM', ShutdownDatabase)
