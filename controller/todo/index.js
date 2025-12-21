const todoModel = require('../../model/todo');

exports.createTodo = async (req, res) => {
 try {
  const postParams = req.body || {}
  const result = await todoModel.createTodo(postParams);
  res.status(200).json(result)
 } catch (error) {
  res.status(500).json({ error: 'Internal Server Error' });
 }
}
exports.fetchTodo = async (req, res) => {
 try {
  const postParams = req.body || {}
  const result = await todoModel.fetchTodo(postParams);
  res.status(200).json({staus: true, data: result})
 } catch (error) {
  res.status(500).json({ error: 'Internal Server Error' });
 }
}