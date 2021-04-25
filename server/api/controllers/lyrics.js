const mongoose = require('mongoose');
const Lyric = require('../models/Lyric');

exports.lyrics_new_lyric = (req, res, next) => {
  const lyric = new Lyric({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    categories: req.body.categories ? req.body.categories : null
  })

  lyric.save()
    .then(result => {
      res.status(201).json({
        message: 'Lyric stored',
        request: {
          type: 'GET',
          url: req.get('host') + '/lyrics/' + result._id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.lyrics_get_all_lyrics = (req, res, next) => {
  Lyric.find()
    .select('_id title content categories')
    .then(docs => {
      const response = {
        count: docs.lengh,
        lyrics: docs.map(doc => {
          return {
            _id: doc.id,
            title: doc.title,
            content: doc.content,
            categories: doc.categories
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.lyrics_get_specific_lyric = (req, res, next) => {
  const lyricId = req.params.lyricId;
  Lyric.findById(lyricId)
    .select('_id title content categories')
    .then(doc => {
      if (doc) {
        res.status(200).json({
          lyric: doc
        });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided id!' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.lyrics_update_lyric = (req, res, next) => {
  const lyricId = req.params.lyricId;
  const props = req.body
  // Look into .playlists.js upade playlist comment!
  Lyric.updateOne({ _id: lyricId }, props)
    .then(result => {
      res.status(200).json({
        message: 'Lyric updated!',
        request: {
          type: 'GET',
          url: req.get('host') + '/lyrics/' + lyricId
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.lyrics_delete_lyric = (req, res, next) => {
  const lyricId = req.params.lyricId;
  Lyric.deleteOne({ _id: lyricId })
    .then(result => {
      if (result.n === 0) {
        res.status(404).json({ message: 'No valid entry found for provided id' });
      } else {
        res.status(200).json({
          message: "Lyric successfully deleted!"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}