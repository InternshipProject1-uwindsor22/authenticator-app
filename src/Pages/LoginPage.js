import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { AuthProvider, useAuth } from "../Services/FirebaseService";
import { Navigate } from "react-router-dom";
import backgroundimg from './backgroundimg.jpg';

export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth();
  const { currentUser } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    login(emailRef.current.value, passwordRef.current.value);
  };
  const handleGoogleLogIn = (e) => {
    signInWithGoogle();
  };
  if (currentUser) {
    return <Navigate replace to="/profile" />;
  }
  return (
    <div style={{border: '2px solid #26edd3', borderBottom: '0px', borderRadius: 5, padding: 35}}>
      <Card style={{background: 'linear-gradient(rgba(255,255,255,.3), rgba(0,0,0,.3))', padding: 5, color: 'white', border: '2px solid #c4aa33'}}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group
              id="password"
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Log In
            </Button>
            <div className="mb-3 mt-3 text-center"> or </div>
            <GoogleButton onClick={handleGoogleLogIn} className="w-100" />
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{color: 'white'}}>
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
}
