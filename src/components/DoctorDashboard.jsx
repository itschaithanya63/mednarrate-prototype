import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatientRecords } from "./PatientRecordsContext";
import { useDoctor } from "./DoctorContext";

function DoctorDashboard() {
  const { doctor } = useDoctor();
  const { patients, addVisit, getUpcomingReminders } = usePatientRecords();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  if (!doctor) {
    navigate("/doctor-login");
    return null;
  }

  const visibleQueue =
    doctor.specialty === "General Physician" ? patients : patients.filter((p) => p.specialtyNeeded === doctor.specialty);

  const reminders = getUpcomingReminders();

  return (
    <div className="doctor-layout">
      <div className="doctor-sidebar">
        <h2>MedNarrate</h2>
        <p>{doctor.name} — {doctor.specialty}</p>
        <hr />
        <div className="doctor-nav-item">📋 Patient Queue</div>
        <div className="doctor-nav-item">⏰ Reminders ({reminders.length})</div>
        <hr />
        <button className="btn-secondary" style={{ marginTop: 0, width: "100%" }} onClick={() => (window.location.href = "/")}>
          Log Out
        </button>
      </div>

      <div className="doctor-main">
        {!selectedPatient ? (
          <div>
            <h2 className="doctor-heading">Today's Patient Queue</h2>
            {visibleQueue.length === 0 && <p style={{ color: "var(--text-dim)" }}>No cases currently assigned to your specialty.</p>}
            {[...visibleQueue].sort((a, b) => (b.emergency ? 1 : 0) - (a.emergency ? 1 : 0)).map((patient) => (
              <div key={patient.id} onClick={() => setSelectedPatient(patient)} className={`queue-item ${patient.flagged ? "flagged" : ""} ${patient.emergency ? "emergency" : ""}`}>
                <div>
                  <div className="queue-item-name">{patient.name}</div>
                  <div className="queue-item-meta">
                    via {patient.submittedVia} · {patient.specialtyNeeded}
                    {patient.history.length > 0 && ` · ${patient.history.length} past visit(s)`}
                  </div>
                </div>
                {patient.emergency && <span className="flag-pill emergency-pill">🚨 URGENT</span>}
                {!patient.emergency && patient.flagged && <span className="flag-pill">⚠️ Flagged</span>}
              </div>
            ))}

            {reminders.length > 0 && (
              <div style={{ marginTop: "30px" }}>
                <h2 className="doctor-heading" style={{ fontSize: "18px" }}>Upcoming Follow-up Reminders</h2>
                {reminders.map((r, i) => (
                  <div key={i} className="reminder-item">
                    <strong>{r.patientName}</strong> — follow up in {r.followUpDays} day(s) (visit recorded {r.visitDate})
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <PatientCaseDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} addVisit={addVisit} />
        )}
      </div>
    </div>
  );
}

function PatientCaseDetail({ patient, onBack, addVisit }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [followUpDays, setFollowUpDays] = useState("");
  const [prescriptionRows, setPrescriptionRows] = useState([{ id: 1, name: "", dosage: "", duration: "" }]);
  const [confirmed, setConfirmed] = useState(false);

  function addRow() {
    setPrescriptionRows([...prescriptionRows, { id: Date.now(), name: "", dosage: "", duration: "" }]);
  }
  function updateRow(id, field, value) {
    setPrescriptionRows(prescriptionRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }
  function removeRow(id) {
    setPrescriptionRows(prescriptionRows.filter((row) => row.id !== id));
  }
  function handleConfirm() {
    const visit = {
      date: new Date().toLocaleDateString(),
      diagnosis,
      prescription: prescriptionRows.filter((r) => r.name.trim() !== ""),
      followUpDays: followUpDays ? parseInt(followUpDays, 10) : null
    };
    addVisit(patient.id, visit);
    setConfirmed(true);
  }

  if (confirmed) {
    const summaryText = `MedNarrate Case Summary
Patient: ${patient.name}
Submitted via: ${patient.submittedVia}
Diagnosis/Treatment: ${diagnosis || "N/A"}
Prescription: ${prescriptionRows.filter(r => r.name).map(r => `${r.name} ${r.dosage} (${r.duration})`).join(", ") || "N/A"}
Follow-up: ${followUpDays ? followUpDays + " days" : "Not scheduled"}`;

    function handlePrint() { window.print(); }
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

        {prescriptionRows.filter(r => r.name).length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <strong>Prescription:</strong>
            <ul>{prescriptionRows.filter(r => r.name).map((r) => <li key={r.id}>{r.name} — {r.dosage} — {r.duration}</li>)}</ul>
          </div>
        )}

        {followUpDays && <p><strong>Follow-up:</strong> in {followUpDays} days</p>}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn-secondary" onClick={handlePrint}>🖨️ Print</button>
          <button className="btn-secondary" onClick={handleEmailShare}>📧 Email</button>
          <button className="btn-secondary" onClick={handleWhatsAppShare}>💬 WhatsApp</button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button className="btn-primary" onClick={onBack}>Back to Queue</button>
          <button className="btn-secondary" onClick={() => (window.location.href = "/")}>Log Out</button>
        </div>
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
          {patient.answers.map((a, i) => <li key={i} style={{ marginBottom: "4px" }}>{a}</li>)}
        </ul>
      )}

      {patient.region && <p>Pain reported: <strong>{patient.region}</strong>, level <strong>{patient.pain}/10</strong></p>}
      {patient.heartRate && <p>Vitals: HR {patient.heartRate} bpm, SpO2 {patient.spo2}%, BP {patient.bp}</p>}

      {patient.history.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "600" }}>Previous Visits</p>
          {patient.history.map((visit, i) => (
            <div key={i} className="review-item" style={{ marginBottom: "10px" }}>
              <div className="review-question">Visit on {visit.date}</div>
              <div className="review-answer">Diagnosis: {visit.diagnosis || "N/A"}</div>
              {visit.prescription.length > 0 && <div className="review-answer">Prescribed: {visit.prescription.map(p => p.name).join(", ")}</div>}
              {visit.followUpDays && <div className="review-answer">Follow-up was set for {visit.followUpDays} days later</div>}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontWeight: "600", marginBottom: "6px" }}>Diagnosis / Treatment notes</p>
        <textarea className="case-textarea" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontWeight: "600", marginBottom: "10px" }}>Prescription</p>
        {prescriptionRows.map((row) => (
          <div key={row.id} style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <input className="styled-input" style={{ width: "150px" }} placeholder="Medicine name" value={row.name} onChange={(e) => updateRow(row.id, "name", e.target.value)} />
            <input className="styled-input" style={{ width: "120px" }} placeholder="Dosage" value={row.dosage} onChange={(e) => updateRow(row.id, "dosage", e.target.value)} />
            <input className="styled-input" style={{ width: "120px" }} placeholder="Duration" value={row.duration} onChange={(e) => updateRow(row.id, "duration", e.target.value)} />
            <button className="btn-small" onClick={() => removeRow(row.id)}>Remove</button>
          </div>
        ))}
        <button className="btn-small" onClick={addRow}>+ Add Medicine</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontWeight: "600", margin: "0 0 6px" }}>Follow-up in how many days?</p>
        <input type="number" value={followUpDays} onChange={(e) => setFollowUpDays(e.target.value)} className="styled-input" style={{ width: "100px" }} />
      </div>

      <div>
        <button className="btn-primary" onClick={handleConfirm}>Doctor Confirms & Save</button>
      </div>
    </div>
  );
}

export default DoctorDashboard;