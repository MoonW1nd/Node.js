const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: 'Failed log in!',
	successRedirect: '/',
	successFlash: 'You are now logged in!'
});

exports.logout = (req ,res) => {
	req.logout();
	req.flash('success', 'You are now logged out!')
	res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
		return;
	}
	req.flash('error', 'Ooops you must be logged in to do this!');
	res.redirect('/login');
};

exports.forgot = async (req, res) => {
	//see if a user with that a email exist
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		req.flash('error', 'No account with that email exists.')
		return res.redirect('/login')
	}
	//set reset tokens and expiry on their account
	user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordExpires = Date.now() + 3600000; //1 hour form now
	await user.save();
	
};