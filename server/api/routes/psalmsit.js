import express from 'express';
import Psalm from '../models/Psalm';
const router  = express.Router();

// Fetch all titles and indexes,
// but not the content
router.get('/', async(req, res) => {
  try {
    const psalms = await Psalm.find()
      .select('index title categories');
      res.json(psalms);
  } catch (err) {
      res.json({ message: err.message });
  }
});

module.exports = router;