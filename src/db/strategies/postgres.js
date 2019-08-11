const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class PostgresDB extends ICrud{

    constructor(){
        super()
        this._driver = null
        this._herois = null
     
    }

    async isConnected(){
        try{
            await this._driver.authenticate()
            return true
        }
        catch(error){
            console.error('Error:', error)
        }
    }

    async defineModel(){

        this._herois = this._driver.define('herois', {
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
    
        await this._herois.sync()
    }

     async connect(){
        this._driver = new Sequelize(
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

        await this.defineModel()

    }

    async create(item){
        const {dataValues} = await this._herois.create(item, { raw: true})

        return dataValues
    }
    
    async update(id, item){
        return await this._herois.update(item, { where: {id: id}})
    }

    async read(item = {}){
        return this._herois.findAll({where: item, raw: true})
    }
}

module.exports = PostgresDB