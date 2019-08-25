const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('../db/strategies/base/contextStrategy')


let context = {}



let MOCK_HEROI_ID = ''

const MOCK_DEFAULT_CADASTRAR = {
    nome: 'Batman',
    poder: 'Grana'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem-Aranha-${Date.now()}`,
    poder: 'Teia'
}

const MOCK_DEFAULT_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velox'
}



describe('Mongo Strategy', function () {

    this.beforeAll( async () =>{
        const connection = MongoDB.connect()
        context = new Context(new MongoDB(connection, HeroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_DEFAULT_ATUALIZAR)

        MOCK_HEROI_ID = result._id
    })


    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })

    it('cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_DEFAULT_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_DEFAULT_CADASTRAR)
    })


    it('listar', async ()=>{
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
            nome, poder
        }

        assert.deepEqual(result,MOCK_HEROI_DEFAULT )
    })

    it('atualizar', async() => { 
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })

        assert.deepEqual(result.nModified, 1)
    })

    it('remover', async() => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})