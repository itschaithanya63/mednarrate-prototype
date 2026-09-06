import { useState } from "react";

const questions = [
  { text: "What is the main complaint?", type: "text" },
  { text: "Since when have you had this?", type: "text" },
  { text: "Any past medical history?", type: "text" },
  { text: "Current medicines?", type: "text" },
  { text: "Diet and lifestyle details?", type: "text" },
  {
    text: "Prakriti (body constitution)",
    type: "select",
    options: ["Vata", "Pitta", "Kapha"],
    ayurveda: true,
    hint: "Your natural body type. Vata = thin build, dry skin, quick-moving. Pitta = medium build, warm body, sharp appetite. Kapha = solid build, calm nature, slower digestion. If unsure, pick what feels closest — the doctor will confirm."
  },
  {
    text: "Agni (digestive fire)",
    type: "select",
    options: ["Weak", "Balanced", "Sharp/Irregular"],
    ayurveda: true,
    hint: "How well you digest food. Weak = often bloated or low appetite. Balanced = regular, comfortable digestion. Sharp/Irregular = quick hunger but irregular bowel habits."
  },
  {
    text: "Vikriti (current imbalance)",
    type: "select",
    options: ["Vata imbalance", "Pitta imbalance", "Kapha imbalance", "None noticed"],
    ayurveda: true,
    hint: "Any recent imbalance you've noticed — e.g., anxiety/dryness (Vata), irritability/acidity (Pitta), heaviness/sluggishness (Kapha). Choose 'None noticed' if unsure."
  }
];

function GuidedQA() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [prescriptionImage, setPrescriptionImage] = useState(null);

  const currentQuestion = questions[currentIndex];

  function handleNext() {
    const updatedAnswers = [...allAnswers, answer];
    setAllAnswers(updatedAnswers);
    setAnswer("");

    if (currentIndex === questions.length - 1) {
      setShowUpload(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Thank you</h2>
        <p>Please wait for the doctor.</p>
      </div>
    );
  }

  if (showUpload) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Optional: Upload current medicines or prescription</h2>
        <p style={{ color: "#666", fontSize: "14px" }}>
          If you have any tablets or a prescription from before, you can upload a photo here.
        </p>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            if (e.target.files[0]) {
              setPrescriptionImage(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        {prescriptionImage && (
          <div style={{ marginTop: "15px" }}>
            <img
              src={prescriptionImage}
              alt="Preview"
              style={{ maxWidth: "200px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>
        )}
        <br />
        <button style={{ marginTop: "20px", padding: "10px 20px" }} onClick={() => setSubmitted(true)}>
          {prescriptionImage ? "Submit" : "Skip and Submit"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Guided Q&A</h2>

      {currentQuestion.ayurveda && (
        <p style={{ color: "#0b6e4f", fontWeight: "bold", marginBottom: "5px" }}>
          🌿 Ayurvedic Assessment
        </p>
      )}

      <p>{currentQuestion.text}</p>

      {currentQuestion.hint && (
        <p style={{ fontSize: "13px", color: "#666", maxWidth: "400px", margin: "0 auto 15px" }}>
          {currentQuestion.hint}
        </p>
      )}

      {currentQuestion.type === "select" ? (
        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ padding: "10px", width: "220px" }}
        >
          <option value="">-- Select --</option>
          {currentQuestion.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
      )}

      <br />
      <button
        style={{ marginTop: "20px", padding: "10px 20px" }}
        disabled={!answer}
        onClick={handleNext}
      >
        {currentIndex === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
}

export default GuidedQA;