const { S3Client } = require("@aws-sdk/client-s3");
const { getConfig } = require("../config/config")

const initializeS3 = (req) => {

  console.log("S3 config:",getConfig().s3);

  const s3config = getConfig().s3;

  // ✅ Return a new `S3Client` instance per request
  return new S3Client({
    region: s3config.region,
    credentials: {
      accessKeyId: s3config.accessKeyId,
      secretAccessKey: s3config.secretAccessKey,
    },
  });
};

module.exports = initializeS3;
