from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import google.generativeai as genai
import os
from dotenv import load_dotenv

# 🔥 Load environment variables
load_dotenv()

# 🔥 Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

app = Flask(__name__)
CORS(app)

# 🔥 Use threading (works on Render)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

alerts = []

# 🤖 Gemini AI Severity Detection
def detect_severity(message):
    if not message:
        return "LOW 🟢"

    try:
        prompt = f"""
        Classify the severity of this emergency message as HIGH, MEDIUM, or LOW.

        Message: {message}

        Respond with only one word: HIGH, MEDIUM, or LOW.
        """

        response = model.generate_content(prompt)
        result = response.text.strip().upper()

        if "HIGH" in result:
            return "HIGH 🔴"
        elif "MEDIUM" in result:
            return "MEDIUM 🟠"
        else:
            return "LOW 🟢"

    except Exception as e:
        print("Gemini Error:", e)
        return "LOW 🟢"

# 🏠 Home route
@app.route('/')
def home():
    return "Backend Running 🚨"

# 🚨 Alert API
@app.route('/alert', methods=['POST'])
def receive_alert():
    data = request.json

    if not data:
        return jsonify({"error": "No data received"}), 400

    data["time"] = data.get("time", "N/A")
    data["severity"] = "HIGH 🔴"

    alerts.append(data)

    print("New Alert:", data)

    # 🔥 Emit real-time alert
    socketio.emit('new_alert', data)

    return jsonify({"status": "ok"})

# 📡 Get all alerts
@app.route('/alerts', methods=['GET'])
def get_alerts():
    return jsonify(alerts)

# 💬 Chat system
@socketio.on('send_message')
def handle_message(data):
    text = data.get("text")
    role = data.get("role", "user")

    severity = detect_severity(text)

    response = {
        "text": text,
        "role": role,
        "severity": severity
    }

    print("Chat:", response)

    # 🔥 Broadcast chat
    socketio.emit('receive_message', response)

# 🚀 Run server (FIXED FOR RENDER)
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    socketio.run(
        app,
        host="0.0.0.0",
        port=port,
        allow_unsafe_werkzeug=True
    )