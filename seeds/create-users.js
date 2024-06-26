const db = require('../db');
const User = require('../models/user.model');

/**
 * Script para generar un usuario de prueba en la base de datos
 */
async function createUsers() {
  const rideryUser = new User({
    username: 'ridery',
    password: 'ridery',
  });

  await rideryUser.save();
}

db.connect()
  .then(() => createUsers())
  .then(() => {
    console.log('Usuarios creados');
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });