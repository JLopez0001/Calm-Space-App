import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavFeature from './components/navbar';
import TherapistHomePage from './pages/homePages/therapistHome';
import QAHomePage from './pages/homePages/qaHome';
import LoginPage from './pages/loginPage/login';  
import RegisterPage from './pages/registerPage/register';
import CreatePatientPage from './pages/createPatientPage/createPatient';
import PatientPage from './pages/patientPage/patient';
import SearchPage from './pages/searchPatientPage/search';
import CreateNotePage from './pages/notePages/createNote';
import NoteDetailsPage from './pages/notePages/note';
import EditNotePage from './pages/notePages/editNote';
import Footer from './components/footer';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const userRole = window.localStorage.getItem("userRole");

  // Check if user is logged in when app mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="App">
        <Router>
          <NavFeature userRole={window.localStorage.getItem("userRole")} loggedIn={loggedIn} handleLogout={handleLogout} />
            <Toaster position='top-right' toastOptions={{duration:4000}} />
            <main>
              <Routes>
                <Route path='/' element={<TherapistHomePage/>} />
                <Route path='/qa' element={<QAHomePage/>} />
                <Route path='/login' element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/create-patient' element={<CreatePatientPage/>} />
                <Route path='/patient/:patientID' element={<PatientPage />} />
                <Route path='/search-patient' element={<SearchPage/>} />
                <Route path='/create-note' element={<CreateNotePage />} />
                <Route path='/note/:noteID' element={<NoteDetailsPage userRole={userRole} />} />
                <Route path='/edit-note/:noteID' element={<EditNotePage />} />
              </Routes>
            </main>
          <Footer />
        </Router>
    </div>
  );
}

export default App;