import listUsersService from "../../services/user/listUsersService";

export default async (req, res) => {
    try {
        const page = req.query.page || 1
        
        const users = await listUsersService(page)

        res.status(users.status).json(users)

    } catch (err) {
        res.status(err.status || 400).json(err)
    }
}