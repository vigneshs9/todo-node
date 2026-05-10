const { PutObjectCommand, GetObjectCommand  } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3 = require('../../config/s3');

exports.getUploadUrl = async (reqParams) => {
 try {
  const { fileName, fileType, filePath } = reqParams;
  const command = new PutObjectCommand({
   Bucket: AWS_BUCKET_NAME,
   Key: filePath,
   ContentType: fileType
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // URL expires in 5 minutes
  const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${filePath}`;

  return { status: true, signedUrl, fileUrl };
 } catch (error) {
  throw new Error('Failed to generate signed URL' + error.message);
 }
}

exports.getSignedUrl = async (reqParams) => {
 try {
  const { filePath } = reqParams;
  const command = new GetObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: filePath });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // URL expires in 5 minutes

  return { status: true, signedUrl };
 } catch (error) {
  throw new Error('Failed to generate signed URL' + error.message);
 }
}