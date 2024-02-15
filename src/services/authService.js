const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const SECRET = "asdasfasdasd";

exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Cannot find username or password");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("PCannot find username or password");
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

  return token;
};
