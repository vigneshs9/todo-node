require('dotenv').config();

global.PORT = process.env.PORT || 3000;
global.DATA_BASE = process.env.DATABASE_NAME;
global.USER_NAME = process.env.USER_NAME;
global.PASSWORD = process.env.PASSWORD;
global.SECRET_KEY = process.env.SECRET_KEY;

global.USERS_COLLECTION = 'users';