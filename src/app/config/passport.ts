import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../modules/user/user.model";
import { ComparePassword } from "../utils/bcrypt";
import { config } from "./config";
import { TUser } from "../modules/user/user.interface";
import { USER_ROLES } from "../modules/user/user.constant";

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

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: config.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: config.GOOGLE_OAUTH_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(null, false, {
            message: "No email found in Google profile.",
          });
        }

        let isUserExist = (await UserModel.isUserExist(
          email,
          true,
        )) as TUser | null;
        if (!isUserExist) {
          // If user does not exist, create a new user
          isUserExist = await UserModel.create({
            name: profile.displayName,
            email,
            role: USER_ROLES.USER,
            auths: [{ provider: "google", providerId: profile.id }],
            isVerified: true,
            isPasswordSet: false,
          });
        }
        if (isUserExist && isUserExist.isDeleted) {
          return done(null, false, { message: "User account is deleted." });
        }
        if (isUserExist && !isUserExist.isActive) {
          return done(null, false, { message: "User account is not active." });
        }

        const googleAuth = (isUserExist as TUser).auths?.some(
          (auth) => auth.provider === "google",
        );
        if (!googleAuth) {
          return done(null, false, { message: "User account is not active." });
        }

        return done(null, isUserExist);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
