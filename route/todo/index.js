const express = require('express');
const router = express.Router();
const todoController = require('../../controller/todo');
const { body, validationResult } = require('express-validator');

router
.post('/', [
 body('title').notEmpty().isString().withMessage('Title is required'),
 body('date').notEmpty().isString().withMessage('Date is required'),
 body('userId').notEmpty().isMongoId().withMessage('userId is required'),
 body('description').notEmpty().isString().withMessage('Description is required'),
 body('taskStatus').notEmpty().isInt().withMessage('taskStatus is required'),
 body('priority').notEmpty().isInt().withMessage('priority is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  todoController.createTodo(req, res);
 }
})
.put('/', [
 body('todoId').notEmpty().isMongoId().withMessage('todoId is required'),
 body('title').notEmpty().isString().withMessage('Title is required'),
 body('date').notEmpty().isString().withMessage('Date is required'),
 body('description').notEmpty().isString().withMessage('Description is required'),
 body('taskStatus').notEmpty().isInt().withMessage('taskStatus is required'),
 body('priority').notEmpty().isInt().withMessage('priority is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  todoController.updateTodo(req, res);
 }
})
router.post('/fetch', [
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  todoController.fetchTodo(req, res);
 }
})
router.post('/delete', [
 body('todoId').notEmpty().isMongoId().withMessage('todoId is required')
], (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }
 else {
  todoController.deleteTodo(req, res);
 }
})

module.exports = router;