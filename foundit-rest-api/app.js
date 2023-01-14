// Load environment
const env = require('./app/config')

// Express
const express = require('express')
const app = express()
app.use(express.json({ limit: '5mb' }))

// Rate limiting
const rateLimit = require('express-rate-limit')
app.use(rateLimit({
    windowMs: 1 * 60 * 1000,
    max: env.MAX_REQUESTS_PER_MINUTE,
    message: { message: 'Too many requests. Try again later.' }
}))

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./app/api/swagger.json')

// Database
require('./app/utils/database')

// Cors
const cors = require('cors')
app.use(cors({
    origin: env.CORS_ORIGIN
}))

// Routes
require('./app/api')(app)

// When debug mode is enabled, print env
if (env.DEBUG_MODE) {
    console.log(env)
}

const webserver = () => {
    app.listen(env.PORT, (err) => {
        if (err) {
            throw err
        }
        console.log(`Started: Webserver binded on port ${env.PORT}`)
    })

    // Swagger API Docs
    app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

webserver()
