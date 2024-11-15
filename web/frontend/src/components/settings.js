import React, { useState } from 'react';
import { handleLogout, handleDeleteAccount } from '../containers/authUtils.js'; // Adjust the path as needed
import profileImage from '../assets/wally_wale.jpg'; // Import the local image


// 
// 
const styles = {
  container: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '1rem',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'row', // Place profile image and info side by side
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.75rem',
    backgroundColor: '#FFFBF3',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Matching box-shadow style
  },
  profileImage: {
    width: '300px', // Adjusted size
    height: '300px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginRight: '2rem', // Add spacing between image and info
    objectFit: 'cover', // Ensures the image fits within the circle
  },
  infoContainer: {
    flex: 1, // Make the info container take up remaining space
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '2rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  info: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  buttonsContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%', // Ensure buttons take full width
  },
  button: {
    padding: '0.75rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'white',
    background: '#4A7B32',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
  },
  deleteButton: {
    backgroundColor: '#B75E4A',
  },
  buttonHover: {
    filter: 'brightness(1.3)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  },
};

function Settings() {
  const [isLogoutHovered, setLogoutHovered] = useState(false);
  const [isDeleteHovered, setDeleteHovered] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.profileSection}>
        {/* Using imported image for the profile picture */}
        <img
          style={styles.profileImage}
          src={profileImage} // Referencing the imported image
          alt="Profile"
        />
        <div style={styles.infoContainer}>
          <div>
            <label style={styles.label}>Name</label>
            <p style={styles.info}>Wally Wale</p>
          </div>
          <div>
            <label style={styles.label}>Email</label>
            <p style={styles.info}>wallywale123@gmail.com</p>
          </div>
          {/*
          <div>
            <label style={styles.label}>Date Joined</label>
            <p style={styles.info}>10/22/2024</p>
          </div>
          */}
          <div style={styles.buttonsContainer}>
            <button
              style={{ ...styles.button, ...(isLogoutHovered ? styles.buttonHover : {}) }}
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              style={{ ...styles.button, ...styles.deleteButton, ...(isDeleteHovered ? styles.buttonHover : {}) }}
              onMouseEnter={() => setDeleteHovered(true)}
              onMouseLeave={() => setDeleteHovered(false)}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
