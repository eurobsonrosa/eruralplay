import RoomModel from "../../models/RoomModel";

export default async (id, name, description, imageUrl, user) => {
    try {
        const room = await RoomModel.findById(id)

        if (!room) return { status: 400, msg: "Sala não encontrada." }

        if(user.username !== room.username){
            return {status: 403, msg: "Usuário não tem permissão."}
        }
        
        await room.update({ name, description, imageUrl })

        return {status: 200, msg: "Sala atualizada com sucesso."}

    } catch (err) {
        return { status: 500, msg: err.msg }
    }
}