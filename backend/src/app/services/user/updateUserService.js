import UserModel from "../../models/UserModel";

export default async (_id, username, user) => {
    try {
        const userDB = await UserModel.findById(_id)

        if (!userDB) {
            return { status: 400, msg: "Usuário não encontrado." }
        }

        if (user.id !== userDB._id && !user.admin) {
            return { status: 403, msg: "Usuário não tem permissão." }
        }

        const findUsername = await UserModel.findOne({ username })

        if(findUsername){
            return { status: 400, msg: "Nome de usuário já está em uso." }
        }

        await userDB.update({ username })

        return { status: 200, msg: "Usuário deletado com sucesso!" }

    } catch (err) {
        return { status: 500, msg: err }
    }
}