const express = require('express');
const router = express.Router();

const appStateController = require('../controllers/appState')

router.post('/', appStateController.app_state_on_init);

router.get('/', appStateController.app_state_get_state);

router.patch('/:stateId', appStateController.app_state_update_state);

module.exports = router;