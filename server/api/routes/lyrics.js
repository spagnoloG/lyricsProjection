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
    }
});

// Submit lyric:)
router.post('/', async(req,res) => {
    console.log(req.body);
    const lyric = new Lyric({
        index: Number(req.body.index),
        title: String(req.body.title),
        content: String(req.body.content)
    });
    await lyric.validate();
    try {
        const storedLyric = await lyric.save();
        res.json(storedLyric);
    } catch (err) {
        res.json({ message: err.message });
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
    }
});

// Update specific lyric
router.patch('/:lyricIndex', async(req, res) => {
    let lyricIndex = {
        index: Number(req.params.lyricIndex)
    }
    let updatedData = {
        title: req.body.title,
        content: req.body.content
    }
    try {
        const updatedLyric = await Lyric.updateOne(
            lyricIndex, { $set: updatedData });
        res.json(updatedLyric);
        
    } catch(err) {
        res.json({ message: err.message });
    }

});


module.exports = router;