class NotImplementendException extends Error {
    constructor() {
        super("Excessão não implementada")
    }
}

//Class interface
class ICrud {
    create(item){
        throw new NotImplementendException()
    }

    read(query){
        throw new NotImplementendException()
    }

    update(id, item){
        throw new NotImplementendException()
    }

    delete(id){
        throw new NotImplementendException()
    }
}

class MongoDB extends ICrud{

    constructor(){
        super()
    }

    create(item){
        console.log('O item foi salvo com sucesso')
    }
}

class PostgresDB extends ICrud{

    constructor(){
        super()
    }

    create(item){
        console.log('O item foi salvo com sucesso')
    }
}

//class Abstract 
class ContextStrategy{
    constructor(strategy){
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }

    read(item) {
        return this._database.read(item)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }
}

var contextMongoDB = new ContextStrategy(new MongoDB())
var contextPostresDB = new ContextStrategy(new PostgresDB())

contextMongoDB.create()

contextPostresDB.create()
