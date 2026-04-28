import { useState } from "react";

const BASE_URL = "https://crisisconnect-vxsz.onrender.com"; // 🔥 PUT YOUR RENDER URL

export default function PanicButton({ setAlerts }) {
  const [status, setStatus] = useState("");

  const sendAlert = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const alert = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        time: new Date().toLocaleTimeString(),
      };

      await fetch(`${BASE_URL}/alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert),
      });

      setAlerts((prev) => [...prev, alert]);
      setStatus("✅ Alert Sent!");
    });
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <button onClick={sendAlert} style={styles.btn}>
        🚨 PANIC BUTTON
      </button>
      <p>{status}</p>
    </div>
  );
}

const styles = {
  btn: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(45deg, red, orange)",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    color: "white",
  },
};