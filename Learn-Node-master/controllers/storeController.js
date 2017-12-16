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

exports.editStore = async (req, res) => {
	//TODO:[A.Ivankov] 1. find the store given id
	const store = await Store.findOne({_id: req.params.id});
	//TODO:[A.Ivankov] 2. confirm they are the owner of the store
	res.render('editStore', { title: `Edit ${ store.name }`, store })
	//TODO:[A.Ivankov] 3. render out edit form so the user can update their store
};

exports.updateStore = async (req, res) => {
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash('success', `Success update <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View store</a>`);
	res.redirect(`store/${store.id}/edit`);
};