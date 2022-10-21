import deleteUserService from "../../services/user/deleteUserService";

export default async (req, res) => {
    try {      
        const userDB = await deleteUserService(req.params._id, req.user)

        res.status(userDB.status).json(userDB)

    } catch (err) {
        res.status(err.status || 400).json(err)
    }
}