const inspector = require('inspector')

const config = {
    // Application
    DEBUG_MODE: (process.env.DEBUG_MODE === 'true') ? true : false || (inspector.url() !== undefined) ? true : false,

    // Webserver
    HOSTNAME: process.env.HOSTNAME || 'localhost',
    PORT: process.env.PORT || 5000,
    MAX_REQUESTS_PER_MINUTE: process.env.MAX_REQUESTS_PER_MINUTE || 100,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',

    // Services and databases
    services: {
        MONGO: {
            HOST: process.env.MONGO_HOST || 'mongodb://127.0.0.1:27017',
            DATABASE: process.env.MONGO_DATABASE || 'foundit',
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
