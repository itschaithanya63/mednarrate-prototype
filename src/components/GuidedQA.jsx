import { useState } from "react";
import CameraCapture from "./CameraCapture";
import { useLanguage } from "./LanguageContext";

const questions = [
  {
    type: "text",
    text: { "en-IN": "What is the main complaint?", "hi-IN": "मुख्य समस्या क्या है?", "kn-IN": "ಮುಖ್ಯ ಸಮಸ್ಯೆ ಏನು?" }
  },
  {
    type: "text",
    text: { "en-IN": "Since when have you had this?", "hi-IN": "यह कब से है?", "kn-IN": "ಇದು ಯಾವಾಗಿನಿಂದ ಇದೆ?" }
  },
  {
    type: "text",
    text: { "en-IN": "Any past medical history?", "hi-IN": "कोई पुरानी बीमारी?", "kn-IN": "ಹಿಂದಿನ ಯಾವುದೇ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಇದೆಯೇ?" }
  },
  {
    type: "text",
    text: { "en-IN": "Current medicines?", "hi-IN": "वर्तमान दवाइयाँ?", "kn-IN": "ಪ್ರಸ್ತುತ ಔಷಧಿಗಳು?" }
  },
  {
    type: "text",
    text: { "en-IN": "Diet and lifestyle details?", "hi-IN": "आहार और जीवनशैली?", "kn-IN": "ಆಹಾರ ಮತ್ತು ಜೀವನಶೈಲಿ ವಿವರಗಳು?" }
  },
  {
    type: "select",
    ayurveda: true,
    text: { "en-IN": "Prakriti (body constitution)", "hi-IN": "प्रकृति (शरीर संरचना)", "kn-IN": "ಪ್ರಕೃತಿ (ದೇಹ ಸ್ವರೂಪ)" },
    options: ["Vata", "Pitta", "Kapha"],
    hint: {
      "en-IN": "Your natural body type. Vata = thin build, dry skin, quick-moving. Pitta = medium build, warm body, sharp appetite. Kapha = solid build, calm nature, slower digestion. If unsure, pick what feels closest — the doctor will confirm.",
      "hi-IN": "आपका स्वाभाविक शरीर प्रकार। वात = पतला शरीर, शुष्क त्वचा। पित्त = मध्यम शरीर, तीव्र भूख। कफ = मजबूत शरीर, शांत स्वभाव। अनिश्चित हों तो जो करीब लगे वह चुनें।",
      "kn-IN": "ನಿಮ್ಮ ಸ್ವಾಭಾವಿಕ ದೇಹ ಪ್ರಕಾರ. ವಾತ = ತೆಳ್ಳಗಿನ ದೇಹ, ಒಣ ಚರ್ಮ. ಪಿತ್ತ = ಮಧ್ಯಮ ದೇಹ, ತೀಕ್ಷ್ಣ ಹಸಿವು. ಕಫ = ದೃಢ ದೇಹ, ಶಾಂತ ಸ್ವಭಾವ. ಖಚಿತವಿಲ್ಲದಿದ್ದರೆ ಹತ್ತಿರದ್ದನ್ನು ಆಯ್ಕೆಮಾಡಿ."
    }
  },
  {
    type: "select",
    ayurveda: true,
    text: { "en-IN": "Agni (digestive fire)", "hi-IN": "अग्नि (पाचन शक्ति)", "kn-IN": "ಅಗ್ನಿ (ಜೀರ್ಣ ಶಕ್ತಿ)" },
    options: ["Weak", "Balanced", "Sharp/Irregular"],
    hint: {
      "en-IN": "How well you digest food. Weak = often bloated or low appetite. Balanced = regular, comfortable digestion. Sharp/Irregular = quick hunger but irregular bowel habits.",
      "hi-IN": "आप भोजन कितनी अच्छी तरह पचाते हैं। कमजोर = अक्सर सूजन या कम भूख। संतुलित = नियमित पाचन। तीव्र/अनियमित = जल्दी भूख पर अनियमित मल त्याग।",
      "kn-IN": "ನೀವು ಆಹಾರವನ್ನು ಎಷ್ಟು ಚೆನ್ನಾಗಿ ಜೀರ್ಣಿಸುತ್ತೀರಿ. ದುರ್ಬಲ = ಆಗಾಗ್ಗೆ ಉಬ್ಬರ ಅಥವಾ ಕಡಿಮೆ ಹಸಿವು. ಸಮತೋಲಿತ = ನಿಯಮಿತ ಜೀರ್ಣಕ್ರಿಯೆ. ತೀಕ್ಷ್ಣ/ಅನಿಯಮಿತ = ಬೇಗ ಹಸಿವು ಆದರೆ ಅನಿಯಮಿತ ಮಲವಿಸರ್ಜನೆ."
    }
  },
  {
    type: "select",
    ayurveda: true,
    text: { "en-IN": "Vikriti (current imbalance)", "hi-IN": "विकृति (वर्तमान असंतुलन)", "kn-IN": "ವಿಕೃತಿ (ಪ್ರಸ್ತುತ ಅಸಮತೋಲನ)" },
    options: ["Vata imbalance", "Pitta imbalance", "Kapha imbalance", "None noticed"],
    hint: {
      "en-IN": "Any recent imbalance you've noticed — e.g., anxiety/dryness (Vata), irritability/acidity (Pitta), heaviness/sluggishness (Kapha). Choose 'None noticed' if unsure.",
      "hi-IN": "हाल ही में देखा गया कोई असंतुलन — जैसे चिंता/शुष्कता (वात), चिड़चिड़ापन/अम्लता (पित्त), भारीपन (कफ)। अनिश्चित हों तो 'कुछ नहीं' चुनें।",
      "kn-IN": "ಇತ್ತೀಚೆಗೆ ಗಮನಿಸಿದ ಯಾವುದೇ ಅಸಮತೋಲನ — ಆತಂಕ/ಒಣತನ (ವಾತ), ಕಿರಿಕಿರಿ/ಆಮ್ಲೀಯತೆ (ಪಿತ್ತ), ಭಾರ (ಕಫ). ಖಚಿತವಿಲ್ಲದಿದ್ದರೆ 'ಏನೂ ಇಲ್ಲ' ಆಯ್ಕೆಮಾಡಿ."
    }
  }
];
const emergencyKeywords = [
  "chest pain", "can't breathe", "cannot breathe", "breathless", "severe bleeding",
  "unconscious", "unresponsive", "suicidal", "want to die", "seizure", "fainted",
  "severe pain", "heart attack", "stroke", "paralysis", "vomiting blood"
];

