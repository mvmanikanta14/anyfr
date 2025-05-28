const AWS = require('aws-sdk');
if (!process.env.DO_SPACES_ENDPOINT) {
  throw new Error('Environment variable DO_SPACES_ENDPOINT is not set');
}


const endpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);

const s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: process.env.DO_SPACES_REGION,
});

//module.exports = s3;
module.exports = { s3 }; // ✅ export as an object with { s3 }
