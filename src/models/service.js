const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String, // Font Awesome icon class, e.g., 'fas fa-laptop-code'
        required: true,
    },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;