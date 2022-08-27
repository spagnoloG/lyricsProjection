const mongoose = require('mongoose');
const App = require('../models/App');

exports.app_state_on_init = (req, res, next) => {
  const app = new App({
    _id: mongoose.Types.ObjectId(),
    appName: req.body.appName ? req.body.appName : null,
    organisation: req.body.organisation,
    marginLeft: req.body.marginLeft ? req.body.marginLeft : null,
    marginRight: req.body.marginRight ? req.body.marginRight : null
  })

  app.save()
    .then(result => {
      res.status(201).json({
        message: 'Inital App State Stored!',
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
}

exports.app_state_get_state = (req, res, next) => {
  App.find()
    .select('_id appName organisation marginLeft marginRight')
    .then(doc => {
      if (doc) {
        res.status(200).json({
          state: doc[0]
        })
      } else {
        res.status(404).json({ message: 'App state not found!' })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.app_state_update_state = (req, res, next) => {
  const stateId = req.params.stateId;
  const props = req.body
  App.updateOne({ _id: stateId }, props)
    .then(result => {
      res.status(200).json({
        message: 'State updated',
      }
      )
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}
