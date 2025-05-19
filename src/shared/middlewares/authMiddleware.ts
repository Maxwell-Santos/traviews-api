// import { jwt } from 'jsonwebtoken'
import passport from 'passport'
import { User } from '../../modules/user/domain/entities/User'

export const authenticateJWT = passport.authenticate('jwt', { session: true })

// async function authMiddleware(req, res, next) {
//   const accessToken = req.headers.authorization?.split(' ')[1]

//   try {
//     const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
//     req.user = await User.findById(payload.id)
//     return next()
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       const refreshToken = req.cookies.refreshToken
//       if (!refreshToken) return res.sendStatus(401)

//       try {
//         const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
//         const newAccessToken = generateAccessToken({ _id: payload.id })

//         res.setHeader('x-access-token', newAccessToken) // ou setar no cookie
//         req.user = await User.findById(payload.id)
//         return next()
//       } catch {
//         return res.sendStatus(403) // refresh token inválido
//       }
//     }

//     return res.sendStatus(401)
//   }
// }
