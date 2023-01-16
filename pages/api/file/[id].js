import fs from 'fs'
import Enlace from '../../../models/Enlace'
import { dbConnect } from '../../../config/db'

export default async function enlaceIdHandler(req, res) {
    await dbConnect()
      const {
        method,
        query: { id },
        body,
      } = req;
  
      switch (method) {
        case "GET":
            const enlace = await Enlace.findOne({ nombre: id})
            if(!enlace) {
              const error = new Error('enlace no valido o expiro');
              return res.status(404).json({ msg: error.message});
            }
            if(enlace.descargas === 1){
              try {
                fs.unlinkSync(`./public/${enlace.nombre}`)
                await Enlace.findOneAndRemove(enlace._id)
              } catch (error) {
                console.log(error)
              }
            }else{
                try {
                enlace.descargas--
                await enlace.save()
                } catch (error) {
                    console.log(error)
                }              
            }
            res.json({msg: "ok"})
        default:
          return res.status(400).json({ msg: "This method is not supported" });
      }
    }