import express, { response } from "express";
import db from "../knex/db";
const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  db("lyric-category")
    .select("*")
    .then((reponse) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Submit category
router.post("/", async (req, res) => {
  const lyricC = {
    category: req.body.category,
  };

  db("lyric-category")
    .insert(lyricC)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Delete specific category
router.delete("/:recievedCategory", async (req, res) => {
  db("lyric-category")
    .where("category", "=", req.params.recievedCategory)
    .del(["_id"])
    .then((result) => {
      if (result.n === 0) {
        res
          .status(404)
          .json({ message: "No valid entry found for provided id" });
      } else {
        res.status(200).json({
          message: "Lyric successfully deleted!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
