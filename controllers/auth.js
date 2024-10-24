const { response, query } = require("express")
const Usuario = require ('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

 
 const login = async (req, res = response ) =>{
   
   const { correo , password } = req.body;

   try {
      //verificar si el email existe
      const usuario =  await Usuario.findOne({ correo })
      if (!usuario) {
         return res.status(400).json({msg:'correo invalido - no encontrado'})
      }

      //verifico si el user esta activo
      if (!usuario.estado /*==== false*/) {
         return res.status(400).json({msg:'el usuario no esta activo'})
      }
      //verificar la contraseña
      const validPassword = bcryptjs.compareSync( password, usuario.password)
      if (!validPassword) {
         return res.status(400).json({msg:'Contraseña invalida'})
      }
      //generar JWT
      const token = await generarJWT(usuario.id )
      
      res.json({
         usuario,
         token
         
     })

   } catch (error) {
      console.log(error)
      return res.status(500).json({msj: 'error al loguear'})
   }

    
 }

 module.exports = {
    login
 }