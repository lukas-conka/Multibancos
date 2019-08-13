show dbs

use herois

show collections

db.herois.insert({
    nome: 'Robin',
    poder: 'Ajudante',
    dataNascimento: '1998-01-01'
})


//read
db.herois.find().pretty()


//create
for(let i = 0; i <= 100000; i++){
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Lutador',
        dataNascimento: '1990-02-02'
    })
}

//update
db.herois.update({ _id: ObjectId("5d50b4a388394258636c93d0")}, 
    {nome: 'Mulher Maravilha'}
)

db.herois.update({poder: "Lutador"}, 
    {$set : {poder: 'Super Força'}}
)

//remove

db.herois.remove({nome: "Clone-99984"})

// outros
db.herois.count()

db.herois.findOne()

db.herois.find().limit(1000).sort({nome: -1})

db.herois.find({}, {poder: 1, _id: 0})