const bcrypt = require('bcrypt');
exports.hashPassword = async (password, salt = 10) => {
  try {
    const salted = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, salted);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error occurs while hashing password");
  }
}
exports.comparePassword = async (hashedPassword, givenPassword) => {
  try {
    const isPasswordCorrect = await bcrypt.compare(givenPassword, hashedPassword);
    return isPasswordCorrect;
  } catch (error) {
    throw new Error("Error while comparing the password")
  }
}