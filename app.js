const express = require('express');
const { connectDB } = require('./config/db');
const routes = require('./route/index');
require('./config/constants');
const authMiddleware = require('./config/auth');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(authMiddleware);
connectDB().then(() => {
 app.use(routes);
 app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
 })
})