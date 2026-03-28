# Palmystery 🔮✋

> An open-source, AI-powered palm reading web application that delivers the cold, hard truth—with a heavy dose of sarcasm.

Palmystery brings the ancient art of palmistry into the modern age, but don't expect gentle reassurances here. This is a purely fun, entertainment-focused website. By uploading a clear image of a palm, users receive a hilariously cynical and sarcastic AI-generated reading analyzing their major palm lines (Heart, Head, Life, and Fate lines). Prepare to be mildly roasted about your future!

## 🚀 Features

* **Sarcastic AI Personality:** Expect brutal honesty, witty roasts, and a lot of laughs as the Gemini API creatively misinterprets your destiny.
* **Image Upload & Processing:** A clean, intuitive interface for users to capture or upload photos of their palms.
* **Responsive Design:** Fully responsive UI, ensuring a seamless experience across desktop and mobile devices so you can get roasted anywhere.
* **Fast & Lightweight:** Built for performance with a decoupled frontend and backend architecture.

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| AI | Google Gemini 1.5 Flash |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A [Gemini API Key](https://aistudio.google.com/app/apikey) (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/palmystery.git
cd palmystery
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env 
# Edit .env and paste your GEMINI_API_KEY
npm run dev
```

Backend runs at `http://localhost:3001`.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5175`. The Vite dev server proxies `/api` calls to the backend automatically.

---

## 📁 Project Structure

```
palmystery/
├── backend/
│   ├── server.js         # Express API + Gemini integration
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── App.jsx        # Main React component
    │   ├── main.jsx       # Entry point
    │   └── index.css      # Global styles + Tailwind
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---
## 🗺️ Future Implementations (Roadmap)

Palmystery is just getting started. Here are some of the features we plan to implement (or would love help building!):

* **User Accounts & History (MongoDB):** Allow users to create accounts to save their past readings and track if the AI's sarcastic predictions actually came true. 
* **Computer Vision Integration:** Implement real-time hand detection and automatic palm-line tracing (e.g., using OpenCV) to highlight the specific lines the AI is roasting before generating the reading.
* **RAG (Retrieval-Augmented Generation):** Integrate a RAG system loaded with actual, historical palmistry texts. This will allow the AI to ground its sarcastic roasts in "authentic" palm-reading lore for maximum comedic effect.
* **Social Sharing:** One-click buttons to export a stylized image of the user's palm reading directly to Instagram, X, or LinkedIn.
* **Multi-Language Support:** Because getting roasted by an AI transcends language barriers.

## 🤝 Contributing

Contributions are welcome! If you have ideas for making the AI even more sarcastic or the UI more engaging:

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/ExtraSarcasm`
3. Commit your changes: `git commit -m 'Add some ExtraSarcasm'`
4. Push to the branch: `git push origin feature/ExtraSarcasm`
5. Open a Pull Request

---

## ⚖️ License

MIT — do whatever you want, but Madame Mysterio is not responsible for any consequences.
