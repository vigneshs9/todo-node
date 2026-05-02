require('dotenv').config();

global.PORT = process.env.PORT || 3000;
global.DATA_BASE = process.env.DATABASE_NAME;
global.USER_NAME = process.env.USER_NAME;
global.PASSWORD = process.env.PASSWORD;
global.SECRET_KEY = process.env.SECRET_KEY;
global.EMAIL = process.env.EMAIL;
global.MAIL_PASSWORD = process.env.MAIL_PASSWORD;

global.USERS_COLLECTION = 'users';
global.TODOS_COLLECTION = 'todos';