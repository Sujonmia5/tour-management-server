import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../modules/user/user.model";
import { ComparePassword } from "../utils/bcrypt";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email: string, password, done) {
      try {
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        if (user.isDeleted) {
          return done(null, false, { message: "User account is deleted." });
        }
        // if (!user.isActive || !user.isVerified) {
        //   return done(null, false, {
        //     message: "User account is not active. please verify first.",
        //   });
        // }
        const googleAuthenticated = user.auths.some(
          (auth) => auth.provider === "google",
        );
        if (googleAuthenticated && !user.isPasswordSet && !user.password) {
          return done(null, false, {
            message:
              "User registered with Google. Please use to Google Sign-In or log in.",
          });
        }
        const isPasswordMatch = ComparePassword(
          password,
          user.password as string,
        );
        if (!isPasswordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        // Remove password field before returning user
        user.password = "";
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
