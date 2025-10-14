// Import required modules
const express = require('express');
const path = require('path');
const find = require('find-free-port');
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

// Find a free port and start the server
find(3000, (err, freePort) => {
    if (err) throw err;
    const server = app.listen(freePort, () => {
        console.log(`✅ Server started successfully!`);
        console.log(`Listening on port: ${freePort}`);
        console.log(`Access your website at: http://localhost:${freePort}`);
    });

    // Handle server errors
    server.on('error', (err) => {
        console.error(`❌ An error occurred while starting the server: ${err}`);
    });
});
