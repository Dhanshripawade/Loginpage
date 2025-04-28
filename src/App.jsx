// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ConsultantLogin from './pages/Consultant/ConsultantLogin';
import ConsultantRegister from './pages/Consultant/ConsultantRegister';
import ConsultantHome from './pages/Consultant/ConsultantHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctor/login" element={<ConsultantLogin />} />
        <Route path="/doctor/register" element={<ConsultantRegister />} />
        <Route path='/consultantHome' element={<ConsultantHome/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
