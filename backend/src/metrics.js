const client = require('prom-client');
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// total requests counter
const requestCounter = new client.Counter({
  name: 'is_weather_requests_total',
  help: 'Total number of weather requests'
});
register.registerMetric(requestCounter);

const responseHistogram = new client.Histogram({
  name: 'is_weather_response_duration_seconds',
  help: 'Response time in seconds',
  labelNames: ['status'],   // ✅ Add this line
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

register.registerMetric(responseHistogram);

module.exports = { register, requestCounter, responseHistogram };
