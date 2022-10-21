import jwt from 'jwt-simple'

export default async (req, res) => {
    const userData = req.body || null
    try {
        if(userData) {
            const token = jwt.decode(userData.token, process.env.AUTH_SECRET)
            if(new Date(token.exp * 1000) > new Date()) {
                return res.send(true)
            }
        }
    } catch(e) {
        // problema com o token
    }
    res.send(false)
}