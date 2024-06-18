const mongoose = require('mongoose');
const config = require('./config/config');
let mongod;

async function connect() {
  let dbUri = config.mongoUri;
  if (process.env.NODE_ENV === 'test') {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    dbUri = mongod.getUri();
  }
  return mongoose.connect(dbUri);
}

async function disconnect() {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { connect, disconnect }