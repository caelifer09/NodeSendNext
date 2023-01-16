import { dbConnect } from "../../config/db";
import Usuario from "../../models/Usuario";

export default async function registerHandler(req, res) {
    await dbConnect()
    const { body, method } = req;
    const {nombre, password, email} = body

    if (method !== "POST") {
        const error = new Error('metodo no aceptado');
        return res.status(405).json({ msg: error.message});
    }
    
    const existeUsuario = await Usuario.findOne({ email })

    if(existeUsuario){
          const error = new Error('Usuario ya registrado');
          return res.status(400).json({ msg: error.message});
    }
    if(nombre === '' || password === '' || email === ''){
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message});
    }
    if(password.length < 5){
        const error = new Error('Password debe tener minimo 6 caracteres');
        return res.status(400).json({ msg: error.message});
    }
    try {
        const usuario = new Usuario(body)
        await usuario.encryptPassword()
        await usuario.save()
        res.json({msg: 'Usuario creado correctamente, ahora puedes iniciar sesion'})
    } catch (error) {
        console.log(error)
    }
}