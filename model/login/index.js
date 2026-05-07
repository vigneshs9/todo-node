const mongo = require('../../config/db');
const hashPwd = require('../../config/password_hashing');
exports.loginUser = async (reqParams) => {
 try {
  const user = await fetchUserWithPassword(reqParams);
  return { status: true, message: 'Login successful', userId: user._id, userName: user.name };
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
  const user = await fetchUserWithPassword(reqParams);
  return { name: user.name, email: user.email, userId: user._id };
 } catch (error) {
  throw new Error(error.message);
 }
}
exports.signupUser = async (reqParams) => {
 try {
  const { name, email, password } = reqParams;
  const hashedPassword = await hashPwd.hashPassword(password);
  const db = await mongo.getDB();
  const insertObj = { name, email, password: hashedPassword, createdAt: new Date() };
  const result = await db.collection(USERS_COLLECTION).insertOne(insertObj);
  if (result.insertedId) {
   return { status: true, message: 'User registered successfully', userId: result.insertedId };
  } else {
   throw new Error('User registration failed');
  }
 } catch (error) {
  if (error.code == 11000) {
   throw error
  }
  throw new Error(error);
 }
}
exports.changePassword = async (reqParams) => {
 try {
  const { name, oldPassword, newPassword } = reqParams;
  const user = await fetchUserWithPassword({ name, password: oldPassword });
  const isMatch = oldPassword === newPassword
  if (isMatch) {
   throw new Error('New password cannot be the same as the old password');
  }
  const hashedNewPassword = await hashPwd.hashPassword(newPassword);
  const db = await mongo.getDB();
  const result = await db.collection(USERS_COLLECTION).updateOne({ _id: user._id }, { $set: { password: hashedNewPassword, modifiedAt: new Date() } });
  if (result.modifiedCount === 1) {
   return { status: true, message: 'Password changed successfully' };
  } else {
   throw new Error('Password change failed');
  }
 } catch (error) {
  throw new Error(error.message);
 }
}
const fetchUserWithPassword = async (reqParams) => {
 try {
  const { name, password } = reqParams;
  const db = await mongo.getDB();
  const user = await db.collection(USERS_COLLECTION).findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
  if (!user) {
   throw new Error('Invalid username or password');
  }
  const isMatch = await hashPwd.comparePassword(password, user.password);
  if (!isMatch) {
   throw new Error('Invalid username or password');
  }
  return user;
 } catch (error) {
  throw new Error(error.message);
 }
}
exports.forgotPassword = async (reqParams) => {
 try {
  const { email, newPassword } = reqParams;
  const user = await findUserByEmail(email);
  if (!user) {
   throw new Error('User not found with this email');
  }
  const hashedNewPassword = await hashPwd.hashPassword(newPassword);
  const db = await mongo.getDB();
  const result = await db.collection(USERS_COLLECTION).updateOne({ _id: user._id }, { $set: { password: hashedNewPassword, modifiedAt: new Date() } });
  if (result.modifiedCount === 1) {
   return { status: true, message: 'Password reset successfully' };
  } else {
   throw new Error('Password reset failed');
  }
 } catch (error) {
  throw new Error(error.message);
 }
}