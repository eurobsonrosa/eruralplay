import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import UserModel from '../app/models/UserModel'

const params = {
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.id)
        if (!user) {
            return done(null, false, {msg: "Usuário não encontrado."})
        }

        return done(null, { ...payload })

    } catch (e) {
        return done(e)
    }
})

passport.use(strategy)

const authenticate = (req, res, next) => {

    passport.authenticate('jwt', (err, user, info) => {

        if (err) return next(err);
        if (!user) return res.status(401).json(info);
        req.user = user
        return next()

    })(req, res, next)
}

export default authenticate