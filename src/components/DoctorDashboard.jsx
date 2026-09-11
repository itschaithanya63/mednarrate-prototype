import { useState } from "react";

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
    <div className="doctor-layout">
      <div className="doctor-sidebar">
        <h2>MedNarrate</h2>
        <p>Doctor Dashboard</p>
        <hr />
        <div className="doctor-nav-item">📋 Patient Queue</div>
      </div>

      <div className="doctor-main">
        {!selectedPatient ? (
          <div>
            <h2 className="doctor-heading">Today's Patient Queue</h2>
            {fakePatientQueue.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`queue-item ${patient.flagged ? "flagged" : ""}`}
              >
                <div>
                  <div className="queue-item-name">{patient.name}</div>
                  <div className="queue-item-meta">via {patient.submittedVia}</div>
                </div>
                {patient.flagged && <span className="flag-pill">⚠️ Flagged</span>}
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
    const summaryText = `MedNarrate Case Summary
Patient: ${patient.name}
Submitted via: ${patient.submittedVia}
Diagnosis/Treatment: ${diagnosis || "N/A"}
Follow-up: ${followUpDays ? followUpDays + " days" : "Not scheduled"}`;

    function handlePrint() {
      window.print();
    }

    function handleEmailShare() {
      const subject = encodeURIComponent(`Case Summary - ${patient.name}`);
      const body = encodeURIComponent(summaryText);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    function handleWhatsAppShare() {
      const text = encodeURIComponent(summaryText);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }

    return (
      <div className="case-card" id="printable-case-sheet">
        <h2 className="doctor-heading case-file-heading">MedNarrate — Case File</h2>
        <p><strong>Patient:</strong> {patient.name}</p>
        <p><strong>Submitted via:</strong> {patient.submittedVia}</p>
        <p><strong>Diagnosis/Treatment:</strong> {diagnosis || "N/A"}</p>
        {followUpDays && <p><strong>Follow-up:</strong> in {followUpDays} days</p>}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn-secondary" onClick={handlePrint}>🖨️ Print</button>
          <button className="btn-secondary" onClick={handleEmailShare}>📧 Email</button>
          <button className="btn-secondary" onClick={handleWhatsAppShare}>💬 WhatsApp</button>
        </div>

        <button className="btn-primary" onClick={onBack} style={{ display: "block", marginTop: "20px" }}>
          Back to Queue
        </button>
      </div>
    );
  }

  return (
    <div className="case-card">
      <button className="back-link" onClick={onBack}>← Back to Queue</button>
      <h2 className="doctor-heading">{patient.name}</h2>
      <p style={{ color: "var(--text-dim)" }}><strong>Submitted via:</strong> {patient.submittedVia}</p>

      {patient.flagged && (
        <div className="case-warning">
          ⚠️ Patient states no diabetes, but past records show a Metformin prescription. Please verify.
        </div>
      )}

      {patient.answers && (
        <ul style={{ paddingLeft: "18px", color: "var(--text)" }}>
          {patient.answers.map((a, i) => (
            <li key={i} style={{ marginBottom: "4px" }}>{a}</li>
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
        <p style={{ fontWeight: "600", marginBottom: "6px" }}>Diagnosis / Treatment notes</p>
        <textarea
          className="case-textarea"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />

        <p style={{ fontWeight: "600", margin: "15px 0 6px" }}>Follow-up in how many days?</p>
        <input
          type="number"
          value={followUpDays}
          onChange={(e) => setFollowUpDays(e.target.value)}
          className="styled-input"
          style={{ width: "100px" }}
        />
      </div>

      <div>
        <button className="btn-primary" onClick={() => setConfirmed(true)}>
          Doctor Confirms & Save
        </button>
      </div>
    </div>
  );
}

export default DoctorDashboard;