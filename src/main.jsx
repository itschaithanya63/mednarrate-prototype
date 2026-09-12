import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './components/LanguageContext'
import { PatientRecordsProvider } from './components/PatientRecordsContext'
import { DoctorProvider } from './components/DoctorContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <PatientRecordsProvider>
          <DoctorProvider>
            <App />
          </DoctorProvider>
        </PatientRecordsProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)