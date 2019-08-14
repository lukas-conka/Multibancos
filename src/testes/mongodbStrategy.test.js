const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')
const context = new Context(new MongoDB())

const MOCK_DEFAULT_CADASTRAR = {
    nome: 'Batman',
    poder: 'Grana'
}

describe('Mongo Strategy', function () {

    this.beforeAll( async () =>{
        await context.connect()
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
})