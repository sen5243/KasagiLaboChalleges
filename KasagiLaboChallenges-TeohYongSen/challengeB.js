const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'randomObjects.txt');


//For Output file

const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'output.txt');

// Helper functions to identify types
function isInteger(value) {
    return Number.isInteger(Number(value));
}

function isRealNumber(value) {
    return !isNaN(value) && value.toString().includes('.');
}

function isAlphabetical(value) {
    return /^[a-zA-Z]+$/.test(value);
}

function isAlphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
}

function identifyType(value) {
    value = value.trim(); // Strip spaces for alphanumerics

    if (isInteger(value)) {
        return { type: 'Integer', value };
    } else if (isRealNumber(value)) {
        return { type: 'Real Number', value };
    } else if (isAlphabetical(value)) {
        return { type: 'Alphabetical String', value };
    } else if (isAlphanumeric(value)) {
        return { type: 'Alphanumeric', value };
    } else {
        return { type: 'Unknown', value };
    }
}


// Ensure the output folder exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Read the file and process each object
function readFileAndIdentify() {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const objects = data.split(',').filter(obj => obj.length > 0);
        const results = [];

        objects.forEach(obj => {
            const result = identifyType(obj);
            const resultStr = `${result.value} -> ${result.type}`;
            console.log(resultStr);
            results.push(resultStr);
        }); //Store results in array

        // After processing all objects, write all results at once
        fs.writeFile(OUTPUT_FILE, results.join('\n') + '\n', (err) => {
            if (err) {
                console.error('Error writing to output file:', err);
            } else {
                console.log('Results written to output.txt');
            }
        });
    });
}

readFileAndIdentify();
