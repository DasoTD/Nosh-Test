const bcrypt = require("bcryptjs");
const UserModel = require("../../models/User");
const { authenticate } = require("../../middlewares");
const { getTries, clearTries } = require("../../redis");
const {  SALT } = require("../../config");

const signUp = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      dob,
      email,
      username,
      password,
      phone,
      country,
      telephoneCode,
      gender,
    } = req.body;
    
    let user = await UserModel.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone },
        { username: username.toLowerCase() },
      ],
    });

    if (user) {
      return res.json("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(
      password.toString(),
      Number(SALT)
    );
    user = await UserModel.create({
      firstname,
      lastname,
      dob,
      email: email.toLowerCase(),
      phone,
      username: username.toLowerCase(),
      password: encryptedPassword,
      country,
      telephoneCode,
      gender,
    });
    console.log(user)

    const response = {
      message: "Your sign up was successful",
      user,
    };

    return res.json(
      user
    );
  } catch (error) {
    return error.message
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    

    const user = await UserModel.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() },
      ],
    });

    if (!user) {
      return res.json(
        'User does not exist'
      );
    }

    if (user.status === "BLOCKED") {
      return res.json(
        'User account has been blocked'
      );
    }

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      const loginTries = await getTries(username, "login");
      if (loginTries && loginTries >= 3) {
        user.status = "BLOCKED";
        user.accessToken = "";
        await user.save();
      } 
      const message =
        loginTries < 3
          ? `You have ${3 - loginTries} more ${
              3 - loginTries > 1 ? "tries" : "try"
            }`
          : "Your account has been blocked";

      return res.json(
        `User authentication failed. ${message}`
      );
    }
    clearTries(username, "login");
    clearTries(username, "transactionPin");
    clearTries(username, "securityQuestion");
    clearTries(username, "changePassword");
    clearTries(user._id, "validateUser");

    

    if (user.accessToken) {
      return res.json(
        `User is already logged in`
      );
    }

    const accessToken = await authenticate(user);
    const refreshToken = await bcrypt.hash(accessToken, Number(SALT));

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    await user.save();

   

    const response = {
      message: "User login is successful",
      user,
    };

    return res.json(
      response
    );
  } catch (error) {
    return res.json(
      error.message
    );
  }
};

const signOut = async (req, res) => {
  try {
    const user = req.user;

    user.refreshToken = null;
    user.accessToken = null;
    await user.save();

    const response = {
      message: "User sign out is successful",
    };

    return res.json(
      response
    );
  } catch (error) {
    return res.json(
      error.message
    );
  }
};




module.exports = {
  signUp,
  login,
  signOut
};
