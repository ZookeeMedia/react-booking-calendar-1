const mysql = require('mysql');
const { dbConfig, secret } = require('../config/main');

const db = mysql.createConnection(dbConfig);

exports.getProfile = (req, res) => {
  const { first_name, last_name, email, phone } = req.user;

  res.json({ first_name, last_name, email, phone });
}

exports.updateProfile = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;

  const q = `UPDATE users
              SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', phone = '${phone}'
              WHERE id = ${req.user.id};`;


  db.query(q, (err, results) => {
    if (err) res.json({ err });
    res.json({ first_name, last_name, email, phone });
  });
}
