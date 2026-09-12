import { createContext, useContext, useState } from "react";

const PatientRecordsContext = createContext();

const initialPatients = [
  {
  id: 1,
  name: "Ramesh Kumar",
  submittedVia: "Guided Q&A",
  flagged: true,
  emergency: true,
  specialtyNeeded: "General Physician",
  answers: [
    "Severe chest pain",
    "3 days",
    "no diabetes",
    "Paracetamol",
    "Vegetarian, irregular sleep"
  ],
  history: []
},
  {
    id: 2,
    name: "Sita Sharma",
    submittedVia: "Body Map",
    flagged: false,
    specialtyNeeded: "Ayurveda Physician",
    region: "Shoulder",
    pain: 6,
    history: []
  },
  {
    id: 3,
    name: "Unconscious Patient (Staff entry)",
    submittedVia: "Vitals Entry",
    flagged: false,
    specialtyNeeded: "Cardiology",
    heartRate: 78,
    spo2: 96,
    bp: "120/80",
    history: []
  }
];

export function PatientRecordsProvider({ children }) {
  const [patients, setPatients] = useState(initialPatients);

  function addVisit(patientId, visit) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, history: [...p.history, visit] } : p
      )
    );
  }

  function getUpcomingReminders() {
    const reminders = [];
    patients.forEach((p) => {
      if (p.history.length > 0) {
        const lastVisit = p.history[p.history.length - 1];
        if (lastVisit.followUpDays) {
          reminders.push({
            patientName: p.name,
            followUpDays: lastVisit.followUpDays,
            visitDate: lastVisit.date
          });
        }
      }
    });
    return reminders.sort((a, b) => a.followUpDays - b.followUpDays);
  }

  return (
    <PatientRecordsContext.Provider value={{ patients, addVisit, getUpcomingReminders }}>
      {children}
    </PatientRecordsContext.Provider>
  );
}

export function usePatientRecords() {
  return useContext(PatientRecordsContext);
}