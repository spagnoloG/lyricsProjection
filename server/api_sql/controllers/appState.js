const db = require('../knex/db');

exports.app_state_on_init = (req, res, next) => {
  db('app')
    .insert({
      appName: req.body.appName ? req.body.appName : null,
      organisation: req.body.organisation,
      marginLeft: req.body.marginLeft ? req.body.marginLeft : null,
      marginRight: req.body.marginRight ? req.body.marginRight : null
    })
    .then(result => {
      res.status(201).json({
        message: 'Inital App State Stored!',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.app_state_get_state = (req, res, next) => {
  db('app')
    .select('_id', 'appName', 'organisation',  'marginLeft', 'marginRight')
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
  const props = req.body;

  db('app').where({ _id: stateId})
    .update(props, ['_id'])
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
