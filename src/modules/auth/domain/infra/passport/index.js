import passport from 'passport'
import './googleStrategy.js'

// require('./localStrategy')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

// const { findUserById } = require('../db/fakeUserStore')

passport.deserializeUser((user, done) => {
  // const user = findUserById(id)
  // done(null, user || { id }) // fallback para Google OAuth (sem salvar em memória)
  done(null, user)
})
