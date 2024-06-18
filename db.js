const mongoose = require('mongoose');
const config = require('./config/config');

async function connect() {
  return mongoose.connect(config.mongoUri);
}

module.exports = { connect }