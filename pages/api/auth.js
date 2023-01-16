import { dbConnect } from "../../config/db";
import Usuario from "../../models/Usuario";
import jwt from "jsonwebtoken";

export default async function registerHandler(req, res) {
    await dbConnect()
    const { body, method } = req;
    const { password, email} = body
    let token

    switch (method) {
        case "POST":
            if (email === '' || password === '') {
                const error = new Error('Todos los Campos Son obligatorios');
                return res.status(401).json({ msg: error.message});
            }
        
            const userFound = await Usuario.findOne({ email })
        
            if (!userFound) {
                const error = new Error('usuario no existe');
                return res.status(401).json({ msg: error.message});
            }
            
            const isPasswordValid = await userFound.comparePassword(password, userFound.password);
        
            if (!isPasswordValid) {
                const error = new Error('password es incorrecta');
                return res.status(401).json({ msg: error.message});
            }
        
            token = userFound.generateToken();
        
            return res.status(200).json({
                message: "Usuario autentificado",
                token,
            });
        case "GET":
                if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                    try {
                        token = req.headers.authorization.split(' ')[1]
                        const decoded = jwt.verify(token, process.env.SECRETA)
                        const usuario = await Usuario.findById(decoded.id).select("-password -createdAt -updatedAt -__v")
                        return res.json(usuario)
                    } catch (error) {
                        return res.status(404).json({ msg: error.message})
                    }
                }
                if(!token){
                    const error = new Error('token no valido')
                    return res.status(401).json({msg: error.message})
                }
        default:
            const error = new Error('METODO NO SOPORTADO');
            return res.status(401).json({ msg: error.message});
    }   
}