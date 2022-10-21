import listRoomByIdService from "../../services/room/listRoomByIdService";

export default async (req, res) => {
    try {
        const rooms = await listRoomByIdService(req.params.id)
        res.status(rooms.status).json(rooms)
    } catch (err) {
        res.status(err.status).json(err)
    }
}