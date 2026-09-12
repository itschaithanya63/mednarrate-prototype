import { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginQuotes = [
  "Every story matters.",
  "Care begins with listening.",
  "Healing takes time.",
  "Small steps, real progress."
];

function IdCreation() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const canContinue = name && age && gender && contact;

  function handleContinue() {
    navigate("/informant", { state: { name, age, gender, contact } });
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {loginQuotes.map((quote, i) => (
        <span key={i} className={`floating-quote floating-quote-${i}`}>
          {quote}
        </span>
      ))}

      <div className="patient-world" style={{ zIndex: 2 }}>
        <h1 className="patient-title">MedNarrate</h1>
        <p className="patient-subtitle">Let's create your ID first</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", marginTop: "20px" }}>
          <div>
            <p className="question-hint" style={{ margin: "0 0 6px" }}>Name</p>
            <input
              className="styled-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p className="question-hint" style={{ margin: "0 0 6px" }}>Age</p>
            <input
              className="styled-input"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <p className="question-hint" style={{ margin: "0 0 6px" }}>Gender</p>
            <select
              className="styled-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <p className="question-hint" style={{ margin: "0 0 6px" }}>Phone or Email</p>
            <input
              className="styled-input"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn-primary"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default IdCreation;