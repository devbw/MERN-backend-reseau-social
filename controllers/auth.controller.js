const UserModel = require('../models/user.model')

exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password});
    res.status(201).json({ user: user._id})
  }
  catch(err) {
    res.status(500).send({ err })
  }
}