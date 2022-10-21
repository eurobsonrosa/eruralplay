import listRoomsService from "../../services/room/listRoomsService";

export default async (req, res) => {
    try {
        const page = req.query.page || 1
        const rooms = await listRoomsService(page)
        res.status(rooms.status).json(rooms)
    } catch (err) {
        res.status(err.status).json(err)
    }
}