import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Calendar } from "react-date-range";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Services/FirebaseService";
import { useNavigate } from "react-router-dom";
// import PhoneInput from 'react-phone-number-input'
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-phone-number-input/style.css";

export default function UpdateProfile() {
  const {
    currentUser,
    resetPassword,
    upload,
    uploadURL,
    updatePhoneNumberM,
    updateName,
    updateEmailM,
  } = useAuth();
  const [nameRef,setNameRef] = useState(currentUser.displayName);
  const [emailRef,setEmailRef] = useState(currentUser.email);
  const [phoneNumber,setPhoneNumber] = useState(currentUser.phoneNumber);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const photoUrl = useRef("");
  const [profilePhoto, setProfilePhoto] = useState();
  const [profilePhotoBytes, setProfilePhotoBytes] = useState([]);
  let history = useNavigate();
  const handleReset = (e) => {
    resetPassword(currentUser.email).then((data) => {
      alert("reset link has been sent to your email!");
    });
  };
  // get the target element to toggle

  function handleSubmit(e) {
    e.preventDefault();
    if (profilePhoto) {
      updateName(nameRef);
      upload(profilePhoto);
      if (emailRef) {
        updateEmailM(emailRef).then(() => {
          setLoading(false);
          history("/profile");
        });
      }
    } else if (photoUrl.current.value != "") {
      uploadURL(photoUrl.current.value);
      updateName(nameRef);
      if (emailRef) {
        updateEmailM(emailRef).then(() => {
          setLoading(false);
          history("/profile");
        });
      }
    } else {
      console.log("we are in");
      updateName(nameRef);
      
      if (emailRef) {
        updateEmailM(emailRef).then(() => {
          setLoading(false);
          history("/profile");
        });
      }
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
          <h2 className="text-center mb-4">Update Your Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Update your Name</Form.Label>
              <Form.Control
                type="text"
                value={nameRef}
                required
                className="email--input"
                onChange={(e)=>{setNameRef(e.target.value)}}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Update your Email</Form.Label>
              <Form.Control
                type="email"
                value={emailRef}
                className="email--input"
                onChange={(e)=>{setEmailRef(e.target.value)}}
              />
            </Form.Group>
            <br />
            <Form.Group id="Image">
              <Form.Label>Update Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                onChange={getProfilePhotoBytes}
              />
              <div
                className="d-flex justify-content-center"
                style={{ margin: 2 }}
              >
                Or
              </div>
              <Form.Control
                type="text"
                ref={photoUrl}
                placeholder="Enter url"
              />
            </Form.Group>
            <br />
            <Button disabled={loading} className="w-100" type="submit">
              Save
            </Button>
            <br />
            <br />
            <div className="d-flex">
              <div className="d-flex justify-content-start">
                <Button variant="primary" onClick={handleReset}>
                  Reset Password
                </Button>
              </div>
              <div className="d-flex justify-content-end">
                <Link className="btn btn-primary" to="/profile">
                  Cancel
                </Link>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
