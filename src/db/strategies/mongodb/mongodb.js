const ICrud = require('./../interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}
class MongoDB extends ICrud {

    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if(state === 'Conectado') return state
        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]
    }



    static connect() {
        Mongoose.connect('mongodb://lucasamaral:swordfish7@localhost:27017/herois', {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.error('Falha na conexão', error)
        })

        const connnection = Mongoose.connection
     
        connnection.once('open', () => console.log('database rodando'))
      
        return connnection
       
    }

     create(item) {
        return this._schema.create(item)
    }

    read(item, skip = 0, limit = 10){
        return this._schema.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        return this._schema.updateOne({_id:id}, {$set: item})
    }

    delete(id){
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDB