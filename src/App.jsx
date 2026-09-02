 import { useState } from "react";
 import { Routes, Route, useNavigate } from "react-router-dom";

 const pastPatientRecord = {
  knownConditions: ["diabetes"],
  medicines: ["metformin"]
};


function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MedNarrate</h1>
      <p>Who is providing the case information?</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => navigate("/patient")}>Patient</button>
        <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => navigate("/staff")}>Staff</button>
        <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => navigate("/relative")}>Relative</button>
      </div>
    </div>
  );
}

function PatientScreen() {
  const [canSpeak, setCanSpeak] = useState(null); // null = not chosen yet

  if (canSpeak === null) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Patient Intake</h2>
        <p>Can the patient speak or type to answer questions?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
          <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => setCanSpeak(true)}>
            Yes
          </button>
          <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => setCanSpeak(false)}>
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
function BodyMap() {
  const regions = ["Head", "Chest", "Abdomen", "Arm", "Leg", "Back"];
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [painLevel, setPainLevel] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Recorded</h2>
        <p>Region: <strong>{selectedRegion}</strong></p>
        <p>Pain level: <strong>{painLevel} / 10</strong></p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Tap where it hurts</h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            style={{
              padding: "25px",
              fontSize: "16px",
              backgroundColor: selectedRegion === region ? "#ffb3b3" : "#eee",
              border: "2px solid #999",
              borderRadius: "8px"
            }}
          >
            {region}
          </button>
        ))}
      </div>

      {selectedRegion && (
        <div style={{ marginTop: "30px" }}>
          <p>Pain level for <strong>{selectedRegion}</strong>:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
            {[1,2,3,4,5,6,7,8,9,10].map((num) => (
              <button
                key={num}
                onClick={() => setPainLevel(num)}
                style={{
                  padding: "10px",
                  backgroundColor: painLevel === num ? "#ff8080" : "#f5f5f5",
                  border: "1px solid #999"
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedRegion && painLevel && (
        <button
          style={{ marginTop: "30px", padding: "12px 25px", fontSize: "16px" }}
          onClick={() => setConfirmed(true)}
        >
          Confirm
        </button>
      )}
    </div>
  );
}
function FlagVerify({ answers, questions }) {
  const [confirmed, setConfirmed] = useState(false);

  // Very simple keyword-based contradiction check (stand-in for real NLP)
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

function GuidedQA() {
  const questions = [
    "What is the main complaint?",
    "Since when have you had this?",
    "Any past medical history?",
    "Current medicines?",
    "Diet and lifestyle details?"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);

  function handleNext() {
    const updatedAnswers = [...allAnswers, answer];
    setAllAnswers(updatedAnswers);
    setAnswer("");
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Guided Q&A</h2>

      {currentIndex < questions.length ? (
        <div>
          <p>{questions[currentIndex]}</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ padding: "10px", width: "300px" }}
          />
          <br />
          <button style={{ marginTop: "20px", padding: "10px 20px" }} onClick={handleNext}>
            Next
          </button>
        </div>
             ) : (
        <FlagVerify answers={allAnswers} questions={questions} />
      )}
      
    </div>
  );
}
function StaffScreen() {
  const [heartRate, setHeartRate] = useState("");
  const [spo2, setSpo2] = useState("");
  const [bp, setBp] = useState("");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Vitals Recorded</h2>
        <p>Heart Rate: <strong>{heartRate} bpm</strong></p>
        <p>SpO2: <strong>{spo2}%</strong></p>
        <p>Blood Pressure: <strong>{bp}</strong></p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Vitals Entry (Unconscious Patient)</h2>
      <p>Staff enters vitals from the hospital monitor</p>

      <div style={{ marginTop: "20px" }}>
        <p>
          Heart Rate (bpm):{" "}
          <input type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} style={{ padding: "8px", width: "100px" }} />
        </p>
        <p>
          SpO2 (%):{" "}
          <input type="number" value={spo2} onChange={(e) => setSpo2(e.target.value)} style={{ padding: "8px", width: "100px" }} />
        </p>
        <p>
          Blood Pressure:{" "}
          <input type="text" placeholder="e.g. 120/80" value={bp} onChange={(e) => setBp(e.target.value)} style={{ padding: "8px", width: "100px" }} />
        </p>
      </div>

      <button
        style={{ marginTop: "20px", padding: "12px 25px", fontSize: "16px" }}
        onClick={() => setSaved(true)}
      >
        Save Vitals
      </button>
    </div>
  );
}


function RelativeScreen() {
  const [relation, setRelation] = useState("");
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Relative Providing Information</h2>
        <p>Relationship to patient:</p>
        <input
          type="text"
          placeholder="e.g. Son, Daughter, Spouse"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
        <br />
        <button
          style={{ marginTop: "20px", padding: "12px 25px", fontSize: "16px" }}
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
      <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
        Informant: {relation} (answering on patient's behalf)
      </p>
      <GuidedQA />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ModeSelector />} />
      <Route path="/patient" element={<PatientScreen />} />
      <Route path="/staff" element={<StaffScreen />} />
      <Route path="/relative" element={<RelativeScreen />} />
    </Routes>
  );
}

export default App;