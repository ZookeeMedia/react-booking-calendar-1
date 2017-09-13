const mysql = require('mysql');
const { dbConfig, secret } = require('../config/main');

const db = mysql.createConnection(dbConfig);

exports.month = (req, res) => {
  const { month } = req.query;

  const q = `SELECT availability_blocks.id, block, day FROM availability_blocks
              LEFT JOIN booking
                ON availability_blocks.id = booking.availability_block_id
              WHERE booking.availability_block_id IS NULL && MONTH(day)=${month};`;

  db.query(q, (err, results) => {
    if (err) res.json({ err });
    res.json(results);
  });
}
