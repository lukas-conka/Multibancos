const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb')
const PostgresDB = require('./db/strategies/postgres')

var contextMongoDB = new ContextStrategy(new MongoDB())

contextMongoDB.create()

var contextPostresDB = new ContextStrategy(new PostgresDB())

contextPostresDB.create()
