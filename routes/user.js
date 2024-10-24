const { Router } = require('express');
const { check } = require('express-validator');
const { esRolValido, existEmail, existeUsuarioId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/user');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const router = Router();


router.get('/', usuariosGet); 

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom( esRolValido ),
    validarcampos
], usuariosPut);

router.post('/', [
    check('nombre', 'Nombre requerido').not().isEmpty(),
    check('correo', 'Correo no valido').isEmail() ,
    check('correo').custom(existEmail) ,
    check('password', 'El correo es requerido y con minimo de 6 caracteres').isLength({min: 6}) ,
    //check('rol', 'Rol de usuario es invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarcampos 
], usuariosPost ); 

router.delete('/:id', [
    validarJWT, //utilizo el middleware para validar el token
    esAdminRole,//bloquea si no es admin
    tieneRole( 'VENTAS_ROLE'),//verifico si es admin para eliminar 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarcampos
],usuariosDelete); 

module.exports = router; 