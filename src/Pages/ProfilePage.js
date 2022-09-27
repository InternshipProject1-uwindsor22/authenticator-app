import React, { useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../Services/FirebaseService";
import holder from "./holder.jpg";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { currentUser, logout,sendVerify } = useAuth();
  const [checked, setChecked] = useState(false);
  console.log(currentUser);
  const handleUpdate = (e) => {
    console.log("update");
  };
  const handleSignOut = (e) => {
    console.log("sign out");
    logout();
  };
  const handleVerify=(e)=>{
    sendVerify();
  }
  if (!currentUser) {
    return <Navigate replace to="/" />;
  }
  fetch(currentUser.photoURL).then((response) => {
    if (response.status == 200) {
      setChecked(true);
    }
  }).catch(()=>{ setChecked(false);});
  return (
    <Card className="w-100">
      <div className="d-flex justify-content-center">
        <Card.Img
          src={currentUser.photoURL ? currentUser.photoURL : holder}
          style={{ width: 200, height: 200, margin: 5 }}
        />
      </div>
      <hr />
      <Card.Body>
        <h3 className="text-center">User Details </h3>
        <hr />
        <div className="mt-2 mb-2">
          <Card.Title>Name:</Card.Title>
          <p>{currentUser.displayName}</p>
          <Card.Title>Email:</Card.Title>
          <p>{currentUser.email}</p>
          <Card.Title>Email Verification Status</Card.Title>
          <p>{currentUser.emailVerified? "Verified":"Not verified"} {!currentUser.emailVerified && <Button variant="primary" onClick={handleVerify}>Verify</Button>}</p>

          <Card.Title>Phone:</Card.Title>
          <p>
            {currentUser.phoneNumber ? currentUser.phoneNumber : "Not provided"}
          </p>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <Link className="btn btn-primary" to="/updateProfile">Update</Link>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleSignOut}>
            SignOut
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
