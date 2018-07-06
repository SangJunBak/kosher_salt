var requireDir = require('require-dir');
var modules = requireDir('./modules');

module.exports = {

    colourScheme: (currData)=>{
        const colour_scheme = currData.colour_scheme;
        currData.primary_colour = (colour_scheme === 'red')   ? (`#c50022`)
            : (colour_scheme === 'green')   ? (`#65ac1e`)
                : (colour_scheme === 'orange')   ? (`#f39500`)
                    : (`#FFFFFF`);
        currData.secondary_colour = (colour_scheme === 'red')   ? (`#dc667a`)
            : (colour_scheme === 'green')   ? (`#00793a`)
                : (colour_scheme === 'orange')   ? (`#f8bf66`)
                    : (`#FFFFFF`);
    },

    addModule: (currData, fileData, lineHistory)=>{
        const module_name = currData.currModule;
        //function call
        const newData = modules[module_name][module_name](currData);
        //Build the module html
        let moduleData=``;
        //Filters
        (newData.pre !== undefined && currData.filter === 'pre') ? (moduleData += newData.pre)   :
            (newData.body !== undefined && currData.filter === 'body') ? (moduleData += newData.body)   :
                (newData.post !== undefined && currData.filter === 'post') ? (moduleData += newData.post)    :
                    moduleData = newData.pre + newData.body + newData.post;
        let moduleDataSliced = moduleData.split('\n');
        moduleDataSliced.forEach((key) => {
           fileData.push(key);
        });
        lineHistory.push(moduleDataSliced.length);
    },

    undoModule: (currData, fileData, lineHistory)=>{
        if(lineHistory.length){
            const linesToDelete = lineHistory[lineHistory.length-1];
            for(let i=0;i<linesToDelete;i++){
                fileData.pop();
            }
            lineHistory.pop();
        }
    },
};