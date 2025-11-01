const express = require('express');
const axios = require('axios');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');
const SearchLog = require('../models/SearchLog');

// POST /api/search
router.post('/search', ensureAuth, async (req, res) => {
  try {
    const { term, page = 1, per_page = 20 } = req.body;
    if (!term) return res.status(400).json({ error: 'term required' });

    await SearchLog.create({ userId: req.user._id, term });

    const resp = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: term, page, per_page },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });

    res.json({
      term,
      total: resp.data.total,
      results: resp.data.results.map(img => ({
        id: img.id,
        alt: img.alt_description,
        thumb: img.urls.small,
        full: img.urls.full,
        width: img.width,
        height: img.height,
        user: img.user?.name
      }))
    });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/top-searches
router.get('/top-searches', async (req, res) => {
  try {
    const agg = await SearchLog.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json(agg.map(a => ({ term: a._id, count: a.count })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/history
router.get('/history', ensureAuth, async (req, res) => {
  try {
    const logs = await SearchLog.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(100);
    res.json(logs.map(l => ({ term: l.term, timestamp: l.timestamp })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
