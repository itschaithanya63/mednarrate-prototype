import { useEffect, useState } from "react";

const quotes = [
  "Healing takes time.",
  "Every story matters.",
  "Care begins with listening.",
  "Small steps, real progress.",
  "Your health, your story."
];

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const doneTimer = setTimeout(() => onFinish(), 3700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--navy)",
        zIndex: 1000,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease",
        overflow: "hidden"
      }}
    >
      {quotes.map((quote, i) => (
        <span key={i} className={`floating-quote floating-quote-${i}`}>
          {quote}
        </span>
      ))}

      <h1 className="splash-title" style={{ zIndex: 2 }}>MedNarrate</h1>
      <p className="splash-tagline" style={{ zIndex: 2 }}>From patient conversation to clinical clarity.</p>
    </div>
  );
}

export default SplashScreen;