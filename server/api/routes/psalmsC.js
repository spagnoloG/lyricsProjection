import express from 'express';
import PsalmC from '../models/PsalmCategory';
const router  = express.Router();

// Get all categories
router.get('/', async(req, res) => {
  try {
      const categories = await PsalmC.find();
      res.json(categories);
  } catch (err) {
      res.json({ message: err.message });
  }
});

// Submit category
router.post('/', async(req,res) => {
  const psalmC = new PsalmC({
    category: req.body.category
  });

  await psalmC.validate();
  try {
      const storedCategory = await psalmC.save();
      res.json(storedCategory);
  } catch (err) {
      res.json({ message: err.message });
  }
});

// Delete specific category
  router.delete('/:recievedCategory', async(req, res) => {
    try {
        const category = await PsalmC.deleteOne({category: req.params.recievedCategory});
        res.json(category);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;