function detectEmergency(answers) {
  const combined = answers.join(" ").toLowerCase();
  return emergencyKeywords.some((keyword) => combined.includes(keyword));
}

function GuidedQA() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [prescriptionPhotos, setPrescriptionPhotos] = useState([]);
  const [listening, setListening] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const [emergencyDetected, setEmergencyDetected] = useState(false);

  function handleNext() {
  const updatedAnswers = [...allAnswers, answer];
  setAllAnswers(updatedAnswers);
  setAnswer("");

  if (currentIndex === questions.length - 1) {
    if (detectEmergency(updatedAnswers)) {
      setEmergencyDetected(true);
    } else {
      setShowUpload(true);
    }
  } else {
    setCurrentIndex(currentIndex + 1);
  }
}

function handleVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice input isn't supported in this browser. Try Chrome.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = language;
  recognition.interimResults = true; // show partial results as you speak
  recognition.maxAlternatives = 1;

  recognition.onstart = () => setListening(true);
  recognition.onend = () => setListening(false);
 recognition.onerror = () => {
  setListening(false);
};

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setAnswer(transcript);
  };

  recognition.start();
}
if (emergencyDetected) {
  return (
    <div className="patient-world" style={{ borderTop: "4px solid var(--red)" }}>
      <div style={{ fontSize: "48px" }}>🚨</div>
      <h2 className="patient-title" style={{ color: "var(--red)" }}>Please alert staff immediately</h2>
      <p className="patient-subtitle">
        Based on your answers, this may need urgent attention. Please inform a nurse or doctor right away — do not wait for your turn in the queue.
      </p>
     <button className="btn-primary" onClick={() => { setEmergencyDetected(false); setShowUpload(true); }}>
  Continue to submit case
</button>
    </div>
  );
}

  if (submitted) {
  return (
    <div className="patient-world">
      <div className="thankyou-icon">✅</div>
      <h2 className="thankyou-title">Thank you</h2>
      <p style={{ color: "#666" }}>
  The doctor will review your case and confirm the diagnosis and prescription. You'll receive it via WhatsApp, email, or a printed copy based on your choice.
</p>
      <button className="btn-primary" onClick={() => (window.location.href = "/")}>
        Return to Home
      </button>
    </div>
  );
}

  if (showUpload) {
    return (
      <CameraCapture
        onDone={(photos) => {
          setPrescriptionPhotos(Array.isArray(photos) ? photos : []);
          setShowUpload(false);
          setReviewing(true);
        }}
      />
    );
  }

  if (reviewing) {
    return (
      <div className="patient-world">
        <h2 className="patient-title">📋 Review before submitting</h2>
        <p className="patient-subtitle">Tap "Edit" on anything you'd like to change.</p>

        <ul className="review-list">
          {questions.map((q, i) => (
            <li key={i} className="review-item">
              <div className="review-question">{q.text[language]}</div>

              {editingIndex === i ? (
                <div style={{ marginTop: "8px" }}>
                  {q.type === "select" ? (
                    <select
                      className="styled-select"
                      value={allAnswers[i] || ""}
                      onChange={(e) => {
                        const updated = [...allAnswers];
                        updated[i] = e.target.value;
                        setAllAnswers(updated);
                      }}
                    >
                      <option value="">-- Select --</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="styled-input"
                      type="text"
                      value={allAnswers[i] || ""}
                      onChange={(e) => {
                        const updated = [...allAnswers];
                        updated[i] = e.target.value;
                        setAllAnswers(updated);
                      }}
                    />
                  )}
                  <br />
                  <button className="btn-small" style={{ marginTop: "8px" }} onClick={() => setEditingIndex(null)}>
                    Done
                  </button>
                </div>
              ) : (
                <div className="review-answer">
                  {allAnswers[i]}
                  <button className="btn-small" onClick={() => setEditingIndex(i)}>
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {prescriptionPhotos.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "600", color: "#0b6e4f" }}>
              📎 Photos attached ({prescriptionPhotos.length})
            </p>
            <div className="photo-grid">
              {prescriptionPhotos.map((photo, i) => (
                <img key={i} src={photo} alt={`Photo ${i + 1}`} className="photo-thumb" />
              ))}
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={() => setSubmitted(true)}>
          Confirm & Submit
        </button>
      </div>
    );
  }

  return (
    <div className="patient-world">
      <h2 className="patient-title">Guided Q&A</h2>
      <p className="progress-label">Question {currentIndex + 1} of {questions.length}</p>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {currentQuestion.ayurveda && (
        <div className="ayurveda-card">
          <p className="ayurveda-label">🌿 AYURVEDIC ASSESSMENT</p>
        </div>
      )}

      <p className="question-text">{currentQuestion.text[language]}</p>

      {currentQuestion.hint && (
        <p className="question-hint">{currentQuestion.hint[language]}</p>
      )}

      {currentQuestion.type === "select" ? (
        <select
          className="styled-select"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        >
          <option value="">-- Select --</option>
          {currentQuestion.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <div>
          <input
            className="styled-input"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            type="button"
            onClick={handleVoiceInput}
            style={{
              marginLeft: "8px",
              padding: "12px 14px",
              borderRadius: "6px",
              border: "1.5px solid #2F5D45",
              backgroundColor: listening ? "#2F5D45" : "white",
              color: listening ? "white" : "#2F5D45",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🎤
          </button>
          {listening && (
            <p style={{ fontSize: "12px", color: "#2F5D45", marginTop: "6px" }}>
              🔴 Listening... speak now
            </p>
          )}
        </div>
      )}

      <br />
      <button className="btn-primary" disabled={!answer} onClick={handleNext}>
        {currentIndex === questions.length - 1 ? "Submit" : "Next →"}
      </button>
    </div>
  );
}

export default GuidedQA;