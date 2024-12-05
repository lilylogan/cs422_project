/* 
authUtils.js
Description: Displays logout and account deletion warnings to users, and logs out or deletes account
of given user when user chooses.
Date: November 19th, 2024
Inital Author: Will Marceau
Modified By: Ellison Largent
*/
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export const handleLogout = async (logoutFunction) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: '#FAF5F0',
      color: '#3B2A1D',
      iconColor: '#B75E4A',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    });

    if (result.isConfirmed) {
      await logoutFunction();
      
      // Clear any local storage data
      localStorage.clear();
      
      // Show success message
      await Swal.fire({
        title: "Logged Out Successfully",
        icon: "success",
        color: '#3B2A1D',
        background: '#FAF5F0',
        iconColor: '#4A7B32',
        timer: 1750,
        timerProgressBar: true,
        customClass: {
          confirmButton: 'custom-confirm-button',
          popup: 'logoutAlert'
        },
      });

      // Redirect to login page
      window.location.href = '/login';
    }
  } catch (error) {
    console.error('Logout error:', error);
    Swal.fire({
      title: "Error",
      text: "Failed to logout. Please try again.",
      icon: "error",
      background: '#FAF5F0',
      color: '#FAF5F0',
      iconColor: '#95340A',
    });
  }
};

export const handleDeleteAccount = async (userId) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure you want to delete your account?",
      html: "This process can <b>NOT</b> be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: '#FAF5F0',
      color: '#3B2A1D',
      iconColor: '#95340A',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    });

    if (result.isConfirmed) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete-account`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      // Clear all local storage data
      localStorage.clear();

      await Swal.fire({
        title: "Account Deleted",
        text: "Your account has been successfully deleted.",
        icon: "success",
        color: '#3B2A1D',
        background: '#FAF5F0',
        iconColor: '#4A7B32',
        customClass: {
          confirmButton: 'custom-confirm-button',
        },
      });

      // Redirect to home page
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Delete account error:', error);
    Swal.fire({
      title: "Error",
      text: "Failed to delete account. Please try again.",
      icon: "error",
      background: '#FAF5F0',
      color: '#3B2A1D',
      iconColor: '#95340A',
    });
  }
};