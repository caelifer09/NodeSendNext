import { dbConnect } from "../config/db";
import Usuario from "../models/Usuario"
import jwt from "jsonwebtoken";

const validaUsr = async (req, res) => {
    await dbConnect()
    let usuario
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRETA)
            usuario = await Usuario.findById(decoded.id).select("-password -createdAt -updatedAt -__v")
           return usuario
        } catch (error) {
            return null
        }
    }
}

export default validaUsr