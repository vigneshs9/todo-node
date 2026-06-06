const todoModel = require('../../model/todo');
const encryptPayload = require('../../config/encrypt_payload');

exports.createTodo = async (req, res) => {
 try {
  const postParams = req.body || {}
  const result = await todoModel.createTodo(postParams);
  const encryptedResult = encryptPayload.encryptResponse(result);
  res.status(200).json(encryptedResult);
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ error: 'Internal Server Error' });
  res.status(500).json(encryptedError);
 }
}
exports.fetchTodo = async (req, res) => {
 try {
  const postParams = req.body || {}
  const result = await todoModel.fetchTodo(postParams);
  const encryptedResult = encryptPayload.encryptResponse({status: true, data: result});
  res.status(200).json(encryptedResult);
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ error: 'Internal Server Error' });
  res.status(500).json(encryptedError);
 }
}
exports.deleteTodo = async (req, res) => {
 try {
  const postParams = req.body || {}
  const result = await todoModel.deleteTodo(postParams);
  const encryptedResult = encryptPayload.encryptResponse({status: true, message: 'Todo deleted successfully'});
  res.status(200).json(encryptedResult);
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ error: 'Internal Server Error' });
  res.status(500).json(encryptedError);
 }
}
exports.updateTodo = async (req, res) => {
 try {
  const postParams = req.body || {}
  const result = await todoModel.updateTodo(postParams);
  const encryptedResult = encryptPayload.encryptResponse({status: true, message: 'Todo updated successfully'});
  res.status(200).json(encryptedResult);
 } catch (error) {
  const encryptedError = encryptPayload.encryptResponse({ error: 'Internal Server Error' });
  res.status(500).json(encryptedError);
 }
}