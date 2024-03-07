import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory for programmatic navigation
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory(); // Get the history object
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Form validation
        if (!email.trim() || !password.trim()) {
            setErrors({ message: 'Please Enter Your Email and Password!' });
            return;
        }

        try {
            // Send login request to the server
            const response = await axios.post('http://localhost:8080/user/login', { email, password });

            // Handle successful login
            setLoginSuccess(true);

            // Store user email in local storage
            e = JSON.parse(response.config.data)['email']
            localStorage.setItem('userEmail', e);

            // Store the access token in local storage
            localStorage.setItem('accessToken', response.data);

            // Redirect to dashboard upon successful login
            history.push(`/dashboard`);
            // Refresh the page to load dashboard content
            window.location.reload();
        } catch (error) {
            // Handle login error
            setErrors({ message: 'Invalid Email or Password' });
        }

        // Clear form fields after submission
        setEmail('');
        setPassword('');
    };

    return (
        <div className='back'>
            <div className="header-logo">
                <img src="/img/logo1.png" alt="Logo" />
            </div>
            <div className="login-container">
                <h1 style={{ marginTop: '10px' }}>Welcome to EventFlow</h1>
                <h2 style={{ marginTop: '10px', color: '#c18e00', textAlign: 'center' }}>EventFlow Gateway: Unlock Your Event Experience</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <label>Email Address:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                    <div className='error-container'>
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account?  <a className='log-reg' href="/register"> Register Here</a></p>
            </div>
        </div>
    );
};

export default Login;