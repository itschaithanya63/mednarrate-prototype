import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IdCreation() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  function handleContinue() {
    // In a real system this would create a proper account.
    // For the prototype, we just carry the name forward via URL state.
    navigate("/role", { state: { name, contact } });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MedNarrate</h1>
      <p>Let's create your ID first</p>

      <div style={{ marginTop: "20px" }}>
        <p>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />
        </p>
        <p>
          Phone or Email:{" "}
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{ padding: "8px", width: "200px" }}
          />
        </p>
      </div>

      <button
        style={{ marginTop: "20px", padding: "12px 25px", fontSize: "16px" }}
        disabled={!name || !contact}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

export default IdCreation;