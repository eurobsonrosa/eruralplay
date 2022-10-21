import signinService from "../../services/auth/signinService"

export default async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await signinService(username, password)
        res.status(user.status).json(user)
    }
    catch (err) {
        res.status(err.status || 400).json(err)
    }
}