const express = require('express');
const router = express.Router();
const Service = require('../../models/service');

// @route   GET /api/services
// @desc    Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/services
// @desc    Create a service
router.post('/', async (req, res) => {
    const { name, description, icon } = req.body;

    try {
        const newService = new Service({
            name,
            description,
            icon,
        });

        const service = await newService.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/services/:id
// @desc    Update a service
router.put('/:id', async (req, res) => {
    const { name, description, icon } = req.body;

    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        service.name = name;
        service.description = description;
        service.icon = icon;

        await service.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service
router.delete('/:id', async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        await service.remove();

        res.json({ msg: 'Service removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;