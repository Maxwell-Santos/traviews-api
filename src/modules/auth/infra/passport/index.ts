import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from '../../domain/services/AuthService'
import { UserRepository } from './../../../user/domain/repositories/UserRepository'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}

const userRepository = new UserRepository()

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await userRepository.findById(payload.sub)

      if (user) return done(null, user)
      return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  }),
)

passport.serializeUser((user, done) => {
  done(null, user)
})

// const { findUserById } = require('../db/fakeUserStore')

// passport.deserializeUser((user, done) => {
// const user = findUserById(id)
// done(null, user || { id }) // fallback para Google OAuth (sem salvar em memória)
//   done(null, user)
// })
