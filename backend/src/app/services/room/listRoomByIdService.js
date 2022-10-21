import RoomModel from '../../models/RoomModel'

export default async (id) => {
    try {
        const room = await RoomModel.findById(id)
        if (!room) {
            return { status: 400, msg: "Sala não encontrada" }
        }
        return { status: 200, room }

    } catch (err) {
        return { status: 500, msg: err }
    }
}