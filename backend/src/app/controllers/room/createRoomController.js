import createRoomService from "../../services/room/createRoomService";

export default async (req, res) => {
    try {
        const { videoUrl, imageUrl, name, description } = req.body
        //alter quando fizer validação de token
        const username = req.user.username

        const room = await createRoomService(videoUrl, imageUrl, name, description, username)
        res.status(room.status).json(room)
    } catch (err) {
        res.status(err.status).json(err)
    }
}