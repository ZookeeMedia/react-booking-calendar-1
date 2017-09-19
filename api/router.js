const passport = require('passport');
const authentication = require('./controllers/authentication');
const availability = require('./controllers/availability');
const bookings = require('./controllers/bookings');
const passportService = require('./services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {

  // Auth routes //

  // login
  app.post('/login', requireSignin, authentication.login);
  // signup
  app.post('/signup', authentication.signup);

  // Availability Routes //

  // get availability of a certain month
  app.get('/availability', requireAuth, availability.month);

  // Booking Routes //

  // get bookings done by a user
  app.get('/bookings', requireAuth, bookings.getBookings);
  // let user make booking
  app.post('/bookings', requireAuth, bookings.makeBooking);
  // let user delete booking
  app.delete('/bookings/:id', requireAuth, bookings.deleteBooking);
}
