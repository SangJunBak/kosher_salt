var express = require('express');
var server = express();
var moduleFunctions = require('./moduleFunctions');
var file= require('./file.js');
var fileData = [];
var lineHistory = [];
server.use(express.json());

server.post('/addModule', (req, res) => {
    moduleFunctions.colourScheme(req.body);
    const currData = req.body;
    moduleFunctions.addModule(currData, fileData, lineHistory);
    res.send("Module Added");
});

server.post('/undoModule', (req, res) => {
    const currData = req.body;
    moduleFunctions.undoModule(currData, fileData, lineHistory);
    res.send("Module Undone");
});

server.post('/updateFile', (req, res) => {
    const currData = req.body;
    const fileDir =  '../generatedSites/'+currData.dir+'.html';
    (currData.stage === 'initStage') ? file.initFile(fileDir, currData, fileData, lineHistory) : file.writeFile(fileDir, fileData);
    // console.log(fileData);
    // console.log(lineHistory);
    res.send("File Updated");
});

const port = 3001;
const hostname = "localhost";
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});