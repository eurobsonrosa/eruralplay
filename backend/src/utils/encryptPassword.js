import bcrypt from 'bcrypt-nodejs'

export default password => {
    try {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    } catch (err) {
        return { status: 500, msg: err }
    }
}