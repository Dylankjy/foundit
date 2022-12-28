const mongoose = require('mongoose')

const Item = new mongoose.Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    category: { type: String, required: true }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

Item.index({ name: 'text' })
Item.index({ category: 'text' })

module.exports = mongoose.model('items', Item)
