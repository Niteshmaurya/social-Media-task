const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, socialId } = req.body;

    if (!name || !socialId) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    const user = await User.create({
      name,
      socialId,
      images: imagePaths,
    });

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
