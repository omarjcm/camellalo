const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('strictQuery', false);

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
    celular:req_string,
    usuari:req_string,
    contraseña:req_string,

    })

usuario_schema.statics.encryptPassword = async(contraseña)=> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contraseña,salt)
}
    
usuario_schema.statics.comparePassword = async(contraseña, contraseñaValida)=> {
    return await bcrypt.compare(contraseña, contraseñaValida)
    
}

const model = mongoose.model('usuario', usuario_schema)
module.exports = model