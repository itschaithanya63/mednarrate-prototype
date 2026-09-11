import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import IdCreation from "./components/IdCreation";
import ModeSelector from "./components/ModeSelector";
import PatientIntake from "./components/PatientIntake";
import DoctorDashboard from "./components/DoctorDashboard";
import LanguageSelect from "./components/LanguageSelect";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  return (
    <>
      <TopBar />

      <Routes>

        <Route
          path="/"
          element={<IdCreation />}
        />

        <Route
          path="/role"
          element={<ModeSelector />}
        />

        <Route
          path="/patient-intake"
          element={<PatientIntake />}
        />

        <Route
          path="/doctor-dashboard"
          element={<DoctorDashboard />}
        />

        <Route
          path="/language"
          element={<LanguageSelect />}
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;