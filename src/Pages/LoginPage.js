import React, { useRef } from 'react';
import { Form, Button, Card } from "react-bootstrap"

export default function LoginPage(){

    const emailRef = useRef()
    const passwordRef = useRef()

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(emailRef.current.value, passwordRef.current.value);
	};

	return (
		<>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Enter email" type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                    </Form.Group>
                    <Button variant="primary"type="submit">
                    Log In
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    Forgot Password?
                </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? Sign Up
            </div>
		</>
	);
};
