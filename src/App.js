import React, { useEffect, useState } from "react";
import SensorChart from "../components/SensorChart";

function App() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Step 1: Login to get JWT
      const loginRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "demo", password: "demo" })
      });
      const { token } = await loginRes.json();
      setToken(token);

      // Step 2: Use JWT to fetch sensor data
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/data/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sensor Dashboard</h2>

      {/* Chart */}
      {data.length > 0 && <SensorChart readings={data} />}

      {/* List */}
      <ul>
        {data.map((r) => (
          <li key={r.timestamp}>
            {r.timestamp}: {r.temperature}°C / {r.humidity}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;