const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const wes = {name: 'Alexander', age: 26, cool: true };
  // res.send('Hey! It works!');
  //   res.json(wes);
    res.json(req.query);
});

router.get('/reverse/:name', (req, res) => {
  // res.send('Work here!');
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;
