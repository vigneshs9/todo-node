const uploadModel = require('../../model/upload')

exports.getUploadUrl = async (req, res) => {
 try {
  const postParams = req.body
  const result = await uploadModel.getUploadUrl(postParams)
  res.status(200).json(result)
 } catch (error) {
  res.status(500).json({ status: false, error: error.message })
 }
}
exports.getSignedUrl = async (req, res) => {
 try {
  const postParams = req.body
  const result = await uploadModel.getSignedUrl(postParams)
  res.status(200).json(result)
 } catch (error) {
  res.status(500).json({ status: false, error: error.message })
 }
}