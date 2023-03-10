// This file contains every router file to load into express.

const env = require('../config')
const BASE_URL = env.constants.API_BASE_URL

module.exports = (app) => {
    app.use(`${BASE_URL}/items`, require('./items/controller'))
    app.use(`${BASE_URL}/notify`, require('./notify/controller'))
    app.use('/', require('./index/controller'))
}
