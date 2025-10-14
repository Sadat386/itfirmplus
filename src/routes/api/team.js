const express = require('express');
const router = express.Router();
const TeamMember = require('../../models/teamMember');

// @route   GET /api/team
// @desc    Get all team members
router.get('/', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.json(teamMembers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/team
// @desc    Create a team member
router.post('/', async (req, res) => {
    const { name, position, imageUrl } = req.body;

    try {
        const newTeamMember = new TeamMember({
            name,
            position,
            imageUrl,
        });

        const teamMember = await newTeamMember.save();
        res.json(teamMember);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/team/:id
// @desc    Update a team member
router.put('/:id', async (req, res) => {
    const { name, position, imageUrl } = req.body;

    try {
        let teamMember = await TeamMember.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({ msg: 'Team member not found' });
        }

        teamMember.name = name;
        teamMember.position = position;
        teamMember.imageUrl = imageUrl;

        await teamMember.save();
        res.json(teamMember);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/team/:id
// @desc    Delete a team member
router.delete('/:id', async (req, res) => {
    try {
        let teamMember = await TeamMember.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({ msg: 'Team member not found' });
        }

        await teamMember.remove();

        res.json({ msg: 'Team member removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;