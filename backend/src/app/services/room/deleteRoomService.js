import RoomModel from "../../models/RoomModel";

export default async (id) => {
    try {
        const room = await RoomModel.findById(id)

        if (!room) {
            return { status: 400, msg: "Sala não encontrada." }
        }

        await room.delete()

        return {status: 200, msg: "Sala excluída com sucesso."}

    } catch (err) {
        return { status: 500, msg: err.msg }
    }
}