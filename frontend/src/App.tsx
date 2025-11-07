import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // ✅ Use the environment variable here:
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/weather?q=${city}`
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || "Invalid response");

      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(120deg, #89f7fe, #66a6ff)",
      }}
    >
      <h1>🌤️ Weather App</h1>

      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            width: "200px",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#333",
            color: "white",
          }}
        >
          Get Weather
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "20px",
            background: "rgba(255,255,255,0.8)",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <p>
            <b>Temperature:</b> {weather.temp_c}°C
          </p>
          <p>
            <b>Condition:</b> {weather.weather}
          </p>
          <p>
            <b>Wind Speed:</b> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
