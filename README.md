# AI Event Planner

An intelligent web application that helps you plan events effortlessly — powered by AI-generated themes, schedules, and ideas based on your inputs.

---

##  Features

- 🤖 AI-generated event planning suggestions
- 🗓️ Customized schedules for different event types
- 🎨 Theme and decoration ideas
- 🗺️ Interactive map integration via Leaflet.js
- ⚡ Fast, responsive, and user-friendly interface

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML, CSS, JavaScript   |
| AI API     | Google Gemini API       |
| Maps       | Leaflet.js + OpenStreetMap (no API key required) |
| Deployment | Netlify                 |

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-event-planner.git
cd ai-event-planner
```

### 2. Set up environment variables

Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Important:** Add `.env` to your `.gitignore` to keep your API key out of version control.

### 3. Run the project

Open `index.html` in your browser, or deploy to Netlify.

---

## 🗺️ Map Setup (Leaflet.js)

This project uses **Leaflet.js**, which is free and open-source — **no API key needed**.

Add these to your HTML:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
```

The map tiles are served by **OpenStreetMap**, also free and no key required.

---

##  Usage

1. Enter your event details — type, date, budget, and preferences
2. Click **Generate Plan**
3. Receive an AI-powered event plan with themes and schedule
4. View your previously planned events in the event list

##  Security

- API keys are stored using environment variables
- `.env` is excluded from version control via `.gitignore`



## 📄 License

This project is open-source under the [MIT License](LICENSE).


