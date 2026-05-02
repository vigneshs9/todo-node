const mongo = require('../../config/db')
const mail = require('../../config/mail');

exports.remainders = async () => {
 try {
  const db = await mongo.getDB();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const pipeline = [
   {
    $lookup: {
     from: USERS_COLLECTION,
     localField: 'userId',
     foreignField: '_id',
     as: 'user'
    }
   },
   { $unwind: "$user" },
   { $match: { status: 1, todoDate: { $gte: startOfDay, $lte: endOfDay } } },
   { $project: { title: 1, email: '$user.email', name: '$user.name' } }
  ]
  const todos = await db.collection(TODOS_COLLECTION).aggregate(pipeline).toArray();
  if (!todos.length) {
   return { status: true, message: 'No todoss for today' };
  }

  const grouped = {};
  todos.forEach(todo => {
   if (!grouped[todo.email]) {
    grouped[todo.email] = [];
   }
   grouped[todo.email].push(todo);
  });

  for (const email in grouped) {
   const list = grouped[email];
   const name = list[0].name;

   await mail.transporter.sendMail({
    from: EMAIL, to: email,
    subject: 'Today’s Todo Reminder',
    html: `
          <h3>Hello ${name}</h3>
          <p>Here are your tasks for today:</p>
          <ul>
            ${list.map(t => `<li>${t.title}</li>`).join('')}
          </ul>
          <p>Have a productive day!</p>
          <p>Best regards,<br/>Todo App Team</p>
        `
   });
  }
  return { status: true, message: 'Remainders sent successfully' };
 } catch (error) {
  console.error('Error in cronjob remainder:', error);
  throw new Error('Internal server error');
 }
}