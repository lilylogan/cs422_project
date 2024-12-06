/* 
settings.js
Description: Component for displaying and handling the settings page. Allows users to change their name, login, logout, or
switch their user profile image to one of the eight available options.
Date: December 2nd, 2024
Inital Author: Ellison Largent
Modified By: 
*/
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { handleLogout, handleDeleteAccount } from '../containers/authUtils.js';
import defaultProfileImage from '../assets/wally_wale.jpg';
import { useAuth } from '../context/AuthContext';


// Import all profile images
import bearImage from '../assets/bear.jpg';
import bunnyImage from '../assets/bunny.jpg';
import catImage from '../assets/cat.jpg';
import lionImage from '../assets/lion.jpg';
import duckImage from '../assets/duck.png';
import mouseImage from '../assets/mouse.jpg';
import octopusImage from '../assets/octopus.jpg';

const profileImages = [
  {src: bearImage, tag: 'bear'},
  {src: bunnyImage, tag: 'bunny'},
  {src: catImage, tag: 'cat'},
  {src: lionImage, tag: 'lion'},
  {src: duckImage, tag: 'duck'},
  {src: mouseImage, tag: 'mouse'},
  {src: octopusImage, tag: 'octopus'},
  {src: defaultProfileImage, tag: 'wally'}
];

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
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  imageOption: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  selectedImage: {
    transform: 'scale(1.1)',
    boxShadow: '0 0 0 3px #4A7B32',
  }

};

/*  
    Description: Component to display the settings page with all buttons and functionality.
*/
function Settings() {
  const [isLogoutHovered, setLogoutHovered] = useState(false);
  const [isDeleteHovered, setDeleteHovered] = useState(false);
  const [isEditHovered, setEditHovered] = useState(false);
  const { user, logout } = useAuth();

  /* 
  Description: Prompts the user to update their first and last name through a modal dialog and sends the updated data to the backend API.
  Parameters: None
  Returns: None
  Purpose: Allows users to edit their name and updates the backend database.
  */
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

  /* 
  Description: Opens a modal displaying available profile images. Users can select an image, and the selection is sent to the backend API for update.
  Parameters: None
  Returns: None
  Purpose: Lets users choose and update their profile image.
  */
  const handleEditProfileImage = async () => {
    const { value: selectedTag } = await Swal.fire({
      title: 'Choose Your Profile Image',
      html: `
        <div id="image-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1rem;">
          ${profileImages.map(img => `
            <img 
              src="${img.src}" 
              alt="${img.tag}" 
              data-tag="${img.tag}"
              style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; cursor: pointer;"
              class="profile-image-option"
            />
          `).join('')}
        </div>
      `,
      background: '#FAF5F0',
      color: '#3B2A1D',
      confirmButtonText: 'Select',
      confirmButtonColor: '#4A7B32',
      showCancelButton: true,
      cancelButtonColor: '#B75E4A',
      didRender: () => {
        const imageGrid = document.getElementById('image-grid');
        imageGrid.addEventListener('click', (e) => {
          if (e.target.classList.contains('profile-image-option')) {
            document.querySelectorAll('.profile-image-option').forEach(img => {
              img.style.transform = 'scale(1)';
              img.style.boxShadow = 'none';
            });
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 0 0 3px #4A7B32';
          }
        });
      },
      preConfirm: () => {
        const selectedImg = document.querySelector('.profile-image-option[style*="scale(1.1)"]');
        return selectedImg ? selectedImg.getAttribute('data-tag') : null; 
      },
      customClass: {
        confirmButton: 'custom-confirm-button',
      },
    });

    if (selectedTag) {
      console.log('Payload being sent:', {
        userId: user?.userID,
        imageTag: selectedTag,
      });
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/update-profile-image`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: user?.userID, 
            imageTag: selectedTag
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update profile image');
        }

        await Swal.fire({
          title: "Profile Image Updated",
          text: "Your profile image has been successfully updated.",
          icon: "success",
          background: '#FAF5F0',
          color: '#3B2A1D',
          iconColor: '#4A7B32',
          confirmButtonColor: '#4A7B32',
        });

        // Force a page reload or context refresh to show updated image
        window.location.reload();
      } catch (error) {
        console.error('Update profile image error:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to update profile image. Please try again.",
          icon: "error",
          background: '#FAF5F0',
          color: '#3B2A1D',
          iconColor: '#95340A',
        });
      }
    }
  };


  /*    PAGE LAYOUT     */

  const currentProfileImage = profileImages.find(img => img.tag === user?.image_path) || profileImages.find(img => img.tag === 'wally');
  
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
          src={currentProfileImage.src}
          alt="Profile"
          onClick={handleEditProfileImage}
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