const express = require('express');
const router = express.Router();
const Testimonial = require('../../models/testimonial');

// @route   GET /api/testimonials
// @desc    Get all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/testimonials
// @desc    Create a testimonial
router.post('/', async (req, res) => {
    const { quote, author, company } = req.body;

    try {
        const newTestimonial = new Testimonial({
            quote,
            author,
            company,
        });

        const testimonial = await newTestimonial.save();
        res.json(testimonial);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/testimonials/:id
// @desc    Update a testimonial
router.put('/:id', async (req, res) => {
    const { quote, author, company } = req.body;

    try {
        let testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ msg: 'Testimonial not found' });
        }

        testimonial.quote = quote;
        testimonial.author = author;
        testimonial.company = company;

        await testimonial.save();
        res.json(testimonial);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial
router.delete('/:id', async (req, res) => {
    try {
        let testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ msg: 'Testimonial not found' });
        }

        await testimonial.remove();

        res.json({ msg: 'Testimonial removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;