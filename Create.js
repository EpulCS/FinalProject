const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

var btnCreate = document.getElementById('btnCreate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function() {
    let fileNameValue = fileName.value;
    
    if (!fileNameValue.endsWith('.txt')) {
        fileNameValue += '.txt';
    }

    let file = path.join(pathName, fileNameValue);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err) {
        if(err) {
            alert("An error occurred creating the file" + err.message);
            return console.log(err);
        }
        alert(fileNameValue + " text file was created, go to Read/Update/Delete page to access it");
        console.log("The file was created");
    });
});
