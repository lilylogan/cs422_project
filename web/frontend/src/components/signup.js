import React, { useState } from 'react';
import loginImage from '../assets/loginimage.jpg';
import { useNavigate } from 'react-router-dom';

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
    marginBottom: '.5rem'
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
  signupButton: {
    width: '50%',
    minWidth: '200px',
    padding: '0.75rem 1rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(45deg, #4caf50, #81c784)', // Green gradient background
    border: '2px solid transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s, border 0.2s',
    marginTop: '1rem',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  signupButtonHover: {
    background: 'linear-gradient(45deg, #81c784, #4caf50)', // Lighter green on hover
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
    border: '2px solid #ccc'
  },
  loginLink: {
    color: 'white',
    fontSize: '0.875rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    width: '100%'
  },
  error: {
    color: '#ff6b6b',
    fontSize: '0.875rem',
    textAlign: 'center',
    marginTop: '1rem'
  }
};
const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear any previous errors when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError("Oops! Your passwords don't match. Let's try that again!");
      return;
    }
    
    // Basic password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      // Registration successful
      // Store the userID in localStorage
      localStorage.setItem('userID', data.userID);
      
      // Redirect to login or dashboard
      navigate('/main/home');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <p style={styles.title}>Let's Start Cooking!</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="chef@example.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button 
          type="submit" 
          style={{
            ...styles.signupButton,
            ...(isHovered ? styles.signupButtonHover : {}),
            ...(isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {})
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isLoading}
          >
          {isLoading ? 'Creating Account...' : 'Start Cooking!'}
        </button>
          
          {error && <div style={styles.error}>{error}</div>}
        </form>

        <button 
          onClick={handleLoginRedirect} 
          style={styles.loginLink}
          onMouseOver={e => e.target.style.textDecoration = 'underline'}
          onMouseOut={e => e.target.style.textDecoration = 'none'}
        >
          Already have an account? Login here
        </button>
      </div>
    </div>

    
  );
};

export default SignUp;