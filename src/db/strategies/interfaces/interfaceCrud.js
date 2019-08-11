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

    isConnected(){
        throw new NotImplementendException()
    }


}

module.exports = ICrud
