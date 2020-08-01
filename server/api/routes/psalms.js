import express from 'express';
import Psalm from '../models/Psalm';
const router  = express.Router();

// Get all the Psalms
router.get('/', async(req, res) => {
  try {
      const psalms = await Psalm.find();
      res.json(psalms);
  } catch (err) {
      res.json({ message: err.message });
  }
});

// Get specific Psalm by index
router.get('/:psalmIndex', async(req, res) => {
  let psalmIndex= {
      index: Number(req.params.psalmIndex)
  }
  try {
      const psalms = await Psalm.find(psalmIndex);
      res.json(psalms);

  } catch (err) {
      res.json({ message: err.message });
  }
});

// Submit Psalm
router.post('/', async(req,res) => {
  const psalm = new Psalm({
      index: Number(req.body.index),
      title: String(req.body.title),
      content: String(req.body.content),
      category: String(req.body.category)
  });
  console.log(psalm);
  await psalm.validate();
  try {
      const storedPsalm = await psalm.save();
      res.json(storedPsalm);
  } catch (err) {
      res.json({ message: err.message });
  }
});

// Delete specific Psalm
  router.delete('/:psalmIndex', async(req, res) => {
    let psalmIndex = {
        index: Number(req.params.psalmIndex)
    }
    try {
        const psalms = await Psalm.deleteOne(psalmIndex);
        res.json(psalms);

    } catch (err) {
        res.json({ message: err.message });
    }
});

// Update specific Psalm
router.patch('/:psalmIndex', async(req, res) => {
  const psalmIndex = req.params.psalmIndex;
  const props = req.body

  try {
    const updatedPsalm = await Psalm.updateOne(
      {index: psalmIndex},
      props
    )
    res.json(updatedPsalm);
  } catch(err) {
    res.json({ message: err.message });
  }
});

module.exports = router;