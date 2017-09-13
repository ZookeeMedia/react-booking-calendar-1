const jwt = require('jwt-simple');
const mysql = require('mysql');
const { dbConfig, secret } = require('../config/main');
const bcrypt = require('bcrypt-nodejs');

const db = mysql.createConnection(dbConfig);

exports.login = (req, res) => {
  const timestamp = new Date().getTime();
  const payload = { sub: req.user.id, iat: timestamp };
  const token = jwt.encode(payload, secret);
  res.json({ token });
}

exports.signup = (req, res) => {
  const { password, email, first_name, last_name, phone } = req.body;
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, null, (error, hashedPassword) => {
      const q = 'INSERT INTO users SET ?'
      const user = {
        password: hashedPassword, email, first_name, last_name, phone
      }
      db.query(q, user, (err, results) => {
        if (err) res.json({ err });
        const timestamp = new Date().getTime();
        const payload = { sub: results.insertId, iat: timestamp };
        const token = jwt.encode(payload, secret);
        res.json({ token });
      });
    });
  });
}
