const express = require('express');
const router = express.Router();
const Project = require('../../models/project');

// @route   GET /api/projects/featured
// @desc    Get featured projects
router.get('/featured', async (req, res) => {
    try {
        const projects = await Project.find({ featured: true }).sort({ date: -1 }).limit(3);
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/projects
// @desc    Get all projects
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const category = req.query.category || 'all';

    try {
        const query = category === 'all' ? {} : { category };
        const projects = await Project.find(query).sort({ date: -1 }).skip(skip).limit(limit);
        const totalProjects = await Project.countDocuments(query);
        res.json({ projects, totalPages: Math.ceil(totalProjects / limit) });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/projects/:id
// @desc    Get a single project
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/projects
// @desc    Create a project
router.post('/', async (req, res) => {
    const { title, description, imageUrl, url, category, featured } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            imageUrl,
            url,
            category,
            featured,
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
router.put('/:id', async (req, res) => {
    const { title, description, imageUrl, url, category, featured } = req.body;

    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        project.title = title;
        project.description = description;
        project.imageUrl = imageUrl;
        project.url = url;
        project.category = category;
        project.featured = featured;

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
router.delete('/:id', async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        await project.remove();

        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;