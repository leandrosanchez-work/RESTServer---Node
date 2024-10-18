const { response } = require("express")
const Usuario = require ('../models/usuario');
const bcryptjs = require ('bcryptjs');



const usuariosGet = (req,res =  response) =>{
    const {q = 'no query', nombre} = req.query;


    res.json({msg:'holaaa desde controller', q, nombre})
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

    res.json({message:'put desde controller', usuario})
}

const usuariosDelete = (req,res) =>{
    res.json({msj: 'eliminando desde controller'})
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}