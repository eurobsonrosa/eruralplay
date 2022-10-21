import updateUserService from "../../services/user/updateUserService"

export default async (req, res) => {
    try {
        
        const userDB = await updateUserService(req.params._id, req.body.username, req.user)

        res.status(userDB.status).json(userDB)
    } catch (err) {
        res.status(err.status || 400).json(err.msg)
    }
}