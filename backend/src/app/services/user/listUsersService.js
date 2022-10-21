import UserModel from "../../models/UserModel"

export default async (page) => {
    try {
        const limit = 10

        const count = await UserModel.find()
            .count('_id')

        const users = await UserModel.find()
            .sort({ createdAt: - 1 })
            .select(['username', 'admin'])
            .skip(page * limit - limit)
            .limit(limit)

        return { status: 200, users, count, limit }


    } catch (err) {
        return { status: 500, msg: err }
    }
}