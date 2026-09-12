import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import IdCreation from "./components/IdCreation";
import ModeSelector from "./components/ModeSelector";
import PatientIntake from "./components/PatientIntake";
import DoctorLogin from "./components/DoctorLogin";
import DoctorDashboard from "./components/DoctorDashboard";
import LanguageSelect from "./components/LanguageSelect";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/patient-id" element={<IdCreation />} />
        <Route path="/informant" element={<ModeSelector />} />
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/patient-intake" element={<PatientIntake />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;