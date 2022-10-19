module.exports = app => {
    const weather = require('../controllers/weather.controller');

    const router = require('express').Router();


    // router.post('/create-application',application.CreateApplication); 

    app.use('/api/weather',router);              
} 