const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        
        //conectar a base de datos
        this.conectarDB();


        //middlewares //funciones que añaden funcionalidades
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
        
    }

    async conectarDB(){
        await dbConection()
    }


    middlewares(){
        //cors
        this.app.use(cors())


        //parseo y lectura del body
        this.app.use( express.json() )

        //carpeta publica
        this.app.use( express.static('public'))
    }


    
    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('server en puerto', this.port)
        });
        
    }
}

module.exports = Server;