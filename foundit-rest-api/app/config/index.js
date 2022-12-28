const inspector = require('inspector')

const config = {
    // Application
    DEBUG_MODE: process.env.DEBUG_MODE || (inspector.url() !== undefined) ? true : false,

    // Webserver
    HOSTNAME: process.env.HOSTNAME || 'localhost',
    PORT: process.env.PORT || 5000,
    MAX_REQUESTS_PER_MINUTE: process.env.MAX_REQUESTS_PER_MINUTE || 100,

    // Services and databases
    services: {
        MONGO: {
            HOST: process.env.MONGO_HOST || 'mongodb://localhost:27017',
            DATABASE: process.env.MONGO_DATABASE || 'test',
            OPTIONS: process.env.MONGO_OPTIONS || ''
        }
    },

    // API Constants
    constants: {
        SERVICE_NAME: 'Foundit REST API',
        SERVICE_DESCRIPTION: 'This is the REST API backend for Foundit.',
        API_VERSION: '1.0',
        API_BASE_URL: '/api'
    }
}

module.exports = config
