const path = require('path');

const router = require('express').Router();

router.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
});

module.exports = router;