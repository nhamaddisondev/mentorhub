import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Navbar/Header.jsx';
import Home from './pages/Home/Home.jsx';
import FindMentor from './pages/Home/FindMentor.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import Apply from './mentor/Apply.jsx';
import PasswordReset from './auth/Password_reset.jsx';
import Mentor from './pages/Home/Mentor.jsx';
import Browse from './mentor/Browse.jsx'; 
import Dashboard from './dashboard/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/password_reset" element={<PasswordReset />} />
        <Route path="/mentor/apply" element={<Apply />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/dashboard" element={
          <>
            {/* <Header /> */}
            <Dashboard />
          </>
        } />
        <Route path="/mentor/browse" element={
          <>
            <Header />
            <Browse />
            <Footer />
          </>
        } />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/find-mentor" element={<FindMentor />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App