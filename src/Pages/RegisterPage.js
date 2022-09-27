import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function RegisterPage() {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const phoneNumber = useRef();


	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [calendar, setCalendar] = useState("");
	const [open, setOpen] = useState(false);

	const photoUrl = useRef("");
	const [profilePhoto, setProfilePhoto] = useState();
	const [profilePhotoBytes, setProfilePhotoBytes] = useState([]);
	

	const handleSelect = (date) => {
		setCalendar(format(date, "MM/dd/yyyy"));
	};

	// get the target element to toggle
	const refOne = useRef(null);
	useEffect(() => {
		document.addEventListener("keydown", hideOnEscape, true);
		document.addEventListener("click", hideOnClickOutside, true);
	}, []);

	const hideOnEscape = (e) => {
		// console.log(e.key)
		if (e.key === "Escape") {
			setOpen(false);
		}
	};

	// Hide on outside click
	const hideOnClickOutside = (e) => {
		// console.log(refOne.current)
		// console.log(e.target)
		if (refOne.current && !refOne.current.contains(e.target)) {
			setOpen(false);
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setError("Passwords do not match");
			return;
		}
		var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
	
		if (regex.test(phoneNumber.current.value)) {
			// Valid international phone number
			// console.log("valid number")
		} else {
			setError("Invalid phone number")
			return;
		}
		try {
			setError("");
		} catch {
			alert("Failed to create an account");
			setError("Failed to create an account");
		}

		setLoading(false);
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
					<h2 className='text-center mb-4'>Sign Up</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								ref={nameRef}
								required
								className='email--input'
							/>
						</Form.Group>
						<Form.Group id='calender'>
							<Form.Label>Your Birth Date</Form.Label>
							<Form.Control
								type='text'
								value={calendar}
								placeholder='Select your birth date'
								readOnly
								onClick={() => setOpen((open) => !open)}
							/>
							<div ref={refOne}>
								{open && <Calendar date={new Date()} onChange={handleSelect} />}
							</div>
						</Form.Group>
						<Form.Group id='phonenumber' className=''>
							<Form.Label>Phone number</Form.Label>

							<Form.Control
								type='text'
								placeholder='999-999-9999'
								ref={phoneNumber} 
							/>
						</Form.Group>

						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								className='email--input'
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type='password' ref={passwordConfirmRef} required />
						</Form.Group>
						<br />
						<Form.Group id='Image'>
							<Form.Label>Select Image</Form.Label>
							<Form.Control
								type='file'
								accept='image/png, image/jpeg'
								onChange={getProfilePhotoBytes}
							/>
							<div
								className='d-flex justify-content-center'
								style={{ margin: 2 }}
							>
								Or
							</div>
							<Form.Control
								type='text'
								ref={photoUrl}
								placeholder='Enter url'
							/>
						</Form.Group>
						<br />
						<Button disabled={loading} className='w-100' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
				<div className='w-100 text-center mt-2'>
					Already have an account? Log In
				</div>
			</Card>
		</div>
	);
}
