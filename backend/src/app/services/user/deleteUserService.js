import UserModel from "../../models/UserModel"

export default async (_id, user) => {
    try {
        const userDB = await UserModel.findById(_id)

        if (!userDB) {
            return { status: 400, msg: "Usuário não encontrado." }
        }

        if (user.id !== userDB._id && !user.admin) {
            return { status: 403, msg: "Usuário não tem permissão." }
        }

        await userDB.delete()

        return { status: 200, msg: "Usuário deletado com sucesso!" }

    } catch (err) {
        return { status: 500, msg: "Erro inesperado! Tente novamente mais tarde!" }
    }
}