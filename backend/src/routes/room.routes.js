import express from 'express'
import createRoomController from '../app/controllers/room/createRoomController'
import listRoomsController from '../app/controllers/room/listRoomsController'
import listRoomByIdController from '../app/controllers/room/listRoomByIdController'
import updateRoomController from '../app/controllers/room/updateRoomController'
import deleteRoomController from '../app/controllers/room/deleteRoomController'
import validateCreateRoom from '../middlewares/validateCreateRoom'
import passport from '../middlewares/passportAuth'
import admin from '../middlewares/admin'

const app = express()

app.use('/rooms', passport)

app.route('/rooms')
    .post(validateCreateRoom, createRoomController)
    .get(listRoomsController)

    app.route('/rooms/:id')
        .get(listRoomByIdController)
        .put(updateRoomController)
        .delete(admin, deleteRoomController)
export default app