const mongoose = require('mongoose');
const config = require('./config/config');
let mongod;

async function connect() {
  let dbUri = config.mongoUri;
  if (process.env.NODE_ENV === 'test') {
    // utiliza un mongodb en memoria para pruebas
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
      // detiene y elimina el mongodb en memoria en caso de tests
      await mongod.stop();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { connect, disconnect }