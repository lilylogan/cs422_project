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
    width: '100%',
    boxSizing: 'border-box',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#FFFBF3',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    gap: '1rem',
    
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  },
  profileImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    objectFit: 'cover',
    
    '@media (min-width: 768px)': {
      width: '300px',
      height: '300px',
      marginRight: '2rem',
    }
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
    
    '@media (min-width: 768px)': {
      width: 'auto',
    }
  },
  label: {
    fontSize: '1.5rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    
    '@media (min-width: 768px)': {
      fontSize: '2rem',
    }
  },
  info: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    
    '@media (min-width: 768px)': {
      fontSize: '1.5rem',
    }
  },
  editButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#4A7B32',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginLeft: '0.5rem',
    transition: 'color 0.2s',
    
    '@media (min-width: 768px)': {
      fontSize: '1rem',
    }
  },
  buttonsContainer: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
    
    '@media (min-width: 768px)': {
      marginTop: '2rem',
      gap: '1rem',
    }
  },
  button: {
    padding: '0.625rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    background: '#4A7B32',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
    width: '100%',
    
    '@media (min-width: 768px)': {
      fontSize: '1.125rem',
      padding: '0.75rem',
      width: 'auto',
    }
  },
  deleteButton: {
    backgroundColor: '#B75E4A',
  },
  editButtonHover: {
    color: '#6F8CA4',
    textDecoration: 'underline',
  },
  buttonHover: {
    filter: 'brightness(1.3)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  }
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
    <div style={{
      ...styles.container,
      ...(window.innerWidth < 768 ? {
        padding: '0.5rem',
      } : {})
    }}>
      <div style={{
        ...styles.profileSection,
        ...(window.innerWidth < 768 ? {
          padding: '0.5rem',
          gap: '0.5rem',
        } : {})
      }}>
        <img
          style={{
            ...styles.profileImage,
            ...(window.innerWidth < 768 ? {
              width: '150px',
              height: '150px',
              marginRight: '0',
            } : {})
          }}
          src={profileImage}
          alt="Profile"
        />
        <div style={styles.infoContainer}>
          <div>
            <label style={{
              ...styles.label,
              ...(window.innerWidth < 768 ? {
                fontSize: '1.25rem',
              } : {})
            }}>Name</label>
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
            <label style={{
              ...styles.label,
              ...(window.innerWidth < 768 ? {
                fontSize: '1.25rem',
              } : {})
            }}>Email</label>
            <p style={styles.info}>{user?.email || 'Email not available'}</p>
          </div>
          <div style={styles.buttonsContainer}>
            <button
              style={{ 
                ...styles.button, 
                ...(isLogoutHovered ? styles.buttonHover : {}) 
              }}
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
              onClick={() => handleLogout(logout)}
            >
              Logout
            </button>

            <button
              style={{ 
                ...styles.button, 
                ...styles.deleteButton, 
                ...(isDeleteHovered ? styles.buttonHover : {}) 
              }}
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