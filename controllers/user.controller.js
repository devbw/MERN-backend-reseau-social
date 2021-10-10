const userModele = require("../models/user.model");
const mongoose = require("mongoose");

exports.getAllUsers = async (req, res) => {
  const users = await userModele.find().select("-password");
  res.send(200).json(users);
};

exports.userInfo = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("ID unknown :" + req.params.id);
  }

  userModele
    .findById(req.params.id, (err, docs) => {
      !err ? res.send(docs) : res.status(401).send(err);

      /*if (!err) res.send(docs);
    else console.log('ID Unknown: ' + err);*/
    })
    .select("-password");
};

exports.updateUser = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("ID unknown :" + req.params.id);
  }

  try {
    userModele.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("ID unknown :" + req.params.id);
  }

  try {
    await userModele.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.follow = (req, res) => {
  if (
    !mongoose.isValidObjectId(req.params.id) ||
    !mongoose.isValidObjectId(req.body.idToFollow)
  ) {
    return res.status(400).send("ID unknown :" + req.params.id);
  }

  try {
    userModele.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { following: req.body.idToFollow },
      },
      {
        new: true,
        upsert: true,
      },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    userModele.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      {
        new: true,
        upsert: true,
      },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.unfollow = async (req, res) => {
  if (
    !mongoose.isValidObjectId(req.params.id) ||
    !mongoose.isValidObjectId(req.body.idToUnfollow)
  ) {
    return res.status(400).send("ID unknown :" + req.params.id);
  }

  try {
    userModele.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { following: req.body.idToUnfollow },
      },
      {
        new: true,
        upsert: true,
      },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    userModele.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      {
        new: true,
        upsert: true,
      },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
