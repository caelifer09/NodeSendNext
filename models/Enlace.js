import mongoose, { Schema, models, model } from "mongoose";

const enlaceSchema = Schema({
    url:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    nombre_original:{
        type: String,
        required:true
    },
    descargas: {
        type: Number,
        default: 1
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    password: {
        type: String,
        default: null
    },
    creado: {
        type: Date,
        default: Date.now()
    }
},{
    timestamps: true,
}
);

const Enlace = models.Enlace || model("Enlace", enlaceSchema);
export default Enlace
