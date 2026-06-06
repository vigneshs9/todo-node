const uploadModel = require('../../model/upload')
const encryptPayload = require('../../config/encrypt_payload');

exports.getUploadUrl = async (req, res) => {
 try {
  const postParams = req.body
  const result = await uploadModel.getUploadUrl(postParams)
  const encryptedResult = encryptPayload.encryptResponse(result)
  res.status(200).json(encryptedResult)
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ status: false, error: error.message })
  res.status(500).json(encryptedError)
 }
}
exports.getSignedUrl = async (req, res) => {
 try {
  const postParams = req.body
  const result = await uploadModel.getSignedUrl(postParams)
  const encryptedResult = encryptPayload.encryptResponse(result)
  res.status(200).json(encryptedResult)
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ status: false, error: error.message })
  res.status(500).json(encryptedError)
 }
}