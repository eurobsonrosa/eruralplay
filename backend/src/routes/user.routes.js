import express from 'express'
import validateCreateUser from '../middlewares/validateCreateUser'
import validateToken from "../app/controllers/auth/validateToken"
import createUserController from '../app/controllers/user/createUserController'
import listUsersController from '../app/controllers/user/listUsersController'
import updateUserController from "../app/controllers/user/updateUserController"
import deleteUserController from "../app/controllers/user/deleteUserController"
import signin from '../app/controllers/auth/signinController'
import passport from '../middlewares/passportAuth'
import admin from '../middlewares/admin'

const app = express()

app.post('/signup', validateCreateUser, createUserController)
app.post('/signin', signin)
app.post('/validate-token', validateToken)

app.use('/users', passport, admin)

app.route('/users')
    .get(listUsersController)
    .post(validateCreateUser, createUserController)

app.route('/users/:_id')
    .put(updateUserController)
    .delete(deleteUserController)

export default app
