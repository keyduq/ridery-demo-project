const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}