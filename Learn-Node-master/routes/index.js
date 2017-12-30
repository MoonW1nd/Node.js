const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);

router.post('/add',
	 storeController.upload,
	 catchErrors(storeController.resize),
	 catchErrors(storeController.createStore)
);
router.post('/add/:id',
	 storeController.upload,
	 catchErrors(storeController.resize),
	 catchErrors(storeController.updateStore)
);

router.get('/store/:id/edit', catchErrors(storeController.editStore));


router.get('/reverse//:name', (req, res) => {
	const reverse = [...req.params.name].reverse().join('');
	res.send(reverse);
});

router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoreByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoreByTag));


module.exports = router;
