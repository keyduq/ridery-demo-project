const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Credenciales incorrectas' });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { login }