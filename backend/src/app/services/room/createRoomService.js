import RoomModel from '../../models/RoomModel'

export default async (videoUrl, imageUrl, name, description, username) => {
    try {
        const room = await RoomModel.findOne({ name })
        if (room) {
            return { status: 400, msg: "Já existe uma sala com esse nome." }
        }
        await RoomModel.create({ videoUrl, imageUrl, name, description, username })
        return {status: 201, msg: "Sala criada com sucesso."}
    } catch (err) {
        return { status: 500, msg: err }
    }
}