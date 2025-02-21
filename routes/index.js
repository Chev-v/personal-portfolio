const express = require('express');
const router = express.Router();

// Home route it renders the home page
router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// About route, it renders the about page
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Me' });
});

// Projects route it renders the projects page
router.get('/projects', (req, res) => {
    res.render('projects', { title: 'Projects' });
});

// Contact route it renders the contact page
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

// Export the router to be used in app.js
module.exports = router;
