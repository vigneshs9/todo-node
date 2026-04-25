const express = require('express');
const router = express.Router();
const todoController = require('../../controller/todo');
const { check, validationResult } = require('express-validator');

router
.post('/', [
 check('title').notEmpty().isString().withMessage('Title is required'),
 check('date').notEmpty().isString().withMessage('Date is required'),
 check('userId').notEmpty().isMongoId().withMessage('userId is required')
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
 check('todoId').notEmpty().isMongoId().withMessage('todoId is required'),
 check('title').notEmpty().isString().withMessage('Title is required'),
 check('date').notEmpty().isString().withMessage('Date is required')
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
 check('todoId').notEmpty().isMongoId().withMessage('todoId is required')
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