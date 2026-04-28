export default function Dashboard({ alerts, role }) {
  const getColor = (severity) => {
    if (severity?.includes("HIGH")) return "#ef4444";
    if (severity?.includes("MEDIUM")) return "#f97316";
    return "#22c55e";
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🚨 Live Alerts</h2>

      {alerts.length === 0 ? (
        <p>No alerts yet</p>
      ) : (
        alerts.map((a, i) => (
          <div
            key={i}
            style={{
              borderLeft: role === "admin"
                ? `6px solid ${getColor(a.severity)}`
                : "6px solid #3b82f6",
              background: "#1e293b",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            📍 {a.lat.toFixed(4)}, {a.lng.toFixed(4)} <br />
            ⏱ {a.time}

            {/* 🔥 Only admin sees severity */}
            {role === "admin" && (
              <div style={{ marginTop: "5px", color: getColor(a.severity) }}>
                {a.severity}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}