import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="patient-title" style={{ color: "white", fontSize: "32px", marginBottom: "6px" }}>
        MedNarrate
      </h1>
      <p style={{ color: "#B9CBE0", marginBottom: "36px" }}>Who are you signing in as?</p>

      <div className="landing-cards">
        <div className="landing-card" onClick={() => navigate("/patient-id")}>
          <div className="landing-icon">🧍</div>
          <h2>Patient</h2>
          <p>Start a case, describe symptoms, or provide information on behalf of a patient.</p>
        </div>

        <div className="landing-card" onClick={() => navigate("/doctor-login")}>
          <div className="landing-icon">🩺</div>
          <h2>Doctor</h2>
          <p>Log in to review cases, confirm diagnoses, and manage patient follow-ups.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;