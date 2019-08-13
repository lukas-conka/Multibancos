const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando',
}
class MongoDB extends ICrud {

    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if(state === 'Conectado') return state
        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }

    defineModel() {

        const heroiSchema = new Mongoose.Schema({
            nome:{
                type: String,
                required: true
            },
            poder:{
                type: String,
                required: true
            },
            insertAt:{
                type: Date,
                default: new Date()
            }
        })
        
        this._herois = Mongoose.model('herois', heroiSchema)

    }

    connect() {
        Mongoose.connect('mongodb://lucasamaral:swordfish7@localhost:27017/herois', {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.error('Falha na conexão', error)
        })

        const connnection = Mongoose.connection
        connnection.once('open', () => console.log('database rodando'))

        this._driver = connnection
    }

    create(item) {
        console.log('O item foi salvo com sucesso')
    }
}

module.exports = MongoDB