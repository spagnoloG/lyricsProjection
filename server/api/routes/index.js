// Define your routes
import express from 'express';
import path from 'path';

const router = express.Router();


// Routes go here.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = router;
