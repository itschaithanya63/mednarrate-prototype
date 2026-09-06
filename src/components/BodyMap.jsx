import { useState } from "react";

function BodyMap() {
  const regions = ["Head", "Chest", "Abdomen", "Arm", "Leg", "Back"];
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [painLevel, setPainLevel] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

    if (confirmed) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Thank you</h2>
        <p>Please wait for the doctor.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Tap where it hurts</h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            style={{
              padding: "25px",
              fontSize: "16px",
              backgroundColor: selectedRegion === region ? "#ffb3b3" : "#eee",
              border: "2px solid #999",
              borderRadius: "8px"
            }}
          >
            {region}
          </button>
        ))}
      </div>

      {selectedRegion && (
        <div style={{ marginTop: "30px" }}>
          <p>Pain level for <strong>{selectedRegion}</strong>:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
            {[1,2,3,4,5,6,7,8,9,10].map((num) => (
              <button
                key={num}
                onClick={() => setPainLevel(num)}
                style={{
                  padding: "10px",
                  backgroundColor: painLevel === num ? "#ff8080" : "#f5f5f5",
                  border: "1px solid #999"
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedRegion && painLevel && (
        <button
          style={{ marginTop: "30px", padding: "12px 25px", fontSize: "16px" }}
          onClick={() => setConfirmed(true)}
        >
          Confirm
        </button>
      )}
    </div>
  );
}

export default BodyMap;