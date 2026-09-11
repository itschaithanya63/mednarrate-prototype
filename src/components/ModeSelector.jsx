import { useNavigate } from "react-router-dom";

function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MedNarrate</h1>
      <p>Who is logging in?</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => navigate("/doctor-dashboard")}>Doctor</button>
        <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => navigate("/language")}>Patient</button>
        <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => navigate("/language?mode=staff")}>Staff</button>
        <button style={{ padding: "15px 30px", fontSize: "16px" }} onClick={() => navigate("/language?mode=relative")}>Relative</button>
      </div>
    </div>
  );
}

export default ModeSelector;