import * as yup from 'yup'

export default async (req, res, next) => {
    let schema = yup.object().shape({
        username: yup.string().strict().required("Nome é obrigatório."),
        password: yup.string().required("Senha é obrigatório."),
        confirmPassword: yup.string().required("Confirme sua senha.").oneOf([yup.ref('password')], "Senhas diferentes!"),
      });
    
      try {
        await schema.validate(req.body)
        return next()
    
      } catch (err) {
        return res.status(400).json({
          msg: err.message
        })
      }
}