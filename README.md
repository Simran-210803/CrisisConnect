# 🚨 CrisisConnect

An **AI-powered real-time emergency response system** that connects users in distress with responders using live location, instant alerts, and intelligent severity detection.

---

## 📌 Problem Statement

Emergency response systems often suffer from:

- ❌ Delayed communication
- ❌ Lack of real-time coordination
- ❌ No prioritization of critical situations

---

## 💡 Solution

CrisisConnect provides:

- 🚨 One-tap panic alert
- 📍 Live location sharing
- 💬 Real-time communication
- 🤖 AI-based severity detection

---

## 🚀 Features

- 🚨 Panic Button (Instant Alert)
- 📍 Live Location Tracking (Map)
- 💬 Real-time Chat System
- 🔔 Instant Notifications (Socket.io)
- 🤖 AI Severity Detection (Google Gemini)
- 👤 User Dashboard
- 👮 Responder Dashboard

---

## 🧠 AI Integration

We use **Google Gemini AI** to classify emergency messages into:

- 🔴 HIGH → fire, explosion, attack
- 🟠 MEDIUM → injury, help
- 🟢 LOW → minor issues

---

## 🏗️ Tech Stack

### Frontend

- React (Vite)
- React Leaflet (Maps)

### Backend

- Flask
- Flask-SocketIO
- Eventlet

### AI

- Google Gemini API

---

## 🔄 How It Works

### 🚨 Alert Flow

1. User clicks panic button
2. Location is captured
3. Alert sent to backend
4. Admin dashboard receives alert
5. Map updates in real-time

### 💬 Chat Flow

1. User sends message
2. Backend processes message
3. Gemini AI detects severity
4. Admin receives message
5. Admin replies in real-time

---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside backend folder:

```env
GEMINI_API_KEY=your_api_key_here
```

Run backend:

```bash
python app.py
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 🌐 Run Application

User Dashboard:
http://localhost:5173/

Responder Dashboard:
http://localhost:5173/admin

## 👩‍💻 Author

**Simranpreet Kaur**  
🔗 GitHub: https://github.com/Simran-210803
