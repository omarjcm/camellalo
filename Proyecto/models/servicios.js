const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre_emp: String,
    logo_emp: String,
    nombre_serv: String,
    img_serv: String,
    descripcion: String,
    stock: Number,
    valor: Number
});

module.exports = mongoose.model('Servicios', userSchema);