const mongoose = require('mongoose')
const env = require('../config')
const path = require('path')
const fs = require('fs')

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${env.services.MONGO.AUTH.USER}:${env.services.MONGO.AUTH.PASSWORD}@${env.services.MONGO.HOST}/${env.services.MONGO.DATABASE}${env.services.MONGO.OPTIONS}`, {
            useNewUrlParser: true,
            ssl: env.services.MONGO.SSL.USE_SSL,
            sslValidate: env.services.MONGO.SSL.SSL_VALIDATE,
            sslCA: path.join(__dirname, env.services.MONGO.SSL.SSL_CA)
        })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch((err) => {
                console.error('Database connection error')
                throw err
            })
    }
}

module.exports = new Database()
