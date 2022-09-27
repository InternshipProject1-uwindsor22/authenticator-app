import React, { useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../Services/FirebaseService";
import holder from "./holder.jpg";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
	const { currentUser, logout } = useAuth();
	const [checked, setChecked] = useState(false);
	const handleUpdate = (e) => {
		console.log("update");
	};
	const handleSignOut = (e) => {
		console.log("sign out");
		logout();
	};
	if (!currentUser) {
		return <Navigate replace to='/login' />;
	}
	if (!currentUser.emailVerified) {
		alert("Please verify your account first");
		logout();
	}
	fetch(currentUser.photoURL)
		.then((response) => {
			if (response.status == 200) {
				setChecked(true);
			}
		})
		.catch(() => {});
	console.log(currentUser);
	return (
		<Card className='w-100'>
			<div className='d-flex justify-content-center'>
				<Card.Img
					src={checked ? currentUser.photoURL : holder}
					style={{ width: 200, height: 200, margin: 5 }}
				/>
			</div>
			<hr />
			<Card.Body>
				<h3 className='text-center'>User Details </h3>
				<hr />
				<div className='mt-2 mb-2'>
					<Card.Title>Name:</Card.Title>
					<p>{currentUser.displayName}</p>
					<Card.Title>Email:</Card.Title>
					<p>{currentUser.email}</p>
					<Card.Title>Phone:</Card.Title>
					<p>
						{currentUser.phoneNumber ? currentUser.phoneNumber : "Not provided"}
					</p>
				</div>
				<hr />
				<div className='d-flex justify-content-end'>
					<Button variant='primary' onClick={handleUpdate}>
						Update Profile
					</Button>
				</div>
				<div className='d-flex justify-content-center'>
					<Button variant='primary' onClick={handleSignOut}>
						SignOut
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}
