const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user);
    } catch (err) { done(err); }
  });

  // Google
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || null;
        let user = await User.findOne({ $or: [{ providerId: profile.id }, { email }] });
        if (user) {
          user.provider = 'google';
          user.providerId = profile.id;
          user.name = user.name || profile.displayName;
          user.photo = user.photo || profile.photos?.[0]?.value;
          await user.save();
          return done(null, user);
        }
        user = await User.create({
          provider: 'google',
          providerId: profile.id,
          name: profile.displayName,
          email,
          photo: profile.photos?.[0]?.value
        });
        return done(null, user);
      } catch (err) { done(err); }
    }));
  }

  // GitHub
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
      scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || null;
        let user = await User.findOne({ $or: [{ providerId: profile.id }, { email }] });
        if (user) {
          user.provider = 'github';
          user.providerId = profile.id;
          user.name = user.name || profile.displayName || profile.username;
          user.photo = user.photo || profile.photos?.[0]?.value;
          await user.save();
          return done(null, user);
        }
        user = await User.create({
          provider: 'github',
          providerId: profile.id,
          name: profile.displayName || profile.username,
          email,
          photo: profile.photos?.[0]?.value
        });
        return done(null, user);
      } catch (err) { done(err); }
    }));
  }

  // Facebook
  if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'emails']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || null;
        let user = await User.findOne({ $or: [{ providerId: profile.id }, { email }] });
        if (user) {
          user.provider = 'facebook';
          user.providerId = profile.id;
          user.name = user.name || profile.displayName;
          user.photo = user.photo || profile.photos?.[0]?.value;
          await user.save();
          return done(null, user);
        }
        user = await User.create({
          provider: 'facebook',
          providerId: profile.id,
          name: profile.displayName,
          email,
          photo: profile.photos?.[0]?.value
        });
        return done(null, user);
      } catch (err) { done(err); }
    }));
  }
};
