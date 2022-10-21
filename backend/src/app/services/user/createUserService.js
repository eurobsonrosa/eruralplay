import UserModel from "../../models/UserModel"
import encryptPassword from "../../../utils/encryptPassword"

export default async (username, password, admin) => {
    try {
        const user = await UserModel.findOne({ username })
        
        if (user) {
            return { status: 400, msg: "Nome de usuário já existe." }
        }
        password = encryptPassword(password)
        await UserModel.create({ username, password, admin })
        return { status: 201, msg: "Usuário criado com sucesso." }
    } catch (err) {
        return { status: 500, msg: err }
    }
}