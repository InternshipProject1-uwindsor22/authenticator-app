import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
    return (
        <div>
            {"Register Page"}
            <hr></hr>
            <Link to='/'>Back to Login Page?</Link>
        </div>
    );
}
export default RegisterPage;