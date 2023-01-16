import { Schema, models, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique: true,
    }
},{
    timestamps: true,
}
);

usuarioSchema.methods.encryptPassword = async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};

usuarioSchema.methods.comparePassword = async function (password, hash) {
    return await bcrypt.compareSync(password, hash);
};

usuarioSchema.methods.generateToken = function () {
    return jwt.sign({ 
        id: this._id,
        nombre: this.nombre,
        email: this.email
    }, process.env.SECRETA, { expiresIn: '8h'});
};

const Usuario = models.Usuario || model("Usuario", usuarioSchema);
export default Usuario