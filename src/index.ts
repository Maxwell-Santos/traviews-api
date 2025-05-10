import express from 'express'
import session from 'express-session'
import { userRoutes } from './modules/user/interface/routes'
import { authRoutes } from './modules/auth/interface/routes/authRoutes'
import passport from 'passport'
import './modules/auth/domain/infra/passport'

const app = express()
const PORT = 3000
const version = 'v1'

app.use(express.json())

app.use(
  session({
    secret: 'secrete',
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

app.get(`api/${version}`, (req, res) => {
  res.send('Bem-vindo(a) ao TRAVIEWS API.')
})

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`)
})
