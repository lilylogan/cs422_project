import React from "react";
import Add from "../components/add";
import Swal from 'sweetalert2'

function AddContainer() {
    const clickHandler = () => {
        // at to meal planner

        // fire alert on success
        Swal.fire({
            title: "Meal Added to Meal Plan",
              icon: "success",
              showConfirmButton: false,
              showCloseButton: true,
              background: '#FAF5F0',
              color: '#3B2A1D',
              iconColor: '#4A7B32',
              backdrop: false,
              timer: 1750,
              timerProgressBar: true,
              position: 'top-left',
              customClass: {
                popup: 'addAlert',
              },
        })
    }

    return (
        <Add onClick={clickHandler} />
    )
}

export default AddContainer;