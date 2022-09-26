import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Calendar } from "react-date-range";
// import PhoneInput from 'react-phone-number-input'
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-phone-number-input/style.css";

export default function UpdateProfile() {
	const nameRef = useRef();
	const emailRef = useRef();
	const phoneNumber = useRef();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [birthDate, setBirthDate] = useState("");
	const [open, setOpen] = useState(false);

	const photoUrl = useRef("");
	const [profilePhoto, setProfilePhoto] = useState();
	const [profilePhotoBytes, setProfilePhotoBytes] = useState([]);

	const handleSelect = (date) => {
		setBirthDate(format(date, "MM/dd/yyyy"));
	};

	// get the target element to toggle

	async function handleSubmit(e) {
		e.preventDefault();
		
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
					<h2 className='text-center mb-4'>Update Your Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='name'>
							<Form.Label>Update your Name</Form.Label>
							<Form.Control
								type='text'
								ref={nameRef}
								required
								className='email--input'
							/>
						</Form.Group>
						<Form.Group id='calender'>
							<Form.Label>Update your Birth Date</Form.Label>
							<Form.Control
								type='text'
								value={birthDate}
								placeholder='Select your birth date'
								readOnly
								onClick={() => setOpen((open) => !open)}
							/>

							{open && <Calendar date={new Date()} onChange={handleSelect} />}
						</Form.Group>
						<Form.Group id='phonenumber'>
							<Form.Label>Update your Phone number</Form.Label>

							<Form.Control
								type='text'
								placeholder='999-999-9999'
								ref={phoneNumber}
							/>
						</Form.Group>

						<Form.Group id='email'>
							<Form.Label>Update your Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								className='email--input'
							/>
						</Form.Group>
					
						<br />
						<Form.Group id='Image'>
							<Form.Label>Update Image</Form.Label>
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
							Save
						</Button>
                        <br/>
                        <br />
                        <Button  className='w-100' type='button'>
							Cancel
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
