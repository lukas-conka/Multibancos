//npm install sequelize pg-hstore pg 
const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'lucasamaral',
    'swordfish@7',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        //operatorsAliases: true

    }
)

async function main() {
    const Herois = driver.define('herois', {
        id:{
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            require: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false, 
        timestamps: false
    })

    await Herois.sync()
    
    await Herois.create({
        nome:"Chapolim",
        poder: "Marreta"
    })

    const result = await Herois.findAll({
        raw:true
    })
    console.log('result', result)
}

main()