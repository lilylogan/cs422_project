/* 
login.js
Description: Front end handling and styling of the login page
Date: October 20th, 2024
Inital Author: Ellison Largent
Modified By: 
*/
import React, { useState } from 'react';
import loginImage from '../assets/loginimage.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginImage})`
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '3.5rem',
    color: 'white',
    marginBottom: '0.5rem',
    fontFamily: 'Brightwall, sans-serif'
  },
  subtitle: {
    color: 'white',
    fontSize: '0.875rem',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: 'white',
    fontSize: '1.125rem'
  },
  input: {
    width: '91%',
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  loginButton: {
    width: '50%',
    minWidth: '200px',
    padding: '0.75rem 1rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(45deg, #4caf50, #81c784)', // Green gradient background
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
    marginTop: '1rem',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  loginButtonHover: {
    background: 'linear-gradient(45deg, #81c784, #4caf50)', // Lighter green on hover
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)'
  },
  signupLink: {
    width: '100%',
    color: 'white',
    fontSize: '0.875rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
    textDecoration: 'none',
    textAlign: 'center'
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    textAlign: 'center',
    marginTop: '1rem'
  }
};

const LoginPage = () => {
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  /*  
    Description: Updates the state when the user types into input fields.
    Parameters: e (object) - The event object from the input change.
    Returns: void
    Purpose: To handle user input and clear any previous error messages.
  */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear any previous errors when user types
  };
  
  /*  
    Description: Handles the login process when the form is submitted.
    Parameters: e (object) - The event object from the form submission.
    Returns: void
    Purpose: To validate inputs, call the login function from AuthContext, and navigate to the home page upon success or display an error message upon failure.
  */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
        setError('Please enter both email and password');
        return;
    }
    
    setIsLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
        navigate('/main/home');
    } else {
        setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
};

  /*  
    Description: Redirects the user to the sign-up page when the "Create One Here" button is clicked.
    Parameters: None.
    Returns: void.
    Purpose: To provide a navigation option for users who do not have an account.
  */
  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <p style={styles.subtitle}>WALE TEAM PRESENTS</p>
          <p style={styles.title}>Let's Cook!</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.loginButton,
              ...(isHovered ? styles.loginButtonHover : {}),
              ...(isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          {error && <div style={styles.error}>{error}</div>}
        </form>

        <button 
          onClick={handleSignUpRedirect} 
          style={styles.signupLink}
          onMouseOver={e => e.target.style.textDecoration = 'underline'}
          onMouseOut={e => e.target.style.textDecoration = 'none'}
        >
          Don't Have An Account? Create One Here
        </button>
      </div>
    </div>
  );
};

export default LoginPage;