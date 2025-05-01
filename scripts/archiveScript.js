// archiveTestData.js
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'archived-billing-records';

async function main() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  const dataDir = path.join(__dirname, '../sample-data');
  const files = fs.readdirSync(dataDir);

  for (const file of files) {
    const blockBlobClient = containerClient.getBlockBlobClient(file);
    const filePath = path.join(dataDir, file);

    await blockBlobClient.uploadFile(filePath);
    console.log(`Uploaded ${file}`);
  }
}

main().catch(console.error);
