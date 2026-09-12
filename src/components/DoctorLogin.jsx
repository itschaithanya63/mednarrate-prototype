import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "./DoctorContext";

const registeredDoctors = [
  { id: "DOC001", password: "1234", name: "Dr. Meera Iyer", specialty: "Ayurveda Physician" },
  { id: "DOC002", password: "1234", name: "Dr. Ananya Rao", specialty: "Cardiology" },
  { id: "DOC003", password: "1234", name: "Dr. Arjun Nair", specialty: "General Physician" }
];

function DoctorLogin() {
  const [specialty, setSpecialty] = useState("Ayurveda Physician");
  const [docId, setDocId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setDoctor } = useDoctor();

  function handleLogin() {
    const match = registeredDoctors.find(
      (d) => d.id === docId && d.password === password && d.specialty === specialty
    );
    if (!match) {
      setError("Invalid ID, password, or specialty combination.");
      return;
    }
    setError("");
    setDoctor(match);
    navigate("/doctor-dashboard");
  }

  return (
    <div className="patient-world" style={{ maxWidth: "420px" }}>
      <h1 className="patient-title">Doctor Login</h1>
      <p className="patient-subtitle">Sign in with your specialty and credentials</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
        <div>
          <p className="question-hint" style={{ margin: "0 0 6px" }}>Specialty</p>
          <select className="styled-select" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="Ayurveda Physician">Ayurveda Physician (Main)</option>
            <option value="Cardiology">Cardiology</option>
            <option value="General Physician">General Physician</option>
          </select>
        </div>
        <div>
          <p className="question-hint" style={{ margin: "0 0 6px" }}>Doctor ID</p>
          <input className="styled-input" type="text" value={docId} onChange={(e) => setDocId(e.target.value)} />
        </div>
        <div>
          <p className="question-hint" style={{ margin: "0 0 6px" }}>Password</p>
          <input className="styled-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>

      {error && <p style={{ color: "var(--red)", fontSize: "13px", marginTop: "10px" }}>{error}</p>}

      <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "14px" }}>
        Demo credentials — DOC001/1234 (Ayurveda), DOC002/1234 (Cardiology), DOC003/1234 (General)
      </p>

      <button className="btn-primary" onClick={handleLogin} disabled={!docId || !password}>
        Login
      </button>
    </div>
  );
}

export default DoctorLogin;