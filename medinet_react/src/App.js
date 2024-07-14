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
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='App'>
          <MyNavbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:type' element={<PrivateRoute><Services /></PrivateRoute>} />
            <Route path='/login' element={ <Login />} />
            <Route path='/my-account' element={ <MyAccount />} />
            <Route path='/:type/:id' element={<DoctorDetails /> } />
            <Route path='/:type/:id' element={<ServiceDetails />} />
            <Route path='/:type/:bookingId/book' element={<PrivateRoute><CreateAppointment /></PrivateRoute>} />
            <Route path='update-details' element={<UpdateDetails /> } />
            <Route path='/practitioner/:bookingId/book' element={<PrivateRoute><CreateAppointment /></PrivateRoute>} />
            <Route path='/:type' element={< Services />} />
            <Route path='/about' element={< About />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
