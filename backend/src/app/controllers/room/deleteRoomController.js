import deleteRoomService from "../../services/room/deleteRoomService";

export default async (req, res) => {
    try{
        const room = await deleteRoomService(req.params.id)

        res.status(room.status).json(room)

    }catch(err){
        res.status(err.status || 400).json(err)        
    }
}