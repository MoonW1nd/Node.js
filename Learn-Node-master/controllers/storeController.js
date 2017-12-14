const mongoose = require('mongoose');
const Store = mongoose.model('Store');



// exports.myMiddleware = (req, res, next) => {
// 	req.messageMiddleware = 'Hello from Middleware';
// 	next();
// };
//
// exports.homePage = (req, res) => {
// 	console.log(req.messageMiddleware);
// 	res.render('hello', {name: 'wes', dog: 'Puppy'});
// };

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store'});
};

exports.createStore = async (req, res) => {
	const store = await (new Store(req.body)).save();
	req.flash('success', `Successfully Created ${store.name}. Care to leave in review?`);
	res.redirect(`/store/${store.slug}`);
};


exports.getStores = async (req, res) => {
	const stores = await Store.find();
	res.render('stores', { title: 'Stores', stores });
};