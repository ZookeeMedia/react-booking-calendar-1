const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('mysql');
const { secret, dbConfig } = require('../config/main');
const bcrypt = require('bcrypt-nodejs');

const db = mysql.createConnection(dbConfig);

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (email, password, done) => {
    const q = `SELECT * FROM users WHERE email="${email}"`;
    db.query(q, (err, results) => {
      if (err) {
        return done(err);
      } else if (results.length === 0) {
        return done(null, false, { message: 'Incorrect email.'});
      }
      bcrypt.compare(password, results[0].password, (error, isMatch) => {
        if (!isMatch) { return done(null, false, { message: 'Incorrect password.'}); }
        return done(null, results[0]);
      });
    });
  }
));

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
  const q = `SELECT * FROM users WHERE id="${jwt_payload.sub}"`;
  db.query(q, (err, results) => {
    if (err) {
      return done(err, false);
    }
    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      return done(null, false);
    }
  });
}));
