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
    <Card className="w-100" style={{background: 'linear-gradient(rgba(255,255,255,.3), rgba(0,0,0,.3))', padding: 5, color: 'white', border: '2px solid #c4aa33'}}>
      <div className="d-flex justify-content-center">
        <Card.Img
          src={currentUser.photoURL ? currentUser.photoURL : holder}
          style={{ width: 200, height: 200, padding: 0, border: '0.8px solid grey', borderRadius: '50%', marginTop: 5 }}
        />
      </div>
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
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <Link className="btn btn-outline-primary" to="/updateProfile">Update</Link>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="outline-danger" onClick={handleSignOut}>
            SignOut
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
