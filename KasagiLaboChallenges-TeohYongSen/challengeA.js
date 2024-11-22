const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'randomObjects.txt');
const TARGET_SIZE_MB = 10;
const TARGET_SIZE_BYTES = TARGET_SIZE_MB * 1024 * 1024;


//Default 10 characters
function getRandomAlphabeticalString(length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    //Create array with defined length, then filling each slot with random selected character in chars
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

//get random real number within range
function getRandomRealNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

//get random integer number within range
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Default 10 characters
function getRandomAlphanumeric(length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const digits = '0123456789';

    //Create array with defined length, then filling each slot with random selected character in chars
    const alphanumericArray = Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length)));

    // There may be string without digit so we replace random character in string with digit to make a alphanumeric string
    if (!alphanumericArray.some(char => digits.includes(char))) {
        const randomIndex = Math.floor(Math.random() * length);
        alphanumericArray[randomIndex] = digits.charAt(Math.floor(Math.random() * digits.length));
    }

    //Turns array to string
    const alphanumeric = alphanumericArray.join('');

    //Make sure there's at least 1 space is added but not more than 10 
    const spacesBefore = ' '.repeat(Math.floor(Math.random() * 9) + 1);
    const spacesAfter = ' '.repeat(Math.floor(Math.random() * 9) + 1);
    return `${spacesBefore}${alphanumeric}${spacesAfter}`;
}

function getRandomObject() {
    //Range for the number generated for integer and real num
    const max = -99999;
    const min = 99999;

    const generators = [
        getRandomAlphabeticalString,
        () => getRandomRealNumber(min, max),
        () => getRandomInteger(min, max),
        getRandomAlphanumeric,
    ];

    //Randomly call the function in the generators
    const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
    return randomGenerator();
}

function generateFile() {
    const stream = fs.createWriteStream(FILE_PATH, { flags: 'w' });
    let fileSize = 0;

    //Write the file until it reaches 10 MB
    while (fileSize < TARGET_SIZE_BYTES) {
        const randomObject = getRandomObject();
        const data = randomObject + ',';
        stream.write(data);
        fileSize += Buffer.byteLength(data);
    }

    stream.end();
    console.log(`File location ${FILE_PATH}`);
}

generateFile();
