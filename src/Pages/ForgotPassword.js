import React, { useRef } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const emailRef = useRef()

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(emailRef.current.value);
	};

    return (
        <>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Enter Email" type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button variant="primary" className="w-100 text-center mt-3" type="submit">
                    Reset Password
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    Back to <Link to="/login">Login Page</Link> !
                </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/register">Sign Up</Link>
            </div>
        </>
    );
}

export default ForgotPassword;