// authUtils.js

export const handleLogout = () => {
    // Clear any user session data
    localStorage.removeItem('user');
    // Redirect to login page or home page
    window.location.href = '/login';
  };
  
  export const handleDeleteAccount = () => {
    // Call your API to delete the account
    // Here we'll just simulate with an alert
    alert('Account deleted successfully');
    // Clear any user session data
    localStorage.removeItem('user');
    // Redirect to login page or home page
    window.location.href = '/login';
  };
  