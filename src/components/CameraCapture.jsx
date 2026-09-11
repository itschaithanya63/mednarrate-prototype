import { useRef, useState, useEffect } from "react";

function CameraCapture({ onDone }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        setError("Could not access camera. You can still skip this step.");
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setPhotos([...photos, dataUrl]);
  }

  function deletePhoto(index) {
    setPhotos(photos.filter((_, i) => i !== index));
  }

  function handleConfirm() {
    console.log("Confirm clicked,photos:",photos);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onDone(photos);
  }

  function handleSkip() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onDone([]);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Capture medicine/prescription photos</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        Take one or more photos. You can retake or delete any of them before confirming.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <div>
          <video ref={videoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "8px", border: "1px solid #ccc" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <br />
          <button style={{ marginTop: "15px", padding: "10px 20px" }} onClick={takePhoto}>
            📸 Capture Photo
          </button>
        </div>
      )}

      {photos.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Captured photos ({photos.length}):</strong></p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {photos.map((photo, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={photo} alt={`Capture ${i + 1}`} style={{ width: "120px", borderRadius: "6px", border: "1px solid #ccc" }} />
                <button
                  onClick={() => deletePhoto(i)}
                  style={{ position: "absolute", top: "2px", right: "2px", background: "red", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer" }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "25px" }}>
        <button style={{ padding: "10px 20px", marginRight: "10px" }} onClick={handleSkip}>
          Skip
        </button>
        <button style={{ padding: "10px 20px" }} onClick={handleConfirm}>
          Confirm ({photos.length} photo{photos.length !== 1 ? "s" : ""})
        </button>
      </div>
    </div>
  );
}

export default CameraCapture;