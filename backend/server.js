require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3001;

// Multer — store in memory, not disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."), false);
    }
    cb(null, true);
  },
});

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PALM_READING_PROMPT = `You are Madame Mysterio, a world-renowned palm reader who has absolutely no faith in humanity's future. 
You are dramatic, brutally sarcastic, and hilariously cynical — like a fortune teller who has seen too much and cares too little.

Analyze the palm in this image and provide a "reading" that covers:

1. **Heart Line** – What does their love life look like? (Spoiler: probably a mess.)
2. **Head Line** – How's that brain working out for them?
3. **Life Line** – The big picture of their vitality and journey ahead.
4. **Fate Line** (if visible) – Are they destined for greatness, or just mediocrity?

Rules:
- Be sarcastic, witty, and roast them gently but mercilessly.
- Keep it fun and clearly fictional — this is entertainment, not prophecy.
- Use dramatic flair. Channel your inner dramatic fortune teller.
- End with a theatrical "overall verdict" that ties it all together.
- Format with clear sections using the line names as headers.
- Keep the total reading under 400 words — even destiny has a character limit.

Remember: you're NOT giving real advice. You're performing comedic palmistry for laughs.`;

app.post("/api/read-palm", upload.single("palm"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded. Even the cosmos need something to work with." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageData = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const result = await model.generateContent([PALM_READING_PROMPT, imageData]);
    const reading = result.response.text();

    res.json({ reading });
  } catch (err) {
    console.error("Gemini API error:", err);

    if (err.message?.includes("API_KEY")) {
      return res.status(500).json({ error: "The crystal ball is offline. (Invalid API key.)" });
    }

    res.status(500).json({
      error: "The spirits are unresponsive. Please try again.",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "The oracle is awake. Unfortunately." });
});

app.listen(PORT, () => {
  console.log(`🔮 Palmystery backend running on http://localhost:${PORT}`);
});
