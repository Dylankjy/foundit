const express = require('express')
const router = express.Router()

const package = require('../../../package.json')

router.get('/', (req, res) => {
    // #swagger.tags = ['API Information']
    // #swagger.description = 'Information about the API'
    return res.json({
        'service': 'Foundit REST API',
        'owner': package.author
    })
})

router.get('*', (req, res) => {
    // #swagger.ignore = true
    return res.json({
        'code': 404,
        'name': 'Not Found',
        'message': 'The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.'
    })
})

module.exports = router
