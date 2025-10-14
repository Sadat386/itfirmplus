const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;