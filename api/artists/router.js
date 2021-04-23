const router = require('express').Router();
const Artists = require('./model');

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artists.getAll();
    res.json(artists);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
