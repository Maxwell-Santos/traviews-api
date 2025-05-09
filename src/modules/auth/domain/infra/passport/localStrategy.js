import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
const bcrypt = require('bcrypt')

// const { findUserByEmail } = require('../db/fakeUserStore')

// passport.use(
//   new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//     const user = findUserByEmail(email)
//     if (!user) return done(null, false, { message: 'Usuário não encontrado' })

//     const match = await bcrypt.compare(password, user.password)
//     if (!match) return done(null, false, { message: 'Senha inválida' })

//     return done(null, user)
//   }),
// )
