const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

export class Auth {

  constructor() {

    const params = {
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([this.cookieExtractor])
    };

    const authenticationStrategy = new Strategy(params, function (payload, done) {
      // You can check the database to be sure the user has access
      // however it is always smart to make the access_token short lived and refresh if needed
      // In that case you can simply check for the expiry time (which ExtractJWT does for us)
      // In this case the token will live for 24 hours.
      // so when there is no user object the validation has failed.
      const user = payload.user;
      user.permissions = payload.permissions;
      
      if (user) {
        return done(null, user);
      } else {
        return done(new Error('User not found'), null);
      }
    });

    passport.use(authenticationStrategy);
  }


  // Extracts the accessCookie from the request for use with ExtractJWT.
  private cookieExtractor(req) {
    let token = null;
    if (req && req.signedCookies) {
      token = req.signedCookies['access_token'];
    }
    return token;
  }

  initialize() {
    return passport.initialize();
  }


  // Gets called as a middleware for http request you want to secure using the access_token.
  authenticate() {
    return passport.authenticate('jwt', {
      session: false
    });
  }
}

export default new Auth();
