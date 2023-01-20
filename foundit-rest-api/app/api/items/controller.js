const express = require('express')
const router = express.Router()

const Item = require('../../models/item')

const env = require('../../config')

const AWS = require('aws-sdk')
const sns = new AWS.SNS({
    accessKeyId: env.services.AWS.ACCESS_KEY_ID,
    secretAccessKey: env.services.AWS.SECRET_ACCESS_KEY,
    region: env.services.AWS.REGION
})

router.get('/', async (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Get all items'

    // #swagger.parameters['page'] = { description: 'Page number' }
    // #swagger.parameters['search'] = { description: 'Search query' }
    const { page, search, limit=10 } = req.query

    const itemsPerPage = limit

    // Check whether page is valid
    if (page && isNaN(page)) {
        // #swagger.responses[400] = { description: 'Invalid page number' }
        return res.status(400).json({
            'error': 'Invalid page number'
        })
    }

    // Get items and paginate
    const items = await Item.find(search ? { name: { $regex: search, $options: 'i' } } : {})
        .skip(page * itemsPerPage)
        .limit(itemsPerPage)

    // Get total item count
    const totalItems = await Item.countDocuments(search ? { name: { $regex: search, $options: 'i' } } : {})
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return res.json({
        items,
        total: items.length,
        page: ((items.length > 0) ? parseInt(page) : 0) || 0,
        totalPages: totalPages
    })
})

router.post('/', (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Add an item'

    const { name, imgBase64, category } = req.body

    // TODO: This should be changed when used in AWS S3
    const imgUrl = imgBase64

    if (!name || !imgUrl || !category) {
        // #swagger.responses[400] = { description: 'Missing required fields' }
        return res.status(400).json({
            'error': 'Missing required fields'
        })
    }

    const item = new Item({
        name,
        imgUrl,
        category
    })

    item.save()

    // SNS publish new message
    const currentHumanReadableTime = new Date().toLocaleString()
    const messageBody = `A new item has been added to Foundit.
Item name: ${name}
Category: ${category}
Timestamp added: ${currentHumanReadableTime}`
    const params = {
        Message: messageBody,
        Subject: 'New item added to Foundit - ' + name,
        TopicArn: env.services.AWS.SNS.TOPIC_ARN
    }

    sns.publish(params, (err, data) => {
        if (err) console.err(err)
        else console.log(data)
    })

    return res.json(item)
})

router.post('/:id', async (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Edit an item'

    const { id } = req.params
    const { name, imgBase64, category } = req.body

    const imgUrl = imgBase64

    if (!id || !name || !imgUrl || !category) {
        // #swagger.responses[400] = { description: 'Missing required fields' }
        return res.status(400).json({
            'error': 'Missing required fields'
        })
    }

    const item = await Item.findByIdAndUpdate(id, {
        name,
        imgUrl,
        category
    })

    if (!item) {
        // #swagger.responses[404] = { description: 'Item not found' }
        return res.status(404).json({
            'error': 'Item for edit not found'
        })
    }

    return res.json(item)
})

router.delete('/:id', async (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Add an item'

    const { id } = req.params

    if (!id) {
        // #swagger.responses[400] = { description: 'Missing required fields' }
        return res.status(400).json({
            'error': 'Missing required fields'
        })
    }

    const item = await Item.findByIdAndDelete(id)

    if (!item) {
        // #swagger.responses[404] = { description: 'Item not found' }
        return res.status(404).json({
            'error': 'Item for deletion not found'
        })
    }

    return res.json('Item deleted')
})

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Get an item by id'

    const { id } = req.params

    if (!id) {
        // #swagger.responses[400] = { description: 'Missing required fields' }
        return res.status(400).json({
            'error': 'Missing required fields'
        })
    }

    const item = await Item.findById(id)

    if (!item) {
        // #swagger.responses[404] = { description: 'Item not found' }
        return res.status(404).json({
            'error': 'Item not found'
        })
    }

    return res.json(item)
})

module.exports = router
