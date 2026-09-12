import { createContext, useContext, useState } from "react";

const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  const [doctor, setDoctor] = useState(null);

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor() {
  return useContext(DoctorContext);
}