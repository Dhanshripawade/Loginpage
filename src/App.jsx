// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import ConsultantLogin from './pages/ConsultantLogin';
import ConsultantRegister from './pages/ConsultantRegister';
import Patient from './pages/Patient';
import Receptionist from './pages/Receptionist';
import Appointment from './pages/Appointment';
import PatientDeatails from './pages/PatientDeatails';
import Departments from './pages/Departments';
import NotFound from './pages/NotFound';
import Consultant from './pages/Consultant';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctor/login" element={<ConsultantLogin />} />
        <Route path="/doctor/register" element={<ConsultantRegister />} />
        <Route path="/consultant" element={<Consultant/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/receptionists" element={<Receptionist />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/patientdeatails" element={<PatientDeatails />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/notfound" element={<NotFound />} />


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
