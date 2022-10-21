import createUserService from "../../services/user/createUserService";

export default async (req, res) => {
    try {
        const { username, password} = req.body
        let { admin } = req.body
        
        if(!req.originalUrl.startsWith('/users')) admin = false
        if(!req.user || !req.user.admin) admin = false

        const user = await createUserService(username, password, admin)

        res.status(user.status).json(user)
    } catch (err) {
        res.status(err.status).json(err)
    }
}