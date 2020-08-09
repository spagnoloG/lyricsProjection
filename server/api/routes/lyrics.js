import express from 'express';
import Lyric from '../models/Lyric';
const router  = express.Router();

// Get all the lyrics
router.get('/', async(req, res) => {
    try {
        const lyrics = await Lyric.find();
        res.json(lyrics);
    } catch (err) {
        res.json({ message: err.message });
        console.log(err.message);
    }
});

// Get specific lyric by index
router.get('/:lyricIndex', async(req, res) => {
    let lyricIndex = {
        index: Number(req.params.lyricIndex)
    }
    try {
        const lyrics = await Lyric.find(lyricIndex);
        res.json(lyrics);

    } catch (err) {
        res.json({ message: err.message });
        console.log(err.message);
    }
});

// Submit lyric:)
router.post('/', async(req,res) => {
    const lyric = new Lyric({
        index: Number(req.body.index),
        title: String(req.body.title),
        content: String(req.body.content),
        categories: req.body.categories
    });
    await lyric.validate();
    try {
        const storedLyric = await lyric.save();
        res.json(storedLyric);
    } catch (err) {
        res.json({ message: err.message });
        console.log(err.message);
    }
});

// Delete specific lyric :(
router.delete('/:lyricIndex', async(req, res) => {
    let lyricIndex = {
        index: Number(req.params.lyricIndex)
    }
    try {
        const lyrics = await Lyric.deleteOne(lyricIndex);
        res.json(lyrics);

    } catch (err) {
        res.json({ message: err.message });
        console.log(err.message);
    }
});

// Update specific lyric
router.patch('/:lyricIndex', async(req, res) => {
  const lyricIndex = req.params.lyricIndex;
  const props = req.body

  try {
    const updatedLyric = await Psalm.updateOne(
      {index: lyricIndex},
      props
    )
    res.json(updatedLyric);
  } catch(err) {
    res.json({ message: err.message });
    console.log(err.message);
  }
});

module.exports = router;
