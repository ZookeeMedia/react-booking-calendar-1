const mysql = require('mysql');
const { dbConfig, secret } = require('../config/main');

const db = mysql.createConnection(dbConfig);

exports.byUser = (req, res) => {
  const { id } = req.user;

  const q = `SELECT availability_blocks.id, block, day FROM availability_blocks
              LEFT JOIN booking
                ON availability_blocks.id = booking.availability_block_id
              WHERE booking.user_id=${id};`;

  db.query(q, (err, results) => {
    if (err) res.json({ err });
    res.json(results);
  });
}
