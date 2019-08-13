//npm install mongoose
const Mongoose = require('mongoose')
Mongoose.connect('mongodb://lucasamaral:swordfish7@localhost:27017/herois', {
    useNewUrlParser: true
}, function(error){
    if(!error) return;
    console.error('Falha na conexão', error)
})

const connnection = Mongoose.connection

connnection.once('open', () => console.log('database rodando'))

/* setTimeout(() =>{
    const state = connnection.readyState
    console.log('state', state)
}, 1000) */

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

const model = Mongoose.model('herois', heroiSchema)

async function main(){

    const cadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('result cadstrar', cadastrar)

    const listItens = await model.find()
    console.log('items', listItens)
}


main()