import React from 'react'
import DeleteButton from '../components/delete'
import Swal from 'sweetalert2'

function deleteButtonContainer() {

    const clickHandler = async () => {
        try {
            const result = await Swal.fire({
              title: "Are you sure you want to delete Recipe Name",
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
                Swal.fire({
                    title: "Meal Removed from your Liked List",
                      icon: "success",
                      showConfirmButton: false,
                      showCloseButton: true,
                      background: '#FAF5F0',
                      color: '#3B2A1D',
                      iconColor: '#95340A',
                      backdrop: false,
                      timer: 2500,
                      timerProgressBar: true,
                      position: 'top-left',
                      customClass: {
                        popup: 'deleteAlert',
                      },
                })
                // delete from liked list
                /*
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
            }
            if (!response.ok) {
                throw new Error('Failed to delete account');
              }
            */

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
    }

    return (
        <DeleteButton onClick={clickHandler} />
    )
}

export default deleteButtonContainer;