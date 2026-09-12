import { useState } from "react";

const regionLabels = {
  head: "Head", neck: "Neck", leftShoulder: "Left Shoulder", rightShoulder: "Right Shoulder",
  chest: "Chest", abdomen: "Abdomen", leftArm: "Left Arm", rightArm: "Right Arm",
  leftHand: "Left Hand", rightHand: "Right Hand", leftLeg: "Left Leg", rightLeg: "Right Leg",
  leftFoot: "Left Foot", rightFoot: "Right Foot"
};

function BodyMap() {
  const [selectedRegions, setSelectedRegions] = useState({});
  const [activeRegion, setActiveRegion] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  function toggleRegion(id) { setActiveRegion(id); }
  function setPainForActive(level) {
    setSelectedRegions({ ...selectedRegions, [activeRegion]: level });
    setActiveRegion(null);
  }
  function removeRegion(id) {
    const updated = { ...selectedRegions };
    delete updated[id];
    setSelectedRegions(updated);
  }
  function isSelected(id) { return selectedRegions[id] !== undefined; }
  function fillFor(id) {
    if (activeRegion === id) return "#C8862B";
    if (isSelected(id)) return "#E3A857";
    return "#DCEFE3";
  }
  function strokeFor(id) {
    return isSelected(id) || activeRegion === id ? "#8a5c1d" : "#2F5D45";
  }

  const selectedList = Object.entries(selectedRegions);

  if (confirmed) {
    return (
      <div className="patient-world">
        <div className="thankyou-icon">✅</div>
        <h2 className="thankyou-title">Thank you</h2>
        <p style={{ color: "#666" }}>
  The doctor will review your case and confirm the diagnosis and prescription. You'll receive it via WhatsApp, email, or a printed copy based on your choice.
</p>
        <button className="btn-primary" onClick={() => (window.location.href = "/")}>
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="patient-world">
      <h2 className="patient-title">Tap where it hurts</h2>
      <p className="patient-subtitle">You can select more than one area</p>

      <svg viewBox="0 0 200 420" style={{ width: "220px", margin: "10px auto", display: "block" }}>
        <g stroke="#B7CFC2" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M100,95 C95,115 90,145 92,175" />
          <path d="M100,95 C105,115 110,145 108,175" />
        </g>
        <ellipse cx="100" cy="35" rx="22" ry="26" fill={fillFor("head")} stroke={strokeFor("head")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("head")} />
        <rect x="91" y="58" width="18" height="12" fill={fillFor("neck")} stroke={strokeFor("neck")} strokeWidth="1.5" style={{ cursor: "pointer" }} onClick={() => toggleRegion("neck")} />
        <ellipse cx="65" cy="80" rx="16" ry="10" fill={fillFor("leftShoulder")} stroke={strokeFor("leftShoulder")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("leftShoulder")} />
        <ellipse cx="135" cy="80" rx="16" ry="10" fill={fillFor("rightShoulder")} stroke={strokeFor("rightShoulder")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("rightShoulder")} />
        <ellipse cx="48" cy="145" rx="13" ry="55" transform="rotate(-8 48 145)" fill={fillFor("leftArm")} stroke={strokeFor("leftArm")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("leftArm")} />
        <ellipse cx="152" cy="145" rx="13" ry="55" transform="rotate(8 152 145)" fill={fillFor("rightArm")} stroke={strokeFor("rightArm")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("rightArm")} />
        <ellipse cx="42" cy="205" rx="10" ry="12" fill={fillFor("leftHand")} stroke={strokeFor("leftHand")} strokeWidth="1.5" style={{ cursor: "pointer" }} onClick={() => toggleRegion("leftHand")} />
        <ellipse cx="158" cy="205" rx="10" ry="12" fill={fillFor("rightHand")} stroke={strokeFor("rightHand")} strokeWidth="1.5" style={{ cursor: "pointer" }} onClick={() => toggleRegion("rightHand")} />
        <path d="M65,75 C65,68 78,64 100,64 C122,64 135,68 135,75 L131,150 L69,150 Z" fill={fillFor("chest")} stroke={strokeFor("chest")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("chest")} />
        <path d="M69,150 L131,150 L126,188 C126,196 114,200 100,200 C86,200 74,196 74,188 Z" fill={fillFor("abdomen")} stroke={strokeFor("abdomen")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("abdomen")} />
        <ellipse cx="85" cy="290" rx="18" ry="90" fill={fillFor("leftLeg")} stroke={strokeFor("leftLeg")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("leftLeg")} />
        <ellipse cx="115" cy="290" rx="18" ry="90" fill={fillFor("rightLeg")} stroke={strokeFor("rightLeg")} strokeWidth="2" style={{ cursor: "pointer" }} onClick={() => toggleRegion("rightLeg")} />
        <ellipse cx="80" cy="395" rx="14" ry="8" fill={fillFor("leftFoot")} stroke={strokeFor("leftFoot")} strokeWidth="1.5" style={{ cursor: "pointer" }} onClick={() => toggleRegion("leftFoot")} />
        <ellipse cx="120" cy="395" rx="14" ry="8" fill={fillFor("rightFoot")} stroke={strokeFor("rightFoot")} strokeWidth="1.5" style={{ cursor: "pointer" }} onClick={() => toggleRegion("rightFoot")} />
      </svg>

      {activeRegion && (
        <div style={{ marginTop: "10px" }}>
          <p style={{ color: "#2F5D45", fontWeight: "600" }}>{regionLabels[activeRegion]} — pain level</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap" }}>
            {[1,2,3,4,5,6,7,8,9,10].map((num) => (
              <button key={num} onClick={() => setPainForActive(num)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1.5px solid #E2D9C6", backgroundColor: "white", color: "#2B2620", cursor: "pointer" }}>
                {num}
              </button>
            ))}
          </div>
          <button className="btn-small" style={{ marginTop: "10px" }} onClick={() => setActiveRegion(null)}>Cancel</button>
        </div>
      )}

      {selectedList.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "260px", margin: "20px auto 0" }}>
          <p style={{ fontWeight: "600", color: "#2F5D45" }}>Selected areas:</p>
          {selectedList.map(([id, level]) => (
            <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #EFE8D9" }}>
              <span>{regionLabels[id]} — {level}/10</span>
              <button className="btn-small" onClick={() => removeRegion(id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {selectedList.length > 0 && !activeRegion && (
        <button className="btn-primary" onClick={() => setConfirmed(true)}>
          Confirm ({selectedList.length} area{selectedList.length !== 1 ? "s" : ""})
        </button>
      )}
    </div>
  );
}

export default BodyMap;