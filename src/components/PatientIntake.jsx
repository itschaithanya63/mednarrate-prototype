import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import GuidedQA from "./GuidedQA";
import BodyMap from "./BodyMap";
import { useLanguage } from "./LanguageContext";

const vitalsLabels = {
  title: { "en-IN": "Vitals Entry", "hi-IN": "वाइटल्स दर्ज करें", "kn-IN": "ವೈಟಲ್ಸ್ ನಮೂದಿಸಿ" },
  subtitle: {
    "en-IN": "For unconscious patient — staff enters vitals from the hospital monitor",
    "hi-IN": "अचेत रोगी के लिए — स्टाफ अस्पताल मॉनिटर से वाइटल्स दर्ज करता है",
    "kn-IN": "ಪ್ರಜ್ಞೆ ಇಲ್ಲದ ರೋಗಿಗಾಗಿ — ಸಿಬ್ಬಂದಿ ಆಸ್ಪತ್ರೆ ಮಾನಿಟರ್‌ನಿಂದ ವೈಟಲ್ಸ್ ನಮೂದಿಸುತ್ತಾರೆ"
  },
  heartRate: { "en-IN": "Heart Rate (bpm)", "hi-IN": "हृदय गति (bpm)", "kn-IN": "ಹೃದಯ ಬಡಿತ (bpm)" },
  spo2: { "en-IN": "SpO2 (%)", "hi-IN": "SpO2 (%)", "kn-IN": "SpO2 (%)" },
  bp: { "en-IN": "Blood Pressure", "hi-IN": "रक्तचाप", "kn-IN": "ರಕ್ತದೊತ್ತಡ" },
  save: { "en-IN": "Save Vitals", "hi-IN": "वाइटल्स सहेजें", "kn-IN": "ವೈಟಲ್ಸ್ ಉಳಿಸಿ" }
};

function PatientIntake() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  if (mode === "staff") {
    return <StaffVitals />;
  }

  if (mode === "relative") {
    return <RelativeIntake />;
  }

  return <PatientSelfIntake />;
}

function PatientSelfIntake() {
  const [canSpeak, setCanSpeak] = useState(null);

  if (canSpeak === null) {
    return (
      <div className="patient-world">
        <h2 className="patient-title">Patient Intake</h2>
        <p className="patient-subtitle">Can you speak or type to answer questions?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
          <button className="btn-primary" style={{ marginTop: 0 }} onClick={() => setCanSpeak(true)}>
            Yes
          </button>
          <button className="btn-secondary" style={{ marginTop: 0 }} onClick={() => setCanSpeak(false)}>
            No
          </button>
        </div>
      </div>
    );
  }

  if (canSpeak === true) {
    return <GuidedQA />;
  }

  return <BodyMap />;
}

function StaffVitals() {
  const { language } = useLanguage();
  const [heartRate, setHeartRate] = useState("");
  const [spo2, setSpo2] = useState("");
  const [bp, setBp] = useState("");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <div className="patient-world">
        <div className="thankyou-icon">✅</div>
        <h2 className="thankyou-title">Thank you</h2>
        <p style={{ color: "var(--text-dim)" }}>Vitals recorded. Please wait for the doctor.</p>
      </div>
    );
  }

  return (
    <div className="patient-world">
      <h2 className="patient-title">{vitalsLabels.title[language]}</h2>
      <p className="patient-subtitle">{vitalsLabels.subtitle[language]}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", marginTop: "10px" }}>
        <div>
          <p className="question-hint" style={{ margin: "0 0 6px" }}>{vitalsLabels.heartRate[language]}</p>
          <input
            className="styled-input"
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
          />
        </div>
        <div>
          <p className="question-hint" style={{ margin: "0 0 6px" }}>{vitalsLabels.spo2[language]}</p>
          <input
            className="styled-input"
            type="number"
            value={spo2}
            onChange={(e) => setSpo2(e.target.value)}
          />
        </div>
        <div>
          <p className="question-hint" style={{ margin: "0 0 6px" }}>{vitalsLabels.bp[language]}</p>
          <input
            className="styled-input"
            type="text"
            placeholder="e.g. 120/80"
            value={bp}
            onChange={(e) => setBp(e.target.value)}
          />
        </div>
      </div>

      <button
        className="btn-primary"
        disabled={!heartRate || !spo2 || !bp}
        onClick={() => setSaved(true)}
      >
        {vitalsLabels.save[language]}
      </button>
    </div>
  );
}

function RelativeIntake() {
  const [relation, setRelation] = useState("");
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="patient-world">
        <h2 className="patient-title">Relative Providing Information</h2>
        <p className="patient-subtitle">Relationship to patient:</p>
        <input
          className="styled-input"
          type="text"
          placeholder="e.g. Son, Daughter, Spouse"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />
        <br />
        <button
          className="btn-primary"
          disabled={!relation}
          onClick={() => setStarted(true)}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div>
      <p style={{ textAlign: "center", marginTop: "20px", color: "var(--text-dim)" }}>
        Informant: {relation} (answering on patient's behalf)
      </p>
      <GuidedQA />
    </div>
  );
}

export default PatientIntake;