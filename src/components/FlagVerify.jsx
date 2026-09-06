import { useState } from "react";

const pastPatientRecord = {
  knownConditions: ["diabetes"],
  medicines: ["metformin"]
};

function FlagVerify({ answers, questions }) {
  const [confirmed, setConfirmed] = useState(false);

  const historyAnswer = answers[2] ? answers[2].toLowerCase() : "";
  const saysNoDiabetes = historyAnswer.includes("no diabetes") || historyAnswer.includes("none");
  const recordShowsDiabetes = pastPatientRecord.knownConditions.includes("diabetes");
  const contradiction = saysNoDiabetes && recordShowsDiabetes;

  if (confirmed) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <p>Case sheet finalized.</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {questions.map((q, i) => (
            <li key={i}><strong>{q}</strong> — {answers[i]}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <p>Review before saving:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {questions.map((q, i) => (
          <li key={i}><strong>{q}</strong> — {answers[i]}</li>
        ))}
      </ul>

      {contradiction && (
        <div style={{ backgroundColor: "#fff3cd", border: "1px solid #ffcc00", padding: "15px", margin: "20px auto", width: "400px" }}>
          ⚠️ Patient states no diabetes, but past records show a Metformin prescription. Please verify with the doctor.
        </div>
      )}

      <button style={{ marginTop: "10px", padding: "12px 25px", fontSize: "16px" }} onClick={() => setConfirmed(true)}>
        Doctor Confirms &amp; Save
      </button>
    </div>
  );
}

export default FlagVerify;