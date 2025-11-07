const express = require('express');
const axios = require('axios');
const { requestCounter, responseHistogram } = require('../metrics');
const router = express.Router();

const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

router.get('/', async (req, res) => {
  const q = req.query.q || req.query.city;
  if (!q) {
    return res.status(400).json({ error: 'Provide city via ?q=cityname' });
  }

  requestCounter.inc();
  const end = responseHistogram.startTimer();

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${OPENWEATHER_KEY}&units=metric`;
    const r = await axios.get(url);

    const data = {
      city: r.data.name,
      country: r.data.sys?.country,
      temp_c: r.data.main?.temp,
      temp_min_c: r.data.main?.temp_min,
      temp_max_c: r.data.main?.temp_max,
      weather: r.data.weather?.[0]?.description,
      wind: r.data.wind
    };

    end({ status: 'success' });
    res.json(data);
  } catch (e) {
    end({ status: 'error' });
    const status = e.response?.status || 500;
    res.status(status).json({ error: e.response?.data || e.message });
  }
});

module.exports = router;
