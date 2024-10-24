const { response } = require("express");

const esAdminRole = ( req, res= response , next) =>{
    //valido si es rol ADMIN

    if (!req.usuario) {
        return res.status(500).json({
            msg:'se quiere varificar el rol sin validar token'
        })
    }

    const {rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: `${ nombre } no es administrador - no puede ejecutar DELETE`
        })
    }

    

    next();
}

tieneRole = ( ...roles) =>{

    return ( req, res= response , next) =>{
        console.log(roles, req.usuario.rol)

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }
        next();
    }    
}



module.exports = {
    esAdminRole,
    tieneRole
}