import RoomModel from '../../models/RoomModel'

export default async (page) => {
    try {
        const limit = 10

        const count = await RoomModel.find()
            .count('_id')

        const rooms = await RoomModel.find()
            .sort({ createdAt: - 1 })
            .skip(page * limit - limit)
            .limit(limit)

        return { status: 200, rooms, count, limit }


    } catch (err) {
        return { status: 500, msg: err }
    }
}