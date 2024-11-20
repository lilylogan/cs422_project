import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { handleLogout, handleDeleteAccount } from '../containers/authUtils.js';
import profileImage from '../assets/wally_wale.jpg';
import { useAuth } from '../context/AuthContext';

const styles = {
  container: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '1rem',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.75rem',
    backgroundColor: '#FFFBF3',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  profileImage: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginRight: '2rem',
    objectFit: 'cover',
  },
  infoContainer: {
    flex: 1,
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
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  editButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#4A7B32',
    fontSize: '1rem',
    fontWeight: '600',
    marginLeft: '0.5rem',
    transition: 'color 0.2s',
  },
  editButtonHover: {
    color: '#6F8CA4',
    textDecoration: 'underline',
  },
  buttonsContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
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
  const [isEditHovered, setEditHovered] = useState(false);
  const { user, logout } = useAuth();

  const handleEditName = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Your Name',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="First Name" value="${user?.fname || ''}">
        <input id="swal-input2" class="swal2-input" placeholder="Last Name" value="${user?.lname || ''}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const firstName = document.getElementById('swal-input1').value;
        const lastName = document.getElementById('swal-input2').value;
        
        if (!firstName || !lastName) {
          Swal.showValidationMessage('Please enter both first and last name');
          return false;
        }
        return [firstName, lastName];
      },
      background: '#FAF5F0',
      color: '#3B2A1D',
      confirmButtonText: 'Save',
      confirmButtonColor: '#4A7B32',
      customClass: {
        confirmButton: 'custom-confirm-button',
      },
    });

    if (formValues) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/update-profile`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: user?.userID, 
            fname: formValues[0], 
            lname: formValues[1] 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update profile');
        }

        await Swal.fire({
          title: "Profile Updated",
          text: "Your name has been successfully updated.",
          icon: "success",
          background: '#FAF5F0',
          color: '#3B2A1D',
          iconColor: '#4A7B32',
          confirmButtonColor: '#4A7B32',
        });

        // Force a page reload or context refresh to show updated name
        window.location.reload();
      } catch (error) {
        console.error('Update profile error:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to update profile. Please try again.",
          icon: "error",
          background: '#FAF5F0',
          color: '#3B2A1D',
          iconColor: '#95340A',
        });
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileSection}>
        <img
          style={styles.profileImage}
          src={profileImage}
          alt="Profile"
        />
        <div style={styles.infoContainer}>
          <div>
            <label style={styles.label}>Name</label>
            <p style={styles.info}>
              {user?.fname|| '**No name provided**'} {user?.lname}
              <button
                style={{
                  ...styles.editButton,
                  ...(isEditHovered ? styles.editButtonHover : {}),
                }}
                onMouseEnter={() => setEditHovered(true)}
                onMouseLeave={() => setEditHovered(false)}
                onClick={handleEditName}
              >
              Edit
              </button>
            </p>
          </div>
          <div>
            <label style={styles.label}>Email</label>
            <p style={styles.info}>{user?.email || 'Email not available'}</p>
          </div>
          <div style={styles.buttonsContainer}>
            <button
              style={{ ...styles.button, ...(isLogoutHovered ? styles.buttonHover : {}) }}
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
              onClick={() => handleLogout(logout)}
            >
              Logout
            </button>

            <button
              style={{ ...styles.button, ...styles.deleteButton, ...(isDeleteHovered ? styles.buttonHover : {}) }}
              onMouseEnter={() => setDeleteHovered(true)}
              onMouseLeave={() => setDeleteHovered(false)}
              onClick={() => handleDeleteAccount(user?.userID)}
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