import React from 'react'
import HelpButton from '../components/help'
import Swal from 'sweetalert2'

function HelpButtonContainer() {
    const clickHandler = () => {
        Swal.fire({
            title: "How to Use",
              html: `<div>
              <div class="timeContainer">
                    <h5 class="helpTitle">Discovery Deck Directions</h5>
                </div>
                <div class="alertFrameContainer">
                    <div class="alertPhotoFrame">
                        <img class="alertPhoto" />
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Swipe Right to Add the Recipe to your Meal Plan</li>
                        <li>Swipe Down to Add on the Recipe and get a new one</li>
                        <li>Swipe Left to Add the Recipe to your Disliked list, preventing it from showing up again</li>
                        <li>Click the Heart to Add the Recipe to your Liked Recipe List</li>
                        <li>Click the Heart again to remove the Recipe from your Liked Recipe List</li>
                    </ul>
                </div>
                 <div class="alertFrameContainer">
                    <h5 class="helpTitle">Liked Deck Directions</h5>
                </div>
                <div class="alertFrameContainer">
                    <div class="alertPhotoFrame">
                        <img class="alertPhoto"/>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Swipe Right to Add the Recipe to your Meal Plan</li>
                        <li>Swipe Left to to Add on the Recipe and get a new one</li>
                        <li>Click the Heart to Remove the Recipe from your Liked Recipe List</li>
                    </ul>
                </div>
            </div>`,
              icon: "question",
              showConfirmButton: true,
              showCloseButton: true,
              background: '#FAF5F0',
              color: '#3B2A1D',
              iconColor: '#4A7B32',
              backdrop: false,
              position: 'middle',
              customClass: {
                popup: 'helpPopup',
                confirmButton: 'custom-close-button',
              },
        })
    }
    
    return (
        <HelpButton onClick={clickHandler} />
    )
}

export default HelpButtonContainer