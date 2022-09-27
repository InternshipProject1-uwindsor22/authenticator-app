import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Calendar } from "react-date-range";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Services/FirebaseService";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-phone-number-input/style.css";

export default function RegisterPage() {
  const {
    upload,
    signup,
    uploadURL,
    currentUser,
    sendVerify,
    updateFullProfile,
  } = useAuth();
  if (currentUser) {
    return <Navigate to="/" />;
  }

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneNumber = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const photoUrl = useRef("");
  const [profilePhoto, setProfilePhoto] = useState();
  const [profilePhotoBytes, setProfilePhotoBytes] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value).then((data) => {
        setLoading(false);
        return <Navigate to="/profile" />;
      });
    } catch {
      alert("Failed to create an account");
      setError("Failed to create an account");
    }
  }

  function getProfilePhotoBytes(e) {
    const file = e.target.files[0];
    setProfilePhoto(file);
    const fReader = new FileReader();
    const fileBytes = [];
    fReader.readAsArrayBuffer(file);
    fReader.onloadend = (et) => {
      if (et.target.readyState === FileReader.DONE) {
        const buf = et.target.result,
          arr = new Uint8Array(buf);
        for (const a of arr) {
          fileBytes.push(a);
        }
        setProfilePhotoBytes(fileBytes);
      }
    };
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                className="email--input"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <br />
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </Card>
    </div>
  );
}
