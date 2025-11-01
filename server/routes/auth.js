const express = require('express');
const passport = require('passport');
const router = express.Router();

const CLIENT = process.env.CLIENT_URL || 'http://localhost:3000';

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: CLIENT + '/login' }),
  (req, res) => res.redirect(CLIENT + '/dashboard')
);

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: CLIENT + '/login' }),
  (req, res) => res.redirect(CLIENT + '/dashboard')
);

// Facebook
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: CLIENT + '/login' }),
  (req, res) => res.redirect(CLIENT + '/dashboard')
);

router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) return next(err);
      if (req.session) {
        req.session.destroy(() => {
          res.clearCookie('connect.sid');
          return res.status(200).json({ message: 'Logged out successfully' });
        });
      } else {
        return res.status(200).json({ message: 'No session found, but logged out.' });
      }
    });
  } else {
    return res.status(200).json({ message: 'Already logged out' });
  }
});

router.get('/me', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.json({ user: null });
  }
  return res.json({ user: req.user });
});

module.exports = router;
