import { useState, useEffect } from "react";
import { socket } from "./socket";
import MapView from "./components/MapView";
import ChatBox from "./components/ChatBox";
import Dashboard from "./components/Dashboard";

export default function Admin() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("new_alert", (data) => {
      setAlerts((prev) => [...prev, data]);
    });

    return () => socket.off("new_alert");
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👮 Responder Dashboard</h1>

      {/* 🗺 Map */}
      <MapView alerts={alerts} />

      {/* 💬 Chat */}
      <div style={styles.section}>
        <ChatBox role="admin" />
      </div>

      {/* 🚨 Alerts */}
      <div style={styles.section}>
        <Dashboard alerts={alerts} role="admin" />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#020617",
    color: "white",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  section: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
  },
};