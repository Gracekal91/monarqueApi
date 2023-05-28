const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    eventType: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Portfolio', portfolioSchema);