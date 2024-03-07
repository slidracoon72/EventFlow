import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './login.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Form validation
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrors({ message: 'Please fill in all fields' });
            return;
        }

        if (password !== confirmPassword) {
            setErrors({ message: 'Passwords do not match' });
            return;
        }

        try {
            // Send registration request to the server
            const response = await axios.post('http://localhost:8080/user/register', { email, password });

            // Handle successful registration
            console.log(response);
            history.push('/login'); // Redirect to login page after successful registration
        } catch (error) {
            // Handle registration error
            setErrors({ message: 'Registration failed. Please try again.' });
        }

        // Clear form fields after submission
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className='back'>
            <div className="header-logo">
                <img src="/img/logo1.png" alt="Logo" />
            </div>
            <div className="login-container">
                <h1 style={{ marginTop: '10px' }}>Register for EventFlow</h1>
                <h2 style={{ marginTop: '10px', color: '#c18e00', textAlign: 'center' }}>Unlock Your Event Journey: Register with EventFlow!</h2>
                <form onSubmit={handleRegister} className="login-form">
                    <label>Email Address:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />

                    <div className="error-container">
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>

                    <button type="submit">Register</button>
                </form>

                <p>Already have an account? <a className='log-reg' href="/login">Login here</a></p>
            </div>
        </div>

    );
};

export default Register;
