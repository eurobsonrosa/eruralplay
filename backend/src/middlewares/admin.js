export default (req, res, next) => {
    if(req.user.admin){
        next()
    } else {
        res.status(401).json({msg: "usuário não tem permissão para acessar esta rota." })
    }
}