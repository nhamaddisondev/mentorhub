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
import MenteeProfile from './pages/Profile/menteeProfile';
import MentorProfile from './pages/Profile/mentorProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/password_reset" element={<PasswordReset />} />

        {/* Mentor */}
        <Route path="/mentor/apply" element={<Apply />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/mentor/browse" element={
          <>
            <Header />
            <Browse />
            <Footer />
          </>
        } />

        {/* Dashboard */}
        <Route path="/dashboard" element={
          <>
            {/* <Header /> */}
            <Dashboard />
          </>
        } />

        {/* Profile Routes */}
        <Route path="/mentee/profile" element={
          <>
            <Header />
            <MenteeProfile />
            <Footer />
          </>
        } />
        
        <Route path="/mentor/profile" element={
          <>
            <Header />
            <MentorProfile />
            <Footer />
          </>
        } />

        {/* Default pages */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/find-mentor" element={
          <>
            <Header />
            <FindMentor />
            <Footer />
          </>
        } />

        {/* Fallback for unknown routes */}
        <Route path="*" element={
          <>
            <Header />
            <div className="p-10 text-center">
              <h1 className="text-2xl font-bold text-red-600">404 - Page Not Found</h1>
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;