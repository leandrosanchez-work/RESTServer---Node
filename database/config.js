const mongoose = require('mongoose')

const dbConection = async () =>{

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cursoUdemy',{
            
        })
        console.log('Base de datos conectada')
        
    } catch (error) {
        throw new Error('error al conectar a mongo')
    }
}

module.exports = {
    dbConection
}