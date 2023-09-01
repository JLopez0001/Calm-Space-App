import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavFeature from './components/navbar';
import HomePage from './pages/homePage/home';
import LoginPage from './pages/loginPage/login';  
import RegisterPage from './pages/registerPage/register';
import SearchPage from './pages/searchPatientPage/search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <NavFeature />
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/search-patient' element={<SearchPage/>} />
          </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
