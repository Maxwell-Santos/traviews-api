import passport from 'passport'
import './googleStrategy.js'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from '../../services/AuthService'
import { User } from '../../../../user/domain/entities/User.js'
import { createHash } from 'crypto'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // encontrar usuário
      // const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      console.log(payload)
      const hash = createHash('sha256')

      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'max@gmail.com',
        password: hash.update('123').digest('hex'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date(),
      }

      if (user) return done(null, user)
      return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  }),
)

// require('./localStrategy')

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user)
})

// const { findUserById } = require('../db/fakeUserStore')

// passport.deserializeUser((user, done) => {
// const user = findUserById(id)
// done(null, user || { id }) // fallback para Google OAuth (sem salvar em memória)
//   done(null, user)
// })
