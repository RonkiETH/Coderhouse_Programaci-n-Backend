const passport = require("passport");
const local = require("passport-local");
const userModel = require("../models/User");
const { isValidPasswd } = require("../utils/encrypt");

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        console.log(
          "🚀 ~ file: passport.config.js:17 ~ username: REGISTER STRATEGY",
          username
        );

        const { first_name, last_name, email, age } = req.body;

        try {
          let user = await userModel.findOne({ email });
          console.log("🚀 ~ file: passport.config.js:19 ~ user:", user);
          if (user) {
            // el usuario existe
            return done(null, false);
          }
          const pswHashed = await createHash(password);

          const addUser = {
            first_name,
            last_name,
            email,
            age,
            password: pswHashed,
          };

          const newUser = await userModel.create(addUser); // promesa

          if (!newUser) {
            return res
              .status(500)
              .json({ message: `we have some issues register this user` });
          }

          return done(null, newUser);
        } catch (error) {
          return done(`error getting user ${error}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          console.log("***LOGIN STRATEGY***");
          const user = userModel.findOne({ email: username });

          if (!user) {
            // TODO: User does not exist in DB
            return done(null, false);
          }
          if (!isValidPasswd(passport, user.password)) {
            // TODO: User password it not the same in DB
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          console.log("🚀 ~ file: passport.config.js:73 ~ error:", error);

          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById({ _id: id });
    done(null, user);
  });
};

module.exports = initializePassport;
