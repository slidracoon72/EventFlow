import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Retrieve user email from local storage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // clear email
    localStorage.removeItem('accessToken'); // Clear access token
    setUserEmail("");
    setIsDropdownOpen(false);
    history.push('/login');
  };

  const handleLoginClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/dashboard">
          <img src="/img/logo1.png" alt="Logo" />
        </Link>
      </div>
      <div className="logout">
        <img
          src="/img/logout.png"
          alt="Logout"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className="dropdown-form">
            {userEmail && (
              <h3>{userEmail}</h3>
            )}
            {userEmail ? (
              <Button size="small" variant="contained" color="error" onClick={handleLogout}>LOGOUT</Button>
            ) : (
              <Link to="/login">
                <Button size="small" variant="contained" color="success" onClick={handleLoginClick}>LOGIN</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
