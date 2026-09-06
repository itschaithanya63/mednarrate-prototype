import { useState } from "react";

// Fake queue of patients waiting for doctor review — stand-in for real backend data
const fakePatientQueue = [
  {
    id: 1,
    name: "Ramesh Kumar",
    submittedVia: "Guided Q&A",
    flagged: true,
    answers: [
      "Stomach pain",
      "3 days",
      "no diabetes",
      "Paracetamol",
      "Vegetarian, irregular sleep"
    ]
  },
  {
    id: 2,
    name: "Sita Sharma",
    submittedVia: "Body Map",
    flagged: false,
    region: "Shoulder",
    pain: 6
  },
  {
    id: 3,
    name: "Unconscious Patient (Staff entry)",
    submittedVia: "Vitals Entry",
    flagged: false,
    heartRate: 78,
    spo2: 96,
    bp: "120/80"
  }
];

function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", backgroundColor: "#1a2a33", color: "white", padding: "20px" }}>
        <h2 style={{ fontSize: "20px" }}>MedNarrate</h2>
        <p style={{ color: "#aaa", fontSize: "14px" }}>Doctor Dashboard</p>
        <hr style={{ borderColor: "#333" }} />
        <p style={{ marginTop: "20px" }}>📋 Patient Queue</p>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "30px" }}>
        {!selectedPatient ? (
          <div>
            <h2>Today's Patient Queue</h2>
            {fakePatientQueue.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  backgroundColor: patient.flagged ? "#fff3cd" : "#fff"
                }}
              >
                <strong>{patient.name}</strong> — via {patient.submittedVia}
                {patient.flagged && <span style={{ color: "#cc8400", marginLeft: "10px" }}>⚠️ Flagged</span>}
              </div>
            ))}
          </div>
        ) : (
          <PatientCaseDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
        )}
      </div>
    </div>
  );
}

function PatientCaseDetail({ patient, onBack }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [followUpDays, setFollowUpDays] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  

     if (confirmed) {
     return (
       <div>
         <h2>Case Saved</h2>
         <p>{patient.name}'s case has been finalized.</p>
         {followUpDays && <p>Follow-up scheduled in {followUpDays} days.</p>}
         {prescriptionImage && (
           <div style={{ marginTop: "10px" }}>
             <p>Prescription attached:</p>
             <img src={prescriptionImage} alt="Prescription" style={{ maxWidth: "200px", borderRadius: "8px", border: "1px solid #ccc" }} />
           </div>
         )}
         <button onClick={onBack} style={{ padding: "10px 20px", marginTop: "10px" }}>
           Back to Queue
         </button>
       </div>
     );
   }

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>← Back to Queue</button>
      <h2>{patient.name}</h2>
      <p><strong>Submitted via:</strong> {patient.submittedVia}</p>

      {patient.flagged && (
        <div style={{ backgroundColor: "#fff3cd", border: "1px solid #ffcc00", padding: "15px", borderRadius: "8px", margin: "15px 0" }}>
          ⚠️ Patient states no diabetes, but past records show a Metformin prescription. Please verify.
        </div>
      )}

      {patient.answers && (
        <ul>
          {patient.answers.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}

      {patient.region && (
        <p>Pain reported: <strong>{patient.region}</strong>, level <strong>{patient.pain}/10</strong></p>
      )}

      {patient.heartRate && (
        <p>Vitals: HR {patient.heartRate} bpm, SpO2 {patient.spo2}%, BP {patient.bp}</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <p>
          Diagnosis / Treatment notes:<br />
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            style={{ width: "100%", height: "80px", padding: "8px" }}
          />
        </p>
        <p>
          Follow-up in how many days?{" "}
          <input
            type="number"
            value={followUpDays}
            onChange={(e) => setFollowUpDays(e.target.value)}
            style={{ padding: "8px", width: "80px" }}
          />
        </p>

        {prescriptionImage && (
          <div style={{ marginTop: "10px" }}>
            <img src={prescriptionImage} alt="Prescription preview" style={{ maxWidth: "200px", borderRadius: "8px", border: "1px solid #ccc" }} />
          </div>
        )}
      </div>

      <button
        style={{ marginTop: "15px", padding: "12px 25px", fontSize: "16px" }}
        onClick={() => setConfirmed(true)}
      >
        Doctor Confirms & Save
      </button>
    </div>
  );
}

export default DoctorDashboard;