const cjModel = require('../../model/cronjob');
exports.remainder = async (req, res) => {
 try {
  const result = await cjModel.remainders();
  res.json(result);
 } catch (error) {
  console.error('Error in cronjob remainder:', error);
  res.status(500).json({ error: 'Internal server error' });
 }
}