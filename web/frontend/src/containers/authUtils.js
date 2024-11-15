// authUtils.js
import Swal from 'sweetalert2'

export const handleLogout = () => {
  // popup for confirmation
  Swal.fire({
    title: "Are you sure you want to delete your account?",
    html: "This process can <b>NOT</b> be undone!",
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
    }).then((result) => {
      if (result.isConfirmed) {
        // some notification to tell the user that their account was successfully deleted
        // on successfull deletion
        Swal.fire({
          title: "Scores Reset!",
          text: "You scores have been reset to the default.",
          icon: "success",
          color: '#203a58',
          background: '#D1D6D9',
          iconColor: '#6F8CA4',
          customClass: {
            confirmButton: 'custom-confirm-button',
          },
        })
    // Clear any user session data
    localStorage.removeItem('user');
    // Redirect to login page or home page
    window.location.href = '/login';
    }
  })
};
  
  export const handleDeleteAccount = () => {
    // Call your API to delete the account
    // Here we'll just simulate with an alert
    Swal.fire({
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
      }).then((result) => {
        if (result.isConfirmed) {
          // some notification to tell the user that their account was successfully deleted
          // on successfull deletion
          Swal.fire({
            title: "Scores Reset!",
            text: "You scores have been reset to the default.",
            icon: "success",
            color: '#203a58',
            background: '#D1D6D9',
            iconColor: '#6F8CA4',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          })
           //alert('Account deleted successfully');
          // Clear any user session data
          localStorage.removeItem('user');
          // Redirect to login page or home page
          window.location.href = '/login';
        }
      })
  };
  