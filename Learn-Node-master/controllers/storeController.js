const mongoose = require('mongoose');
const Store = mongoose.model('Store');



exports.myMiddleware = (req, res, next) => {
	req.messageMiddleware = 'Hello from Middleware';
	next();
};

exports.homePage = (req, res) => {
	console.log(req.messageMiddleware);
	res.render('hello', {name: 'wes', dog: 'Puppy'});
};

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store'});
};

exports.createStore = async (req, res) => {
	const store = new Store(req.body);
	await store.save();
	res.redirect('/');
};