const model = require('./model')

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

module.exports = {
    add: add_usuario,
    get: get_usuario,
    update: update_usuario,
    delete: delete_usuario,
}