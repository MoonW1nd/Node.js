const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if (isPhoto) {
			next(null, true);
		} else {
			next({message: 'That file type isn\'t allowed!'}, false);
		}
	}
};

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store'});
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
	// check no file for resize
	if (!req.file) {
		next(); //skip to the next middleware
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);
	// once we have written the photo to our filesystem, keep going!
	next();
};

exports.createStore = async (req, res) => {
	req.body.author = req.user._id;
	const store = await (new Store(req.body)).save();
	req.flash('success', `Successfully Created ${store.name}. Care to leave in review?`);
	res.redirect(`/store/${store.slug}`);
};


exports.getStores = async (req, res) => {
	const stores = await Store.find();
	res.render('stores', { title: 'Stores', stores });
};

const confirmOwner = (store, user) => {
	if (!store.author.equals(user._id)) {
		throw Error('You must own a store in order to edit it!')
	}
};

exports.editStore = async (req, res) => {
	//TODO:[A.Ivankov] 1. find the store given id
	const store = await Store.findOne({_id: req.params.id});
	//TODO:[A.Ivankov] 2. confirm they are the owner of the store
	confirmOwner(store, req.user);
	res.render('editStore', { title: `Edit ${ store.name }`, store })
	//TODO:[A.Ivankov] 3. render out edit form so the user can update their store
};

exports.updateStore = async (req, res) => {
	req.body.location.type = 'Point';
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash('success', `Success update <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View store</a>`);
	res.redirect(`store/${store.id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
	const store = await Store.findOne({slug: req.params.slug}).populate('author');
	if (!store) return next();
	res.render('store', {store, title: store.name});
};

exports.getStoreByTag = async (req, res) => {
	const tag = req.params.tag;
	const tagQuery = tag || { $exists: true };
	const tagsPromise  = Store.getTagsList();
	const storePromise = Store.find({ tags: tagQuery });
	const [ stores, tags ] = await Promise.all([ storePromise, tagsPromise ]);
	res.render('tags', { tags, title: 'Tags', tag, stores });
};

exports.searchStores = async (req, res) => {
	const stores = await Store.find({
		$text: {
			$search: req.query.q
		}
	}, {
		score: { $meta: 'textScore' }
	})
		//sort query result by score
		.sort({
			score: { $meta: 'textScore' }
		})
	// limit to only 5 result
		.limit(5);
	res.json(stores);
};

exports.mapStores = async (req, res) => {
	const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
	const q = {
		location: {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates
				},
				$maxDistance: 10000 // 10km
			}
		}
	};
	const stores = await Store.find(q).select('slug name description location').limit(10);
	res.json(stores);
};

exports.mapPage = (req, res) => {
	res.render('map', { title: 'Map' });
};

exports.heartStore = async (req, res) => {
	const hearts = req.user.hearts.map(obj => obj.toString());
	const operator = hearts.includes(req.params.id) ? '$pull': '$addToSet';
	const user = await User.findOneAndUpdate(req.user._id,
		{[operator]: { hearts: req.params.id }},
		{ new: true }
	);
	res.json(user);
};