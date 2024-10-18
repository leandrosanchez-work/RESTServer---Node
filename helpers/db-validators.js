const Role = require ('../models/rol')
const Usuario = require ('../models/usuario');

const esRolValido = async (rol = '') => {  //establezco valor por defecto por si no envian nada
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {   
        throw new Error(`el rol ${rol} no esta registrado en la base de datos` ) 
    }
}



const existEmail = async( correo = '' ) =>{
   const correoExistente =  await Usuario.findOne({ correo }) 
if (correoExistente) {
    throw new Error(`el correo: ${ correo } ya esta registrado` ) 
}
}

const existeUsuarioId = async( id = '' ) =>{
    const existeId =  await Usuario.findById(id) 
 if (!existeId) {
     throw new Error(`el ID: ${ id } no se encuentra en base de datos` ) 
 }
}


module.exports = { 
    esRolValido,
    existEmail,
    existeUsuarioId
}