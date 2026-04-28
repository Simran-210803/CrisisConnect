import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function ChatBox({ role }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // remove old listeners (prevents duplicate messages)
    socket.off("receive_message");

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      text: message,
      role: role,
    });

    setMessage("");
  };

  // 🔥 Quick reply (admin)
  const quickSend = (text) => {
    socket.emit("send_message", {
      text,
      role,
    });
  };

  // 🎨 Severity color
  const getSeverityColor = (severity) => {
    if (severity?.includes("HIGH")) return "#ef4444";
    if (severity?.includes("MEDIUM")) return "#f97316";
    return "#22c55e";
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>💬 Live Chat</h2>

      {/* 🧾 CHAT BOX */}
      <div style={styles.chatBox}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === role ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                ...styles.msg,
                background:
                  msg.role === "admin" ? "#7c3aed" : "#1e293b",
              }}
            >
              <b>
                {msg.role === "admin"
                  ? "👮 Responder"
                  : "👤 User"}
              </b>
              <br />

              {msg.text}

              {/* 🔥 Only admin sees severity */}
              {role === "admin" && msg.role === "user" && (
                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "12px",
                    color: getSeverityColor(msg.severity),
                  }}
                >
                  {msg.severity}
                </div>
              )}

              {/* ✅ Admin reply status */}
              {msg.role === "admin" && (
                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "12px",
                    color: "#22c55e",
                  }}
                >
                  ✔ Responded
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✍️ INPUT */}
      <div style={styles.row}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type emergency message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.btn}>
          Send
        </button>
      </div>

      {/* ⚡ QUICK ACTIONS (ADMIN ONLY) */}
      {role === "admin" && (
        <div style={styles.quickRow}>
          <button
            onClick={() => quickSend("Help is on the way 🚑")}
          >
            🚑 Help
          </button>
          <button
            onClick={() =>
              quickSend("Stay calm, responders arriving 🚓")
            }
          >
            🚓 Calm
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  chatBox: {
    height: "250px",
    overflowY: "auto",
    background: "#0f172a",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  msg: {
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "8px",
    maxWidth: "70%",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "none",
  },
  btn: {
    background: "blue",
    color: "white",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
  },
  quickRow: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
};