import updateRoomService from "../../services/room/updateRoomService";

export default async (req, res) => {
    try{
        const {name, description, imageUrl } = req.body
        const id = req. params.id
        const user = req.user

        const room = await updateRoomService(id, name, description, imageUrl, user)

        res.status(room.status).json(room)

    }catch(err){
        res.status(err.status || 400).json(err)
    }
}