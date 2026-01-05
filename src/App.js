import React, { useEffect, useState } from "react";

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
      <h1>IoT Sensor Dashboard (PWA)</h1>
      {token ? <p>Authenticated with JWT</p> : <p>Logging in...</p>}
      <ul>
        {data.map((d, i) => (
          <li key={i}>
            {d.timestamp}: {d.temperature}°C / {d.humidity}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;