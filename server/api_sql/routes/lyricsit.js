import express from "express";
import db from "../knex/db";
const router = express.Router();

// Fetch all titles and indexes,
// but not the content
router.get("/", async (req, res) => {
  db("lyrics")
    .select("_id", "title", "categories")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;