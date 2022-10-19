module.exports = app => {
    const client = require('../controllers/client.controller');
    const router = require('express').Router();
    
    router.post('/create-client',client.CreateClient);   


    app.use('/api/client',router);  
}  