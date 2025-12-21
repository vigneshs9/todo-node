const mongo = require('../../config/db');
exports.loginUser = async (reqParams) => {
 try {
  const { name, password } = reqParams;
  const db = await mongo.getDB();
  const user = await db.collection(USERS_COLLECTION).findOne({ name: { $regex: `^${name}$`, $options: 'i' }, password });
  if (user) {
   return { status: true, message: 'Login successful', userId: user._id, userName: user.name };
  } else {
   throw new Error('Invalid username or password');
  }
 } catch (error) {
  throw new Error('Login failed: ' + error.message);
 }
}
const findUserByEmail = async (email) => {
 try {
  const db = await mongo.getDB();
  const user = await db.collection(USERS_COLLECTION).findOne({ email });
  return user;
 } catch (error) {
  throw new Error('Error finding user by email: ' + error.message);
 }
}
exports.fetchUser = async (reqParams) => {
 try {
  const { name, password } = reqParams;
  const db = await mongo.getDB();
  const user = await db.collection(USERS_COLLECTION).findOne({ name: { $regex: `^${name}$`, $options: 'i' }, password });
  if (user) {
   return { name: user.name, email: user.email, userId: user._id };
  } else {
   throw new Error('Invalid username or password');
  }
 } catch (error) {
  throw new Error('Fetch user failed: ' + error.message);
 }
}
exports.signupUser = async (reqParams) => {
 try {
  const { name, email, password } = reqParams;
  const isUserExists = await findUserByEmail(email);
  if (isUserExists) {
   throw new Error('User already exists with this email');
  }
  const db = await mongo.getDB();
  const insertObj = { name, email, password, createdAt: new Date() };
  const result = await db.collection(USERS_COLLECTION).insertOne(insertObj);
  if (result.insertedId) {
   return { status: true, message: 'User registered successfully', userId: result.insertedId };
  } else {
   throw new Error('User registration failed');
  }
 } catch (error) {
  throw new Error('Signup failed: ' + error.message);
 }
}