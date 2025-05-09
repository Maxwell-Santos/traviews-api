import passport from 'passport'
import { GoogleStrategy } from 'passport-google-oauth20'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Aqui você pode salvar/verificar o usuário no banco
      console.log('Usuário autenticado pelo Google:', profile.displayName)
      return done(null, profile)
    },
  ),
)
