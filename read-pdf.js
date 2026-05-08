const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('D:/INITIO/public/content/Initio - Website & CI Content - V.1.0.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('D:/INITIO/public/content/pdf_text.txt', data.text);
    console.log('Successfully wrote text to pdf_text.txt');
}).catch(function(error) {
    console.error('Error parsing PDF:', error);
});
