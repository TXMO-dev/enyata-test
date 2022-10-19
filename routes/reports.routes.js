module.exports = app => {
    const report = require('../controllers/reports.controller.js');

    const router = require('express').Router();


    router.post('/create-report',report.createReport); 
    router.get('/list-reports',report.listReports);

    app.use('/api/report',router);              
} 