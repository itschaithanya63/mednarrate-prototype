import { useEffect, useState } from "react";

const title = "MedNarrate";

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
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ marginBottom: "10px" }}>
        <circle cx="70" cy="70" r="55" className="splash-ring splash-ring-1" />
        <circle cx="70" cy="70" r="55" className="splash-ring splash-ring-2" />
        <circle cx="70" cy="70" r="40" fill="none" stroke="var(--blue)" strokeWidth="2" opacity="0.5" />
        <circle cx="70" cy="70" r="6" fill="var(--teal)" className="splash-dot" />
      </svg>

      <h1 className="splash-title">
        {title.split("").map((letter, i) => (
          <span
            key={i}
            className="splash-letter"
            style={{ animationDelay: `${0.5 + i * 0.05}s` }}
          >
            {letter}
          </span>
        ))}
      </h1>
      <p className="splash-tagline">From patient conversation to clinical clarity.</p>
    </div>
  );
}

export default SplashScreen;