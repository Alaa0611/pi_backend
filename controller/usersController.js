const User = require("../models/user");
const Chat = require("../models/chat");

async function add(req, res) {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res) {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showbyid(req, res) {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function showbyname(req, res) {
  try {
    const { username } = req.params; // Fix destructuring
    console.log(username);
    const user = await User.find({ name: username }); // Fix query to use an object

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" }); // Add error response
  }
}

async function deleteusers(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  add,
  show,
  showbyid,
  showbyname,
  deleteusers,
  update,
};
