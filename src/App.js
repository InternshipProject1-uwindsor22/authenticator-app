import React from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgotPassword from './Pages/ForgotPassword';
import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <Router>
            <Routes>
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/forgot-password" element={<ForgotPassword />} />
              <Route exact path="/" element={<ProfilePage />} />
            </Routes>
        </Router>
      </div>
    </Container>
  );
}

export default App;
