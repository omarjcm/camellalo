const model = require('./model')
const jwt = require('jsonwebtoken');

function get_usuario( filtroUsuario ) {
    let filtro = {}
    if (filtroUsuario) {
        filtro = { usuari: filtroUsuario }
    }
    const objeto = model.find( filtro )
    return objeto
}

function add_usuario( usuario ) {
    const objeto = new model( usuario )
    objeto.save()
}

async function update_usuario( usuario ) {
    const objeto = await model.findOne( {usuari: usuario.usuari} )

    if ( objeto ) {
        objeto.nombre = usuario.nombre
        objeto.email = usuario.email
        objeto.celular = usuario.celular
        objeto.usuari = usuario.usuari
        objeto.contraseña = usuario.contraseña
    
        return resultado = await objeto.save()    
    } else {
        return null
    }
}

async function delete_usuario( usuari ) {
    return await model.deleteOne({usuari: usuari})
}

async function login_usuario(usuari, contraseña) {
    try {
      const usuario = await model.findOne({ usuari });
  
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
  
      // Verificar la contraseña
      const contraseñaValida = await User.comparePassword(contraseña, usuario.contraseña_hash);
  
      if (!contraseñaValida) {
        throw new Error('Contraseña incorrecta');
      }
  
      // Generar un token de autenticación
      const token = jwt.sign({ id: usuario._id }, config.SECRET, { expiresIn: '1d' });
  
      return { token };
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    add: add_usuario,
    get: get_usuario,
    update: update_usuario,
    delete: delete_usuario,
    login:login_usuario
}