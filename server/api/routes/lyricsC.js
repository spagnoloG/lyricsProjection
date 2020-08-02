import express from 'express';
import LyricC from '../models/LyricCategory';
const router  = express.Router();

// Get all categories
router.get('/', async(req, res) => {
  try {
      const categories = await LyricC.find();
      res.json(categories);
  } catch (err) {
      res.json({ message: err.message });
  }
});

// Submit category
router.post('/', async(req,res) => {
  const lyricC = new LyricC({
    category: req.body.category
  });

  await lyricC.validate();
  try {
      const storedCategory = await lyricC.save();
      res.json(storedCategory);
  } catch (err) {
      res.json({ message: err.message });
  }
});

// Delete specific category
  router.delete('/:recievedCategory', async(req, res) => {
    try {
        const category = await LyricC.deleteOne({category: req.params.recievedCategory});
        res.json(category);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;