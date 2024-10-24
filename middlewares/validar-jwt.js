const { response, request } = require('express')
const Usuario = require ('../models/usuario');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const validarJWT = async ( req= request, res= response, next) =>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({msg:'Acceso denegado - no hay token'})
    }

    try {

        const { uid } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //leer el usr que corresponde al uid

        const usuario = await Usuario.findById( uid )
        if (!usuario) {
            return res.status(401).json({msg:'Usuario no esta en base de datos'})
        }
        
        //verifico si el user no ha sido borrado
        if (!usuario.estado) {
            return res.status(401).json({msg:'token no valido, usuario estado: False'})
        }


        req.usuario = usuario;

        //next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }

    console.log(token)
    
    next();
}

module.exports = {
    validarJWT
}