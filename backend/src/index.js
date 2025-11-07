import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import client from "prom-client";

const app = express();
app.use(cors()); // Enable cross-origin requests
const PORT = 5000;

// Prometheus setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 200, 300, 400, 500, 1000],
});
register.registerMetric(httpRequestDurationMicroseconds);

// Middleware for metrics
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => end({ method: req.method, route: req.originalUrl, status_code: res.statusCode }));
  next();
});

// Weather route
app.get("/api/weather", async (req, res) => {
  const city = req.query.q;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: "City is required" });
  if (!apiKey) return res.status(500).json({ error: "Missing OpenWeather API key" });

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (data.cod !== 200) throw new Error(data.message);
    res.json({
      city: data.name,
      country: data.sys.country,
      temp_c: data.main.temp,
      weather: data.weather[0].description,
      wind: data.wind,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
