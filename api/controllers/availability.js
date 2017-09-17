const mysql = require('mysql');
const { dbConfig, secret } = require('../config/main');

const db = mysql.createConnection(dbConfig);

exports.month = (req, res) => {
  const { month } = req.query;
  const { year } = req.query;

  const q = `SELECT availability_blocks.id, block, day FROM availability_blocks
              LEFT JOIN bookings
                ON availability_blocks.id = bookings.availability_block_id
              WHERE bookings.availability_block_id IS NULL && MONTH(day)=${month} && YEAR(day)=${year};`;

  db.query(q, (err, results) => {
    if (err) res.json({ err });
    res.json(results);
  });
}
