const storage = require('./storage')

function get_usuario( filtroUsuario ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtroUsuario ) )
    })
}

function add_usuario( usuario) {
    return new Promise((resolve, reject) => {
        if (!usuario.nombre || !usuario.email || !usuario.celular || !usuario.usuari || !usuario.clave) {
            return reject('No hay datos suficientes.')
        }
        storage.add( usuario )
        resolve( usuario )        
    })
}

function update_usuario( usuario ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( usuario )
        if (resultado) {
            return resolve( usuario )
        } else {
            return reject('No existe el usuario.')
        }
    })
}

function delete_usuario( usuari ) {
    return new Promise((resolve, reject) => {
        storage.delete( usuari )
        resolve( usuari )
    })
}

module.exports = {
    get_usuario,
    add_usuario,
    update_usuario,
    delete_usuario,
}