const passport = require('passport');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Failed log in!',
	successRedirect: '/',
	successFlash: 'You are now logged in!'
});