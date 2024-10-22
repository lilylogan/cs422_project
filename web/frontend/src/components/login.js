import React, { useState } from 'react';
import loginImage from '../assets/loginimage.jpg';
import { useNavigate } from 'react-router-dom';

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
    marginLeft:'auto',
    marginRight:'auto'
  },
  loginButton: {
    width: '50%',
    minWidth: '200px',
    padding: '0.75rem 1rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'black',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '1rem',
    display:'block',
    marginLeft:'auto',
    marginRight:'auto'
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
  }
};

const LoginPage = ({ onLogin, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin?.(email, password);
    navigate('/main/home');
  };

  const handleSignUp = () => {
    onSignUp?.();
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter text here"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter text here"
            />
          </div>

          <button type="submit" style={styles.loginButton}>
            Login
          </button>
        </form>

        <button 
          onClick={handleSignUp} 
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