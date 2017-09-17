const mysql = require('mysql');
const { dbConfig, secret } = require('../config/main');

const db = mysql.createConnection(dbConfig);

exports.byUser = (req, res) => {
  const { id } = req.user;

  const q = `SELECT availability_blocks.id, block, day FROM availability_blocks
              LEFT JOIN bookings
                ON availability_blocks.id = bookings.availability_block_id
              WHERE bookings.user_id=${id};`;

  db.query(q, (err, results) => {
    if (err) res.json({ err });
    res.json({results, user: req.user.id});
  });
}

exports.makeBooking = (req, res) => {
  const { id } = req.user;
  const { blockIds } = req.body;
  console.log(blockIds)

  const booking = blockIds.map(blockId => [blockId, id, 'pending'])

  const q = `INSERT INTO bookings(availability_block_id, user_id, status) VALUES ?`;

  db.query(q, [booking], (err, results) => {
    if (err) res.json({ err });
    res.json(results);
  });
}
