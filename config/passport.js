const passport = require("passport");
const expassport = require("passport");
const { Strategy } = require ("passport-google-oauth2");

passport.use(new Strategy(
  {
    clientID: "870348742941-inqkhv2smdpbn79pef81oj47l8qnhu17.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL:"https://belajarlogin.herokuapp.com/api/v1/auth/google",
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile)
  }, 
  passport.serializeUser((user, done) => {
    return done(null, user);
  }),
  passport.deserializeUser((user, done) => {
    return done(null, user);
  })
))