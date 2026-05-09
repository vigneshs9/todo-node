const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
 region: AWS_REGION,
 credentials: {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
 }
});

module.exports = s3;