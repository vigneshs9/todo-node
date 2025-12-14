const express = require('express');
const { connectDB } = require('./config/db');
const routes = require('./routes/index');
require('./config/constants');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

connectDB().then(() => {
  app.use(routes);
  app.listen(PORT, () => {
    console.log(`port running on ${PORT}`);
  })
})