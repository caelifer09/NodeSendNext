import { dbConnect } from "../../../config/db";
import Enlace from "../../../models/Enlace";
import shortid from "shortid";
import bcrypt from "bcrypt";

export default async function enlaceHandle(req, res) {
    await dbConnect()
    const { body, method } = req;
    const { nombre_original, nombre, descargas, password, autor } = body

    switch (method) {
        case "POST":
            const enlace = new Enlace()
            enlace.url = shortid.generate()
            enlace.nombre = nombre
            enlace.nombre_original = nombre_original
            enlace.descargas = descargas

            if (password !== '') {
            const salt = await bcrypt.genSalt(10)
            enlace.password = await bcrypt.hash(password, salt)
            }
            enlace.autor = autor           
            try {
                await enlace.save()
                res.json({msg : `${enlace.url}`})
            } catch (error) {
                console.log(error)
            }
        case "GET":
            try {
                const enlaces = await Enlace.find({}).select('url -_id')
                res.json({enlaces})
            } catch (error) {
                console.log(error)
            }
        default:
            const error = new Error('METODO NO SOPORTADO');
            return res.status(401).json({ msg: error.message});
    }
}