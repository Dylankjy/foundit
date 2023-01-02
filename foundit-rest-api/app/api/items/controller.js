const express = require('express')
const router = express.Router()

const Item = require('../../models/item')

router.get('/', async (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Get all items'

    // #swagger.parameters['page'] = { description: 'Page number' }
    // #swagger.parameters['search'] = { description: 'Search query' }
    const { page, search } = req.query

    const itemsPerPage = 10

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

    return res.json({
        items,
        total: items.length,
        page: ((items.length > 0) ? parseInt(page) : 0) || 0
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
