import React, { useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../Services/FirebaseService";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(emailRef.current.value);
  };

  return (
    <div style={{border: '2px solid #26edd3', borderBottom: '0px', borderRadius: 5, padding: 35}}>
      <Card style={{background: 'linear-gradient(rgba(255,255,255,.3), rgba(0,0,0,.3))', padding: 5, color: 'white', border: '2px solid #c4aa33'}}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter Email"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              className="w-100 text-center mt-3"
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            Back to <Link to="/">Login Page</Link> !
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{color: 'white'}}>
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
