// Import required modules
const express = require('express');
const path = require('path');

const connectDB = require('./src/config/db');

// Create an Express application
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/services', require('./src/routes/api/services'));
app.use('/api/team', require('./src/routes/api/team'));
app.use('/api/testimonials', require('./src/routes/api/testimonials'));
app.use('/api/contact', require('./src/routes/api/contact'));

app.use('/api/projects', require('./src/routes/api/projects'));

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`✅ Server started successfully!`);
    console.log(`Listening on port: ${PORT}`);
    console.log(`Access your website at: http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
    console.error(`❌ An error occurred while starting the server: ${err}`);
});
