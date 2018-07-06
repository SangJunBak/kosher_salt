var fs = require("fs");

var self = module.exports = {

    // Checks if the file exists. If not, initialize one using the data
    initFile : (fileDir, currData, fileData, lineHistory) => {
        fs.open(fileDir, 'wx', (err, fd) => { //open() to check if file exists
            if (err) {
                if (err.code === 'EEXIST') {
                    // console.log("Current Site exists");
                    try {
                        prevFileData = fs.readFileSync(fileDir, 'utf8');
                    } catch(e) {
                        console.log('Error:', e.stack);
                    }
                    let prevFileDataSliced = prevFileData.split('\n');
                    let prevLineHistory = prevFileData.length;

                    fileData.forEach((key) => {
                        prevFileDataSliced.push(key);
                    });
                    lineHistory.forEach((key)=> {
                       prevLineHistory.push(key);
                    });
                    fileData = prevFileDataSliced;
                    lineHistory = prevLineHistory;
                    self.writeFile(fileDir, fileData);
                }
            }else{
                self.writeFile(fileDir, fileData);
                console.log("Site initialized.");
                fs.close(fd, (err) => {
                    if (err) throw err;
                });
            }
        });
    },
    //Write to a file
    writeFile : (fileDir, fileData) => {
        let fileDataString = fileData.join('\n');
        fs.writeFile(fileDir, fileDataString, (err) => {
            if (err) throw err;
            // console.log('New site data written');
        });
    }
};