require('dotenv').config({ path: '.env.local' });
const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'src/data/content.json');

async function sync() {
  console.log('Uploading content.json to Vercel Blob...');
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  
  const result = await put('content.json', data, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN
  });
  
  console.log('Successfully uploaded! Blob URL:', result.url);
}

sync().catch(console.error);
