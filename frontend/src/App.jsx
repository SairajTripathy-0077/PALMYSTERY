import { useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";

// ─── Sub-components ────────────────────────────────────────────────────────

function OrbIcon({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer glow rings */}
      <div className="orb-ring absolute w-36 h-36 rounded-full border border-purple-500/20" />
      <div className="orb-ring absolute w-28 h-28 rounded-full border border-purple-400/30" style={{ animationDelay: "1s" }} />
      {/* Orb */}
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/40 to-purple-900/60 border border-purple-400/50 flex items-center justify-center shadow-[0_0_40px_rgba(192,132,252,0.4)]">
        <span className="text-4xl" style={{ filter: "drop-shadow(0 0 8px rgba(192,132,252,0.8))" }}>🔮</span>
      </div>
    </div>
  );
}

function LoadingState() {
  const phrases = [
    "Consulting the ancient spirits…",
    "Decoding the threads of fate…",
    "The oracle is squinting at your palm…",
    "Translating cosmic nonsense into English…",
  ];
  const [phrase] = useState(() => phrases[Math.floor(Math.random() * phrases.length)]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border border-amber-500/20 border-b-amber-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        <div className="absolute inset-0 flex items-center justify-center text-xl">🔮</div>
      </div>
      <p className="font-body text-purple-300 text-lg italic">{phrase}</p>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="loading-dot w-2 h-2 rounded-full bg-purple-400" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

function ReadingCard({ reading, onReset }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Decorative top border */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      <div className="bg-gradient-to-b from-[#1a0a2e] to-[#0d0520] border border-purple-900/50 rounded-2xl p-8 shadow-[0_0_60px_rgba(45,27,78,0.8)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🃏</span>
          <h2 className="font-display text-amber-400 text-lg gold-shimmer">Your Reading Has Been Delivered</h2>
        </div>

        <div className="reading-prose">
          <ReactMarkdown>{reading}</ReactMarkdown>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-900/40 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 px-6 rounded-xl bg-purple-900/40 border border-purple-700/50 text-purple-300 font-body text-base hover:bg-purple-800/40 hover:border-purple-500/60 hover:text-purple-100 transition-all duration-200"
          >
            ✋ Read Another Palm
          </button>
          <button
            onClick={() => navigator.clipboard?.writeText(reading)}
            className="flex-1 py-3 px-6 rounded-xl bg-amber-900/20 border border-amber-700/30 text-amber-400 font-body text-base hover:bg-amber-800/20 hover:border-amber-500/50 transition-all duration-200"
          >
            📋 Copy Reading
          </button>
        </div>
      </div>

      <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
    </div>
  );
}

function UploadZone({ onImageSelect }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onImageSelect(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  return (
    <div
      className={`drop-zone rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${dragging ? "dragging" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-purple-900/40 border border-purple-700/50 flex items-center justify-center text-3xl">
          ✋
        </div>
        <div>
          <p className="font-display text-purple-200 text-base mb-1">Offer Your Palm to the Void</p>
          <p className="font-body text-purple-400 text-sm">
            Drop an image here, or click to browse
          </p>
          <p className="font-body text-purple-600 text-xs mt-2">
            JPG, PNG, WEBP · Max 10MB · Flat palm, good lighting
          </p>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ file, imageUrl, onRemove, onSubmit, loading }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Image preview */}
      <div className="relative rounded-2xl overflow-hidden border border-purple-800/40 shadow-[0_0_30px_rgba(45,27,78,0.6)]">
        <img
          src={imageUrl}
          alt="Your palm"
          className="w-full max-h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05020f]/60 to-transparent pointer-events-none" />
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-purple-700/50 text-purple-300 hover:text-white hover:bg-red-900/60 transition-all flex items-center justify-center text-sm"
        >
          ✕
        </button>
        <p className="absolute bottom-3 left-3 font-mono text-purple-400 text-xs">{file.name}</p>
      </div>

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="relative w-full py-4 rounded-xl font-display text-sm tracking-widest uppercase overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #4c1d95, #6d28d9, #4c1d95)",
          boxShadow: "0 0 30px rgba(109,40,217,0.4)",
        }}
      >
        <span className="relative z-10 text-purple-100 group-hover:text-white transition-colors">
          {loading ? "Consulting the spirits…" : "🔮 Reveal My Destiny"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-400/10 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </button>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────

export default function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = (f) => {
    setFile(f);
    setImageUrl(URL.createObjectURL(f));
    setReading(null);
    setError(null);
  };

  const handleRemove = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setFile(null);
    setImageUrl(null);
    setError(null);
  };

  const handleReset = () => {
    handleRemove();
    setReading(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("palm", file);

    try {
      const res = await fetch("/api/read-palm", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "The oracle has gone silent.");
      setReading(data.reading);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <OrbIcon className="mb-6 mx-auto" />
        <h1 className="font-display text-4xl sm:text-5xl text-purple-100 mb-3 tracking-tight">
          Palm<span className="gold-shimmer">ystery</span>
        </h1>
        <p className="font-body text-purple-400 text-lg italic max-w-md mx-auto">
          Ancient wisdom. Zero tact. Your destiny, served cold.
        </p>
        {/* Divider */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-700" />
          <span className="text-purple-600 text-xs font-mono tracking-widest uppercase">Est. Before You Were Born</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-700" />
        </div>
      </header>

      {/* Main content card */}
      <main className="w-full max-w-xl">
        <div className="bg-gradient-to-b from-[#120825]/80 to-[#080215]/80 backdrop-blur-sm border border-purple-900/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(45,27,78,0.5)]">
          {/* State machine */}
          {reading ? (
            <ReadingCard reading={reading} onReset={handleReset} />
          ) : loading ? (
            <LoadingState />
          ) : file ? (
            <PreviewPanel
              file={file}
              imageUrl={imageUrl}
              onRemove={handleRemove}
              onSubmit={handleSubmit}
              loading={loading}
            />
          ) : (
            <UploadZone onImageSelect={handleImageSelect} />
          )}

          {/* Error */}
          {error && !loading && (
            <div className="mt-4 p-4 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 font-body text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center font-body text-purple-700 text-xs mt-6 px-4">
          For entertainment only. Madame Mysterio is not responsible for existential crises, career pivots, or spontaneous enlightenment.
        </p>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <p className="font-mono text-purple-800 text-xs tracking-widest uppercase">
          Open Source · Built with React & Gemini ·{" "}
          <a
            href="https://github.com/YOUR_USERNAME/palmystery"
            className="text-purple-600 hover:text-purple-400 transition-colors underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
