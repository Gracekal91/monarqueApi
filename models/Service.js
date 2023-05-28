const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Service', serviceSchema);