const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
 region: AWS_REGION,
 credentials: {
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY
 }
});

module.exports = s3;