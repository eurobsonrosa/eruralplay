import UserModel from "../../models/UserModel";
import { encode } from 'jwt-simple'
import { compareSync } from 'bcrypt-nodejs'

export default async (username, password) => {
    try {
        const user = await UserModel.findOne({ username })
        if (!user)  throw 'Email ou senha inválido!!'

        const isMatch = compareSync(password, user.password)
        if (!isMatch) throw 'Email ou senha inválido!'

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user._id,
            username: user.username,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 5)
        }

        return {
            status: 200,
            user: {
                ...payload,
                token: encode(payload, process.env.AUTH_SECRET)
            }
        }
    } catch (err) {
        return { status: 400, msg: err }
    }
}