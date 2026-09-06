import { Routes, Route } from "react-router-dom";
import IdCreation from "./components/IdCreation";
import ModeSelector from "./components/ModeSelector";
import PatientIntake from "./components/PatientIntake";
import DoctorDashboard from "./components/DoctorDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IdCreation />} />
      <Route path="/role" element={<ModeSelector />} />
      <Route path="/patient-intake" element={<PatientIntake />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
    </Routes>
  );
}

export default App;