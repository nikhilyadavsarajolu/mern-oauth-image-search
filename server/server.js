require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (must include credentials)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Session config (keep sameSite: 'lax' for local testing)
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,  // true only if HTTPS
    sameSite: 'lax', // 'none' only needed if HTTPS and cross-domain
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

//  MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(conn => {
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    app.listen(process.env.PORT || 5000, () => 
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error('❌ DB error:', err.message));
