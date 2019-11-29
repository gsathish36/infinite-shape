const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const drawController = require('./draw.controller');

const registerRoutes = (app) => {
    app.get('/api/shape/h/:height/w/:width/p/:padding', drawController.getShape)

    // All other routes should redirect to the index.html
    app.route('/*').get(function(req, res) {
        res.sendFile(path.join(__dirname, '', 'index.html'));
    });
}

const start = () => {
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({limit: '50mb'}));

    registerRoutes(app);
    const port = 9000;
    http.createServer(app).listen(port,()=>{
        console.log(`server started on port: ${port}`)
    })
}

start();