import { useState, useEffect } from "react";
import PanicButton from "./components/PanicButton";
import MapView from "./components/MapView";
import ChatBox from "./components/ChatBox";
import Dashboard from "./components/Dashboard";
import { socket } from "./socket";

export default function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const audio = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");

    socket.on("new_alert", (data) => {
      setAlerts((prev) => [...prev, data]);

      // 🔔 sound
      audio.play();

      // 🔥 flash effect
      document.body.style.background = "#450a0a";
      setTimeout(() => {
        document.body.style.background = "#0f172a";
      }, 300);
    });

    return () => socket.off("new_alert");
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚨 CrisisConnect</h1>

      <div style={styles.grid}>
        {/* LEFT SIDE */}
        <div style={styles.left}>
          <PanicButton setAlerts={setAlerts} />
          <MapView alerts={alerts} />
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          <ChatBox role="user" />

          {/* 🔥 USER VIEW (no severity shown internally) */}
          <Dashboard alerts={alerts} role="user" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 1,
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    maxHeight: "90vh",
    overflowY: "auto", // 🔥 IMPORTANT (scroll fix)
  },
};