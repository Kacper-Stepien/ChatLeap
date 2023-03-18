const User = require("./../models/userModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}; // Create empty object
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.signUp = async (req, res, next) => {
  try {
    const { name, surname, email, nick, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      name,
      surname,
      email,
      nick,
      password,
      passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      //   message: error,
      message: "Nie udało się utworzyć użytkownika",
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
        length: users.length,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Nie znaleziono użytkowników",
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Nie znaleziono użytkownika",
    });
  }
};

exports.getUserByNick = async (req, res, next) => {
  try {
    const user = await User.findOne({ nick: req.params.nick });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Nie znaleziono użytkownika",
    });
  }
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    res.status(400).json({
      status: "fail",
      message:
        "Nie można zmienić hasła przez tę metodę. Użyj /updateMyPassword",
    });
  }
  try {
    const filteredBody = filterObj(
      req.body,
      "name",
      "surname",
      "email",
      "nick"
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true, // Return updated document
        runValidators: true, // Run validators on update
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Nie udało się zaktualizować użytkownika",
    });
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Nie udało się usunąć użytkownika",
    });
  }
};
