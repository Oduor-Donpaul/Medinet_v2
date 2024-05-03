import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MyNavbar from './components/Navbar';
import Services from './pages/Services';
import About from './components/About';
import HomePage from './pages/HomePage';
import DoctorDetails from './pages/DoctorDetails'
import UpdateDetails from './pages/UpdateDetails';
import ServiceDetails from './pages/ServiceDetails';
import CreateAppointment from './pages/CreateAppointment';
import MyAccount from './pages/MyAccount';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <MyNavbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/my-account' element={ <MyAccount />} />
          <Route path='/practitioners/:id' element={<DoctorDetails /> } />
          <Route path='/services/:id' element={<ServiceDetails />} />
          <Route path='/services/:bookingId/book' element={<CreateAppointment />} />
          <Route path='update-details' element={<UpdateDetails /> } />
          <Route path='/practitioner/:bookingId/book' element={<CreateAppointment />} />
          <Route path='/services' element={< Services />} />
          <Route path='/about' element={< About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
