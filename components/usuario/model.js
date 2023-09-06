const mongoose = require('mongoose')
const Schema = mongoose.Schema

const req_string = {
    type: String,
    required: true,
}

const req_number = {
    type: Number,
    required: true,
}

const usuario_schema = new Schema({
    
    nombre: req_string,
    email: req_string,
    celular:req_number,
    usuari:req_string,
    clave:req_string,

    })

const model = mongoose.model('usuario', usuario_schema)
module.exports = model