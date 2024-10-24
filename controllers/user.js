const { response } = require("express")
const Usuario = require ('../models/usuario');
const bcryptjs = require ('bcryptjs');



const usuariosGet = async(req,res =  response) =>{
  
    //get de todos los users
    const {limite = 5, desde = 0 } = req.query; //desestructuro la 'query' y pongo por defecto un limite de 5 registros
    const query = { estado: true }

    /*
    const usuarios = await Usuario.find(query)
    .skip(Number(desde)) //el desde funciona con el skip para contar desde que registro quiero mostrar
    .limit(Number(limite));//limite de registros en la consulta,si nosotros enviamos un argumento ej: limit=5 y lo tomamos del query, viene como string y tenemos que pasarlo a number

    const total = await Usuario.countDocuments(query);
    */

    //realizamos una Promesa para optimizar la consulta, realizamos un arreglo de promesas en donde se ejecutan en simultaneo
    const [ total, usuarios] = await Promise.all([  //total va a ser resultado de la primer promesa y usuarios resutlado de la segunda promesa
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]) 

    res.json({
        total,
        usuarios

        //total, 
        //usuarios
    })
}

const usuariosPost = async (req,res)=>{
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //verificar si el correo existe


    //encripto contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt )

    //guardar en base de datos
    await usuario.save();

    res.json({ usuario})
}

const usuariosPut = async (req,res)=>{
    const {id} =  req.params;
    const {_id, password, google, correo,...resto } = req.body

    //validar contra base de datos
    if (password) {
        //encripto contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario)
}

const usuariosDelete = async (req,res = response) =>{
    const {id} = req.params;
    //borrar fisicamente de base de datos
    //const usuario = await Usuario.findByIdAndDelete( id )

    /*para no eliminar el usuario de la base, cambiaremos el estado*/
    const usuario =  await Usuario.findByIdAndUpdate( id, {estado: false})
    //const usuarioAutenticado = req.usuario;


    res.json(
        {usuario,
        //usuarioAutenticado
    }
    )
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}