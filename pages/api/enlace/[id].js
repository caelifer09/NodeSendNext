import { dbConnect } from '../../../config/db'
import Enlace from '../../../models/Enlace';
import bcrypt from "bcrypt";

export default async function enlaceIdHandler(req, res) {
  await dbConnect()
    const {
      method,
      query: { id },
      body,
    } = req;
    let enlace
    switch (method) {
      case "GET":
        enlace = await Enlace.findOne({ url: id})
        if(!enlace) {
          const error = new Error('enlace no valido o expiro');
          return res.status(404).json({ msg: error.message});
        }
        if (enlace.password) {
          res.json({
            password: true,
            archivo: enlace.nombre,
            nombre_original: enlace.nombre_original,
            url: enlace.url
          })
        }
        res.json({
          password: false,
          archivo: enlace.nombre,
          nombre_original: enlace.nombre_original
        })
      case "POST":
        const { password } = body
        enlace = await Enlace.findOne({ url: id})
        if(!enlace) {
          const error = new Error('enlace no valido o expiro');
          return res.status(404).json({ msg: error.message});
        }
        try {
          const respuesta = await bcrypt.compareSync(password, enlace.password)
          res.json({
            password: !respuesta
          })
        } catch (error) {
          console.log(error)
          res.json({
            password: false
          })
        }
      default:
        return res.status(400).json({ msg: "This method is not supported" });
    }
  }
