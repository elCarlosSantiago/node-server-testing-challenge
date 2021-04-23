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

router.get('/:id', async (req, res, next) => {
  try{
    const artist = await Artists.getById(req.params.id)
    res.json(artist)
  } catch(err) {
    next(err)
  }
})

module.exports = router;
