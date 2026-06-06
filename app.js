const express = require('express');
const { connectDB } = require('./config/db');
const routes = require('./route/index');
require('./config/constants');
const authMiddleware = require('./config/auth');
const cors = require('cors');
const decryptPayload = require('./config/decrypt_payload');
const corsOptions = (origin, callback) => {
 if (!origin) {
  return callback(null, true);
 }
 if (WHITELIST_DOMAIN.includes(origin)) {
  return callback(null, true);
 }
 return callback(new Error(`CORS blocked for origin: ${origin}`));
};

const app = express();
app.use(express.json());
app.use(cors({ origin: corsOptions }));
app.use(decryptPayload);
app.use(authMiddleware);
connectDB().then(() => {
 app.use(routes);
 app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
 })
})