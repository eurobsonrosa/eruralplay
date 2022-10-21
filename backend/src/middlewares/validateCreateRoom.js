import * as yup from 'yup'

export default async (req, res, next) => {
    let schema = yup.object().shape({
        name: yup.string().strict().required("Nome da sala é obrigatório."),
        description: yup.string().strict().required("Descrição é obrigatório."),
        videoUrl: yup.string().strict().required("URL do vídeo é obrigatório.")
        .matches(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/, "URL do Vídeo precisa ser do YouTube")
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