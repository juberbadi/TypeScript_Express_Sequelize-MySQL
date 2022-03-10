// import  UserSchema  from '../model/User';
const UserSchema = require("../model/User").UserSchema;

import { JWT_KEY } from "../config/index.js";
import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Request } from "express";

const { Strategy } = passportJwt;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }

  return jwt;
};
const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};
export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      await UserSchema.findByPk(payload.userId)
        .then((user) => {
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};

// const optionsJwt = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: SECRET,
// };

// export default (passport: PassportStatic) => {
//   passport.use(
//     new Strategy(optionsJwt, async (payload, done) => {
//       await User.findById(payload.uid)
//         .then((user) => {
//           user ? done(null, user) : done(null, false);
//         })
//         .catch(() => done(null, false));
//     })
//   );
// };

// for http only cookie system
