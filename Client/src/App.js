import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const userRole = window.localStorage.getItem("userRole");

  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <NavFeature userRole={userRole} />
          <Routes>
            <Route path='/' element={<TherapistHomePage/>} />
            <Route path='/qa' element={<QAHomePage/>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/create-patient' element={<CreatePatientPage/>} />
            <Route path='/patient/:patientID' element={<PatientPage />} />
            <Route path='/search-patient' element={<SearchPage/>} />
            <Route path='/create-note' element={<CreateNotePage />} />
            <Route path='/note/:noteID' element={<NoteDetailsPage userRole={userRole} />} />
          </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
