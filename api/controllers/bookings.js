const mysql = require('mysql');
const { dbConfig, secret } = require('../config/main');

const db = mysql.createConnection(dbConfig);

exports.getBookings = (req, res) => {
  const { id, role } = req.user;

  let q = '';

  if (role === 'user') {
    q = `SELECT availability_blocks.id, block, day FROM availability_blocks
                LEFT JOIN bookings
                  ON availability_blocks.id = bookings.availability_block_id
                WHERE bookings.user_id=${id}
                ORDER BY day, block;`;
  } else if (role === 'admin') {
    q = `SELECT availability_blocks.id, block, day, email, first_name, last_name, phone FROM availability_blocks
                 JOIN bookings
                  ON availability_blocks.id = bookings.availability_block_id
                 JOIN users
                  ON bookings.user_id = users.id
                ORDER BY day, block;`;
  }

  db.query(q, (err, results) => {
    if (err) res.json({ err });
    res.json({results, user: req.user.id});
  });
}

exports.makeBooking = (req, res) => {
  const { id } = req.user;
  const { blockIds } = req.body;

  const booking = blockIds.map(blockId => [blockId, id, 'granted'])

  const q = `INSERT INTO bookings(availability_block_id, user_id, status) VALUES ?`;

  db.query(q, [booking], (err, results) => {
    if (err) res.json({ err });
    res.json(results);
  });
}

exports.deleteBooking = (req, res) => {
  const userId = req.user.id;
  const bookingId = req.params.id;

  let q =  '';

  if (req.user.role === 'user') {
    q = `DELETE FROM bookings WHERE availability_block_id=${bookingId} && user_id=${userId}`;
  } else if (req.user.role === 'admin') {
    q = `DELETE FROM bookings WHERE availability_block_id=${bookingId}`;
  }

  console.log(q)
  db.query(q, (err, results) => {
    if (err) res.json({ err });
    res.json(results);
  });
}
