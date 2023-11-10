const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const fileList = document.getElementById('fileList');
const fileNameInput = document.getElementById('fileNameInput');
const fileContents = document.getElementById('fileContents');
const btnAccess = document.getElementById('btnAccess');
const btnUpdate = document.getElementById('btnUpdate');
const btnDelete = document.getElementById('btnDelete');

let pathName = path.join(__dirname, 'Files');

function updateFileList() {
    fs.readdir(pathName, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        fileList.innerHTML = '';
        files.forEach((file) => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            fileList.appendChild(listItem);
        });
    });
}

updateFileList();

btnAccess.addEventListener('click', () => {
    const selectedFileName = fileNameInput.value;
    const filePath = path.join(pathName, selectedFileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        fileContents.value = data;
    });
});

btnUpdate.addEventListener('click', () => {
    const selectedFileName = fileNameInput.value;
    const filePath = path.join(pathName, selectedFileName);
    const newContents = fileContents.value;

    fs.writeFile(filePath, newContents, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        alert(`${selectedFileName} text file was updated"`);
        updateFileList();
    });
});

btnDelete.addEventListener('click', () => {
    const selectedFileName = fileNameInput.value;
    const filePath = path.join(pathName, selectedFileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            alert(`An error occurred deleting the file: ${err.message}`);
            console.error(err);
            return;
        }

        alert(`${selectedFileName} text file was deleted"`);
        fileNameInput.value = '';
        fileContents.value = '';
        updateFileList();
    });
});

fileList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        fileNameInput.value = event.target.textContent;
        btnAccess.click();
    }
});
