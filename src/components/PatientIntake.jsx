import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import GuidedQA from "./GuidedQA";
import BodyMap from "./BodyMap";

function PatientIntake() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // "staff", "relative", or null (= patient)

  if (mode === "staff") {
    return <StaffVitals />;
  }

  if (mode === "relative") {
    return <RelativeIntake />;
  }

  return <PatientSelfIntake />;
}

function PatientSelfIntake() {
  const [canSpeak, setCanSpeak] = useState(null);

  if (canSpeak === null) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Patient Intake</h2>
        <p>Can you speak or type to answer questions?</p>
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

function StaffVitals() {
  const [heartRate, setHeartRate] = useState("");
  const [spo2, setSpo2] = useState("");
  const [bp, setBp] = useState("");
  const [saved, setSaved] = useState(false);

    if (saved) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Thank you</h2>
        <p>Vitals recorded. Please wait for the doctor.</p>
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

function RelativeIntake() {
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

export default PatientIntake;