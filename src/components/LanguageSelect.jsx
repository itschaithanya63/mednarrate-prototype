import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

const languages = [
  { code: "en-IN", label: "English" },
  { code: "hi-IN", label: "हिंदी (Hindi)" },
  { code: "kn-IN", label: "ಕನ್ನಡ (Kannada)" }
];

function LanguageSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLanguage } = useLanguage();

  function handleSelect(langCode) {
    setLanguage(langCode);
    navigate("/patient-intake" + location.search);
  }

  return (
    <div className="patient-world">
      <h2 className="patient-title">Choose your language</h2>
      <p className="patient-subtitle">भाषा चुनें • ಭಾಷೆ ಆರಿಸಿ</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", marginTop: "20px" }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className="btn-secondary"
            style={{ width: "220px", margin: 0 }}
            onClick={() => handleSelect(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelect;