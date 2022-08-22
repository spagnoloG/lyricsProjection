const db = require("../knex/db");

exports.playlists_new_playlist = (req, res, next) => {
  const playlist = {
    ids: req.body.ids,
    playlistName: req.body.playlistName,
    playlistDescription: req.body.playlistDescription
      ? req.body.playlistDescription
      : null,
  };

  db("playlists")
    .insert(playlist)
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: "Playlist stored!",
        request: {
          type: "GET",
          url: req.get("host") + "/playlists/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.playlists_get_all_playlists = (req, res, next) => {
  db("playlists")
    .select("_id", "ids", "playlistName", "playlistDescription")
    .then((docs) => {
      const response = {
        count: docs.length,
        playlists: docs.map((doc) => {
          return {
            _id: doc._id,
            ids: doc.ids,
            playlistName: doc.playlistName,
            playlistDescription: doc.playlistDescription,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.playlists_get_specific_playlist = (req, res, next) => {
  const playlistId = req.params.playlistId;
  db("playlists")
    .where("_id", "=", playlistId)
    .select("_id", "ids", "playlistName", "playlistDescription")
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          playlist: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided id!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.playlists_update_playlist = (req, res, next) => {
  const playlistId = req.params.playlistId;
  const props = req.body;
  // This part of code checks for changed data,
  // if one change is given, one variable will change,
  // if two,three variable changes are given,
  //  two, three variables will be changed in db
  db("playlists")
    .where("_id", "=", playlistId)
    .update(props, ["_id"])
    .then((result) => {
      res.status(200).json({
        message: "Playlist updated!",
        request: {
          type: "GET",
          url: req.get("host") + "/playlists/" + playlistId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.playlists_delete_playlist = (req, res, next) => {
  const playlistId = req.params.playlistId;

  db("lyrics")
    .where("_id", playlistId)
    .del(["_id"])
    .then((result) => {
      if (result.n === 0) {
        res
          .status(404)
          .json({ message: "No valid entry found for provided id" });
      } else {
        res.status(200).json({
          message: "Playlist successfully deleted!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};