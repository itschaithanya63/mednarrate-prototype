import { useNavigate } from "react-router-dom";

function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div className="patient-world">
      <h1 className="patient-title">Who is providing information?</h1>
      <p className="patient-subtitle">Choose the option that fits the patient's situation</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", marginTop: "10px" }}>
        <button className="btn-primary" style={{ marginTop: 0 }} onClick={() => navigate("/language")}>
          Patient (self)
        </button>
        <button className="btn-secondary" style={{ marginTop: 0 }} onClick={() => navigate("/language?mode=staff")}>
          Staff (unconscious patient)
        </button>
        <button className="btn-secondary" style={{ marginTop: 0 }} onClick={() => navigate("/language?mode=relative")}>
          Relative
        </button>
      </div>
    </div>
  );
}

export default ModeSelector;