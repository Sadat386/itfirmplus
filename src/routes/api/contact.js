const express = require('express');
const router = express.Router();
const ContactMessage = require('../../models/contactMessage');

// @route   POST /api/contact
// @desc    Create a new contact message
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContactMessage = new ContactMessage({
            name,
            email,
            message,
        });

        const contactMessage = await newContactMessage.save();
        res.json(contactMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/contact
// @desc    Get all contact messages
router.get('/', async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;