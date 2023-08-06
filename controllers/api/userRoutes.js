const router = require("express").Router();
const { User, Event } = require("../../models");

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log("found user");
    if (!userData) {
      res.status(400).json({ message: "Incorrect username, please try again" });
      return;
    }
    console.log(userData);

    const validPassword = userData.checkPassword(req.body.password);
    console.log("password is valid");
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// create user
router.post("/signup", async (req, res) => {
  try {
    // validate form inputs
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      console.log(username, email, password);
      return res
        .status(400)
        .json({ message: "Username, email, and password are required." });
    }

    // check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }
    // sign up new user
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: ["username"],
      include: {
        model: Event,
        attributes: ["name"],
      },
    });
    console.log("valid user");
    if (!userData) {
      res.status(404).json({ message: "There is no User with that ID" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
