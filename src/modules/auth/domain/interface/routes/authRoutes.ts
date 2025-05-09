import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    successRedirect: '/auth/success',
  }),
)

router.get('/success', (req, res) => {
  res.send(`Bem-vindo(a), ${req.user.displayName}!`)
})

// Falha
router.get('/failure', (req, res) => {
  res.send('Falha na autenticação.')
})

export { router as authRoutes }
