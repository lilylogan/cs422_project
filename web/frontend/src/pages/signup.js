import React, { useState } from 'react';
import { AlertCircle, Carrot } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Oops! Your passwords don't match. Let's try that again!");
    } else {
      setError('');
      // Here you would typically send the form data to your backend
      console.log('New chef signed up:', formData);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <Carrot className="carrot-icon" />
        <h2>Let's Cook!</h2>
        <p>Sign up to start your culinary adventure</p>
      </div>

      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="chef@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <Alert className="error-alert">
              <AlertCircle className="alert-icon" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <button type="submit" className="submit-button">
            Start Cooking!
          </button>
        </form>
      </div>

      <style jsx>{`
        .signup-container {
          min-height: 100vh;
          background-color: #f0fdf4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 24px;
        }

        .signup-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .carrot-icon {
          width: 48px;
          height: 48px;
          color: #f97316;
          margin: 0 auto;
        }

        h2 {
          margin-top: 24px;
          font-size: 30px;
          font-weight: 800;
          color: #166534;
        }

        p {
          margin-top: 8px;
          font-size: 14px;
          color: #16a34a;
        }

        .signup-form-container {
          background-color: white;
          padding: 32px 16px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          border: 2px solid #bbf7d0;
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          font-weight: 500;
          color: #15803d;
          margin-bottom: 4px;
        }

        input {
          padding: 8px 12px;
          border: 1px solid #86efac;
          border-radius: 4px;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
        }

        .error-alert {
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
          padding: 8px 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }

        .alert-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        .submit-button {
          background-color: #ea580c;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #c2410c;
        }

        @media (min-width: 640px) {
          .signup-form-container {
            padding: 32px 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;