const mongo = require('../../config/db')

exports.createTodo = async (reqParams) => {
 try {
  const { title, date, userId } = reqParams
  const db = await mongo.getDB();
  const isTitleExists = await db.collection(TODOS_COLLECTION).findOne({ title: { $regex: `^${title}$`, $options: 'i' }, todoDate: new Date(date), userId: mongo.getId(userId) });
  if (isTitleExists) {
   throw new Error('Todo already exists with this title')
  }
  const insertObj = { title, todoDate: new Date(date), userId: mongo.getId(userId), createdAt: new Date() }
  const result = await db.collection(TODOS_COLLECTION).insertOne(insertObj);
  if (result.insertedId) {
   return { status: true, message: 'Todo created successfully', todoId: result.insertedId }
  } else {
   throw new Error('Todo creation failed')
  }
 } catch (error) {
  throw new Error(error)
 }
}
exports.fetchTodo = async (reqParams) => {
 try {
  const db = await mongo.getDB();
  const pipeline = [
   { $match: { userId: mongo.getId(reqParams.userId) } },
   { $sort: { todoDate: -1 } },
   {
    $addFields: {
     todoDateDMY: {
      $dateToString: { format: "%d/%m/%Y", date: "$todoDate" }
     }
    }
   },
   {
    $project: { title: 1, todoDate: 1, createdAt: 1, todoDateDMY: 1 }
   }
  ]
  const todos = await db.collection(TODOS_COLLECTION).aggregate(pipeline).toArray();
  return todos;
 } catch (error) {
  throw new Error(error)
 }
}